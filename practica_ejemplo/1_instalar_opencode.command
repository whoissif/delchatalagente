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
# Con el instalador .pkg de Node.js, la carpeta global es del sistema y npm daría EACCES:
# en ese caso se instala en la carpeta del usuario, sin sudo.
if [ ! -w "$(npm root -g)" ]; then
  echo " No se puede instalar para todos los usuarios: lo instalo en tu carpeta personal (~/.npm-global)."
  npm config set prefix "$HOME/.npm-global"
fi
export PATH="$HOME/.npm-global/bin:$PATH"
if ! npm install -g opencode-ai@1.19.5; then
  echo
  echo " [ERROR] No se ha podido instalar opencode. Copia el texto de arriba y pide ayuda."
  fin 1
fi
echo " [OK] opencode $(opencode --version)"
echo
# /usr/bin/python3 sin las herramientas de Xcode no es Python: abre un diálogo para instalarlas.
if ! command -v python3 >/dev/null 2>&1 \
  || { [ "$(command -v python3)" = /usr/bin/python3 ] && ! xcode-select -p >/dev/null 2>&1; } \
  || ! python3 -c 'import sys; sys.exit(sys.version_info < (3, 10))' 2>/dev/null; then
  echo " [FALTA] Python 3.10 o superior no está instalado."
  echo " Instálalo desde https://www.python.org/downloads/ (botón amarillo, archivo .pkg) y vuelve a hacer doble clic aquí."
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
