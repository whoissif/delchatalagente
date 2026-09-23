#!/usr/bin/env python3
"""Comprueba los PDF generados: páginas, texto extraíble y acentos correctos.

    python build/verificar_pdf.py

No basta con que el archivo exista: un PDF puede tener páginas en blanco o el
texto destrozado. Aquí se extrae el texto y se compara con frases tomadas del
Markdown original, no con frases inventadas. Así la comprobación demuestra que
el contenido llegó entero, con sus tildes y sus eñes.
"""

import re
import sys
import unicodedata
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI / "pylibs"))

try:
    from pypdf import PdfReader
except ImportError:
    print("Falta pypdf.")
    sys.exit(1)

RAIZ = AQUI.parent
DIR_PDF = RAIZ / "pdf"

# PDF -> Markdown del que procede (None si no viene de un documento).
ORIGEN = {
    "00_guia-del-paquete": "00_LEEME.md",
    "01_guion-del-instructor": "01_guion_instructor.md",
    "02_apuntes-del-alumno": "02_apuntes_alumno.md",
    "03_cuaderno-de-laboratorio": "03_laboratorio.md",
    "04_soluciones-y-errores-frecuentes": "04_soluciones_y_errores.md",
    "05_glosario-y-chuleta": "05_glosario_chuleta.md",
    "06_evaluacion": "06_evaluacion.md",
    "07_preparacion-previa": "07_instalacion_previa.md",
}

MIN_CARACTERES = 800
CUANTAS_FRASES = 6

ACENTOS = "áéíóúüñÁÉÍÓÚÜÑ¿¡"


def normalizar(t):
    """Espacios y saltos de línea colapsados, para comparar de forma estable."""
    return re.sub(r"\s+", " ", t).strip()


def visible(t):
    """Versión imprimible: la consola de Windows no siempre muestra los acentos."""
    return unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode("ascii")


def frases_de(markdown, cuantas=CUANTAS_FRASES):
    """Extrae frases del texto corrido (no de tablas ni listas) que lleven acentos."""
    candidatas = []
    for linea in markdown.splitlines():
        s = linea.strip()
        if not s or s[0] in "|#>`-*0123456789" or s.startswith("```") or s.startswith("==="):
            continue
        # No se quitan los corchetes: el original los usa como marcadores ([día], [lugar]).
        limpia = re.sub(r"[*`_]", "", s)
        for frase in re.split(r"(?<=[.:;])\s+", limpia):
            frase = frase.strip()
            if 28 <= len(frase) <= 78 and any(c in frase for c in ACENTOS) and "http" not in frase:
                candidatas.append(frase)
    # Frases repartidas por el documento, no todas del principio.
    if len(candidatas) <= cuantas:
        return candidatas
    paso = max(1, len(candidatas) // cuantas)
    return [candidatas[i * paso] for i in range(cuantas)]


def texto_de(ruta):
    lector = PdfReader(str(ruta))
    return len(lector.pages), normalizar("\n".join((p.extract_text() or "") for p in lector.pages))


def main():
    if not DIR_PDF.exists():
        print("No hay carpeta pdf/.")
        return 1

    archivos = sorted(DIR_PDF.glob("*.pdf")) + sorted((RAIZ / "slides").glob("*.pdf"))
    if not archivos:
        print("No hay PDF. Ejecuta antes: python build/hacer_pdf.py")
        return 1

    problemas_totales = 0
    print(f"Comprobando {len(archivos)} PDF contra su Markdown de origen\n")

    for ruta in archivos:
        nombre = ruta.stem
        paginas, texto = texto_de(ruta)
        problemas = []

        if paginas < 1:
            problemas.append("sin paginas")
        if len(texto) < MIN_CARACTERES:
            problemas.append(f"muy poco texto ({len(texto)} caracteres)")

        raros = texto.count("\ufffd") + texto.count("\u25a1")
        if raros:
            problemas.append(f"{raros} caracteres ilegibles")

        if not any(c in texto for c in ACENTOS):
            problemas.append("sin acentos ni enes: puede ser un problema de codificacion")

        # Comparación con el contenido real del documento
        origen = ORIGEN.get(nombre)
        detalle_frases = ""
        if origen:
            md = (RAIZ / origen).read_text(encoding="utf-8")
            frases = frases_de(md)
            if frases:
                encontradas = [f for f in frases if normalizar(f) in texto]
                detalle_frases = f"  {len(encontradas)}/{len(frases)} frases"
                faltan = [f for f in frases if f not in encontradas]
                for f in faltan:
                    problemas.append(f"no aparece en el PDF: «{visible(f[:60])}»")
                    # Contexto real del PDF: sirve para distinguir un fallo de
                    # contenido de una diferencia de espaciado al extraer.
                    ancla = normalizar(f)[:22]
                    pos = texto.find(ancla)
                    if pos >= 0:
                        problemas.append(
                            "    en el PDF se lee: «" + visible(texto[pos:pos + 90]) + "»"
                        )
                    else:
                        problemas.append(
                            "    ni siquiera aparece el principio «" + visible(ancla) + "»"
                        )

        estado = "OK   " if not problemas else "FALLO"
        kb = ruta.stat().st_size / 1024
        print(f"  {estado} {ruta.name:<40} {paginas:>3} pags. {len(texto):>7} car. {kb:>7.1f} KB{detalle_frases}")
        for p in problemas:
            print(f"          - {p}")
            problemas_totales += 1

    print()
    if problemas_totales:
        print(f"{problemas_totales} problemas detectados.")
        return 1

    print("Todos los PDF contienen su texto completo, con tildes y eñes correctas.")
    _, muestra = texto_de(DIR_PDF / "02_apuntes-del-alumno.pdf")
    print("\nMuestra del documento 02 (sin acentos, por limitacion de la consola):")
    print("   " + visible(muestra[:300]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
