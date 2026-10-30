"""Skill verificar-entrega: huellas SHA-256 para demostrar qué se ha tocado.

  python .claude/skills/verificar-entrega/scripts/huellas.py foto      # antes de empezar
  python .claude/skills/verificar-entrega/scripts/huellas.py comprobar # al terminar

Guarda la foto en .claude/huellas.json. Ignora .claude/ y .opencode/ (configuración).
"""
import hashlib
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = Path.cwd()
FOTO = RAIZ / ".claude" / "huellas.json"
IGNORAR = {".claude", ".opencode", "__pycache__"}


def huellas():
    resultado = {}
    for ruta in sorted(RAIZ.rglob("*")):
        rel = ruta.relative_to(RAIZ)
        if ruta.is_file() and not IGNORAR.intersection(rel.parts):
            resultado[rel.as_posix()] = hashlib.sha256(ruta.read_bytes()).hexdigest()
    return resultado


orden = sys.argv[1] if len(sys.argv) > 1 else "comprobar"
if orden == "foto":
    FOTO.write_text(json.dumps(huellas(), indent=1), encoding="utf-8")
    print(f"Foto guardada: {len(huellas())} archivos.")
    sys.exit(0)

if not FOTO.exists():
    print("No hay foto previa: ejecuta primero «foto».")
    sys.exit(1)
antes, ahora = json.loads(FOTO.read_text(encoding="utf-8")), huellas()
modificados = [r for r in antes if r in ahora and antes[r] != ahora[r]]
borrados = [r for r in antes if r not in ahora]
nuevos = [r for r in ahora if r not in antes]
for titulo, lista in (("MODIFICADOS", modificados), ("BORRADOS", borrados), ("NUEVOS", nuevos)):
    print(f"{titulo} ({len(lista)}):" + "".join(f"\n  - {r}" for r in lista))
sys.exit(1 if modificados or borrados else 0)
