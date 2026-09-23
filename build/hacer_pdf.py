#!/usr/bin/env python3
"""Convierte los HTML imprimibles de pdf/ en PDF, sin navegador.

    python build/hacer_pdf.py

Usa fpdf2 (instalado en build/pylibs) y las fuentes del sistema para cubrir
tildes, eñes y signos de apertura del español. Genera un PDF por documento
más completo.pdf, y una copia en PDF de las diapositivas.

Por qué no se usa Chrome: en este equipo el navegador no puede arrancar
(crashpad y el bloqueo de perfil reciben acceso denegado), así que la vía
fiable es componer el PDF directamente.
"""

import os
import re
import sys
from datetime import date
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI / "pylibs"))

try:
    from fpdf import FPDF, FontFace, TextStyle
except ImportError:
    print("Falta fpdf2. Instálalo con:")
    print(f'  python -m pip install --target "{AQUI / "pylibs"}" fpdf2')
    sys.exit(1)

RAIZ = AQUI.parent
DIR_PDF = RAIZ / "pdf"
DIR_DIAPOS = RAIZ / "slides"
FUENTES = Path(os.environ.get("WINDIR", r"C:\Windows")) / "Fonts"
HOY = date.today().strftime("%d/%m/%Y")

# ------------------------------------------------------------------ fuentes


def buscar(candidatos):
    for nombre in candidatos:
        ruta = FUENTES / nombre
        if ruta.exists():
            return str(ruta)
    return None


def registrar_fuentes(pdf):
    """Registra dos familias: Texto (prosa) y Mono (código)."""
    texto = {
        "": buscar(["segoeui.ttf", "calibri.ttf", "arial.ttf", "verdana.ttf", "tahoma.ttf"]),
        "B": buscar(["segoeuib.ttf", "calibrib.ttf", "arialbd.ttf", "verdanab.ttf", "tahomabd.ttf"]),
        "I": buscar(["segoeuii.ttf", "calibrii.ttf", "ariali.ttf", "verdanai.ttf"]),
        "BI": buscar(["segoeuiz.ttf", "calibriz.ttf", "arialbi.ttf", "verdanaz.ttf"]),
    }
    if not texto[""]:
        raise RuntimeError("No se ha encontrado ninguna fuente TrueType del sistema.")

    for estilo, ruta in texto.items():
        if estilo and not ruta:
            ruta = texto[""]  # si falta la variante, se reutiliza la normal
            if estilo == "BI":
                ruta = texto["B"] or texto[""]
            elif estilo == "I":
                ruta = texto[""] or texto[""]
        pdf.add_font("Texto", estilo, ruta)

    mono = {
        "": buscar(["consola.ttf", "cour.ttf", "lucon.ttf"]),
        "B": buscar(["consolab.ttf", "courbd.ttf"]),
        "I": buscar(["consolai.ttf", "couri.ttf"]),
        "BI": buscar(["consolaz.ttf", "courbi.ttf"]),
    }
    base = mono[""] or texto[""]
    for estilo, ruta in mono.items():
        pdf.add_font("Mono", estilo, ruta or base)


# ------------------------------------------------------------------ limpieza

EMOJIS = {
    "\u26a0\ufe0f": "Atención:", "\u26a0": "Atención:",
    "\u2705": "Hecho", "\u274c": "No", "\u2714": "Sí",
    "\U0001f511": "Clave", "\U0001f4cc": "Nota", "\U0001f4cb": "Lista",
    "\U0001f4a1": "Idea", "\U0001f3af": "Objetivo", "\U0001f9ed": "Guía",
    "\U0001f4dd": "Apunte", "\U0001f50d": "", "\u23f1\ufe0f": "",
    "\U0001f680": "", "\U0001f9e9": "", "\u27a1\ufe0f": "->",
    "\u2b06\ufe0f": "arriba", "\u2b07\ufe0f": "abajo",
    "\u25b8": "\u2022", "\u2192": "->", "\u2190": "<-",
    "\u2039": "\u00ab", "\u203a": "\u00bb",
}

# Rangos de pictogramas que ninguna fuente de texto corriente dibuja bien.
PICTOGRAMAS = re.compile(
    "[\U0001f000-\U0001faff\u2600-\u27bf\ufe0f\u2b00-\u2bff\u200d\u20e3]"
)

ETIQUETAS_INUTILES = re.compile(
    r"</?(?:div|span|article|section|header|footer|main|nav|body|html)\b[^>]*>", re.I
)

# fpdf2 no admite etiquetas anidadas dentro de <td>/<th>: se conserva el texto
# y se elimina el formato interior de la celda.
INLINE_EN_CELDA = re.compile(
    r"</?(?:strong|b|em|i|code|a|span|u|s|del|font|mark)\b[^>]*>", re.I
)
CELDAS = re.compile(r"<(td|th)([^>]*)>([\s\S]*?)</\1>", re.I)


def aplanar_celdas(fragmento):
    def rep(m):
        etiqueta, atributos, interior = m.group(1), m.group(2), m.group(3)
        return f"<{etiqueta}{atributos}>{INLINE_EN_CELDA.sub('', interior)}</{etiqueta}>"

    return CELDAS.sub(rep, fragmento)


def limpiar(fragmento):
    """Deja solo las etiquetas que fpdf2 entiende."""
    f = fragmento

    # Casillas de verificación de las listas de comprobación
    f = re.sub(r'<input[^>]*type="checkbox"[^>]*checked[^>]*>', "[X] ", f, flags=re.I)
    f = re.sub(r"<input[^>]*>", "[ ] ", f, flags=re.I)

    # Emojis y pictogramas
    for k, v in EMOJIS.items():
        f = f.replace(k, v)
    f = PICTOGRAMAS.sub("", f)

    # Etiquetas estructurales que fpdf2 no conoce
    f = ETIQUETAS_INUTILES.sub("", f)

    # Formato dentro de las celdas de tabla
    f = aplanar_celdas(f)

    # Saltos de línea dentro de bloques de código
    def arreglar_pre(m):
        interior = m.group(1)
        interior = interior.replace("\n", "<br>")
        return f"<pre>{interior}</pre>"

    f = re.sub(r"<pre>\s*<code[^>]*>([\s\S]*?)</code>\s*</pre>", arreglar_pre, f)
    f = re.sub(r"<pre>([\s\S]*?)</pre>", arreglar_pre, f)

    # Líneas horizontales y comentarios
    f = re.sub(r"<!--[\s\S]*?-->", "", f)
    return f.strip()


def extraer(html):
    """Devuelve (id, titulo, publico, cuerpo) de un HTML imprimible."""
    m = re.search(r'<article class="contenido">([\s\S]*?)</article>', html)
    cuerpo = limpiar(m.group(1)) if m else ""
    t = re.search(r'class="doc-cabeza"[\s\S]*?<h1>(.*?)</h1>', html)
    titulo = re.sub(r"<[^>]+>", "", t.group(1)).strip() if t else "Documento"
    serie = re.search(r'class="serie">(.*?)</div>', html)
    ident = ""
    if serie:
        s = re.sub(r"<[^>]+>", "", serie.group(1))
        mm = re.search(r"Documento\s+(\d+)", s)
        ident = mm.group(1) if mm else ""
    # La línea «Para:» está después del CSS en línea, así que no vale mirar
    # solo el principio del archivo: se busca la etiqueta concreta.
    p = re.search(r"Para:\s*<b>(.*?)</b>", html)
    pub = re.sub(r"<[^>]+>", "", p.group(1)).strip() if p else "instructor"
    return ident, titulo, pub, cuerpo


# ------------------------------------------------------------------ documento

# fpdf2 solo admite estilos para las etiquetas de su lista interna
# (encabezados, p, li, blockquote, pre, ol, ul y las de línea como a, code, b, i...).
# Los estilos de tabla no son configurables: se usa el dibujo por defecto.
ESTILOS = {
    "h1": TextStyle(font_style="B", font_size_pt=17, color=(18, 23, 42), t_margin=7, b_margin=3),
    "h2": TextStyle(font_style="B", font_size_pt=13.5, color=(18, 23, 42), t_margin=8, b_margin=2.5),
    "h3": TextStyle(font_style="B", font_size_pt=11.5, color=(40, 48, 70), t_margin=6, b_margin=2),
    "h4": TextStyle(font_style="B", font_size_pt=10.5, color=(77, 86, 112), t_margin=5, b_margin=1.5),
    "p": TextStyle(font_size_pt=10, color=(27, 34, 51), t_margin=1.2, b_margin=1.2),
    "li": TextStyle(font_size_pt=10, color=(27, 34, 51), t_margin=0.8, b_margin=0.8),
    "blockquote": TextStyle(
        font_size_pt=10, color=(29, 37, 64), fill_color=(238, 241, 255),
        l_margin=5, t_margin=2.5, b_margin=2.5,
    ),
    "pre": TextStyle(
        font_family="Mono", font_size_pt=8.2, color=(35, 42, 60),
        fill_color=(246, 247, 251), l_margin=4, t_margin=2.5, b_margin=2.5,
    ),
    "code": FontFace(family="Mono", size_pt=9, color=(40, 48, 70)),
    "a": FontFace(color=(47, 75, 216), emphasis="UNDERLINE"),
}

ESTILOS_DIAPO = dict(ESTILOS)
ESTILOS_DIAPO.update({
    "h1": TextStyle(font_style="B", font_size_pt=20, color=(18, 23, 42), t_margin=6, b_margin=3),
    "h2": TextStyle(font_style="B", font_size_pt=16, color=(18, 23, 42), t_margin=6, b_margin=3),
    "p": TextStyle(font_size_pt=11, color=(27, 34, 51), t_margin=1.5, b_margin=1.5),
    "li": TextStyle(font_size_pt=11, color=(27, 34, 51), t_margin=1, b_margin=1),
})


class PDF(FPDF):
    def __init__(self, subtitulo):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.subtitulo = subtitulo
        self.set_margins(18, 16, 18)
        self.set_auto_page_break(True, margin=18)

    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Texto", "", 8)
        self.set_text_color(150, 158, 176)
        self.cell(0, 6, self.subtitulo, align="L")
        self.ln(7)

    def footer(self):
        self.set_y(-15)
        self.set_font("Texto", "", 8)
        self.set_text_color(155, 163, 180)
        self.cell(0, 6, f"pagina {self.page_no()}", align="R")


def componer(pdf, ident, titulo, publico, cuerpo):
    pdf.add_page()

    etiqueta = f"Documento {ident} · " if ident else ""
    pdf.set_font("Texto", "B", 17)
    pdf.set_text_color(18, 23, 42)
    # new_x/new_y devuelven el cursor al margen izquierdo: sin esto, el siguiente
    # multi_cell se queda sin ancho y fpdf2 aborta.
    pdf.multi_cell(0, 8.5, f"{etiqueta}{titulo}", new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("Texto", "", 8.6)
    pdf.set_text_color(122, 131, 152)
    pdf.multi_cell(
        0, 4.6,
        f"Para: {publico}  ·  DeepSeek Harness (dsh)  ·  Generado el {HOY}",
        new_x="LMARGIN", new_y="NEXT",
    )

    pdf.ln(2.5)
    pdf.set_draw_color(47, 75, 216)
    pdf.set_line_width(0.55)
    y = pdf.get_y()
    pdf.line(pdf.l_margin, y, pdf.w - pdf.r_margin, y)
    pdf.ln(5)

    pdf.set_font("Texto", "", 10)
    pdf.set_text_color(27, 34, 51)
    pdf.write_html(
        cuerpo,
        font_family="Texto",
        tag_styles=ESTILOS,
        table_line_separators=True,
        warn_on_tags_not_matching=False,
    )


# ------------------------------------------------------------------ principal


def main():
    htmls = sorted(DIR_PDF.glob("*.html"), key=lambda p: p.name)
    if not htmls:
        print("No hay HTML en pdf/. Ejecuta antes: node build/build.mjs")
        return 1

    documentos = []
    for ruta in htmls:
        if ruta.name == "completo.html":
            continue
        ident, titulo, publico, cuerpo = extraer(ruta.read_text(encoding="utf-8"))
        if not cuerpo:
            print(f"  --  {ruta.name}: sin contenido, se omite")
            continue
        documentos.append((ident, titulo, publico, cuerpo, ruta.stem))

    if not documentos:
        print("Ningún documento con contenido.")
        return 1

    print("Documentos:")
    hechos = 0
    for ident, titulo, publico, cuerpo, nombre in documentos:
        pdf = PDF(f"{ident} · {titulo}" if ident else titulo)
        registrar_fuentes(pdf)
        componer(pdf, ident, titulo, publico, cuerpo)
        destino = DIR_PDF / f"{nombre}.pdf"
        pdf.output(str(destino))
        kb = destino.stat().st_size / 1024
        print(f"  OK  {destino.name:<46} {kb:7.1f} KB  ({pdf.page_no()} pags.)")
        hechos += 1

    # Volumen completo
    pdf = PDF("Seminario «Del chat al agente» · paquete completo")
    registrar_fuentes(pdf)
    for ident, titulo, publico, cuerpo, _ in documentos:
        componer(pdf, ident, titulo, publico, cuerpo)
    destino = DIR_PDF / "completo.pdf"
    pdf.output(str(destino))
    print(f"  OK  {destino.name:<46} {destino.stat().st_size / 1024:7.1f} KB  ({pdf.page_no()} pags.)")
    hechos += 1

    # Diapositivas
    deck = DIR_DIAPOS / "diapositivas.html"
    if deck.exists():
        html = deck.read_text(encoding="utf-8")
        diapos = re.findall(r'<section class="[^"]*diapo[^"]*"[^>]*>([\s\S]*?)</section>', html)
        if diapos:
            pdf = PDF("Diapositivas · Del chat al agente")
            registrar_fuentes(pdf)
            pdf.set_margins(14, 12, 14)
            for i, d in enumerate(diapos, 1):
                pdf.add_page()
                pdf.set_font("Texto", "B", 9)
                pdf.set_text_color(150, 158, 176)
                pdf.cell(0, 5, f"Diapositiva {i} de {len(diapos)}")
                pdf.ln(6)
                pdf.set_font("Texto", "", 10)
                pdf.set_text_color(27, 34, 51)
                pdf.write_html(
                    limpiar(d),
                    font_family="Texto",
                    tag_styles=ESTILOS_DIAPO,
                    table_line_separators=True,
                    warn_on_tags_not_matching=False,
                )
            destino = DIR_DIAPOS / "diapositivas.pdf"
            pdf.output(str(destino))
            print(f"  OK  diapositivas.pdf{'':<31} {destino.stat().st_size / 1024:7.1f} KB  ({pdf.page_no()} pags.)")
            hechos += 1

    print(f"\n{hechos} PDF generados en {DIR_PDF}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
