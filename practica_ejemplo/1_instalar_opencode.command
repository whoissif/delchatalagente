#!/bin/bash
# Instalador del curso «Del chat al agente» para macOS
cd "$(dirname "$0")"
echo
echo " Instalador del curso «Del chat al agente»"
echo " =========================================="
echo
fin() { echo; read -r -p " Pulsa Intro para cerrar esta ventana. " _; exit "$1"; }
if ! command -v node >/dev/null 2>&1; then
  echo " [FALTA] Node.js no está instalado."
  echo " Instálalo desde https://nodejs.org (versión LTS) y vuelve a hacer doble clic aquí."
  fin 1
fi
echo " [OK] Node.js $(node -v)"
echo
echo " Instalando opencode 1.19.5. Puede tardar un par de minutos..."
if ! npm install -g opencode-ai@1.19.5; then
  echo
  echo " [ERROR] No se ha podido instalar opencode. Copia el texto de arriba y pide ayuda."
  fin 1
fi
echo " [OK] opencode $(opencode --version)"
echo
if ! command -v python3 >/dev/null 2>&1; then
  echo " [FALTA] Python no está instalado. Instálalo desde https://www.python.org/downloads/ y vuelve a hacer doble clic aquí."
  fin 1
fi
echo " [OK] $(python3 --version)"
echo " Instalando las librerías pandas y matplotlib para la Práctica 6..."
if python3 -m pip install --user --quiet --disable-pip-version-check pandas matplotlib; then
  echo " [OK] pandas y matplotlib"
else
  echo " [AVISO] No se han podido instalar las librerías. La Práctica 6 se puede hacer sin ellas."
fi
echo
echo " Todo listo."
fin 0
