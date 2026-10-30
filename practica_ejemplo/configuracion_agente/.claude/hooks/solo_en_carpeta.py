"""Hook PreToolUse: bloquea cualquier escritura fuera de la carpeta del proyecto.

Claude Code le pasa por la entrada estándar un JSON con la herramienta y sus
parámetros. Si la ruta de destino queda fuera de la carpeta, sale con código 2:
la acción se bloquea y el motivo (stderr) se le devuelve al agente.
"""
import json
import os
import sys
from pathlib import Path

sys.stdin.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")
entrada = json.load(sys.stdin)
parametros = entrada.get("tool_input", {})
ruta = parametros.get("file_path") or parametros.get("notebook_path")
if not ruta:
    sys.exit(0)  # la herramienta no escribe en una ruta concreta

proyecto = Path(os.environ.get("CLAUDE_PROJECT_DIR") or Path(__file__).resolve().parents[2]).resolve()
destino = Path(ruta)
if not destino.is_absolute():
    destino = Path(entrada.get("cwd") or proyecto) / destino
destino = destino.resolve()

if destino == proyecto or proyecto in destino.parents:
    sys.exit(0)

print(
    f"Bloqueado por el hook: «{destino}» está fuera de la carpeta de trabajo «{proyecto}». "
    "Trabaja dentro de la carpeta o pide al usuario que lo haga él.",
    file=sys.stderr,
)
sys.exit(2)
