#!/bin/bash
# Arranca opencode en esta carpeta (curso «Del chat al agente»)
cd "$(dirname "$0")"
if ! command -v opencode >/dev/null 2>&1; then
  echo " [FALTA] opencode no está instalado. Haz doble clic antes en 1_instalar_opencode.command."
  read -r -p " Pulsa Intro para cerrar. " _
  exit 1
fi
echo
echo " Carpeta de trabajo: $(pwd)"
echo " Versión de opencode: $(opencode --version)  (la del curso es 1.19.5)"
echo
echo " Se abrirá opencode en tu navegador."
echo " NO CIERRES ESTA VENTANA: si la cierras, se apaga el agente."
echo " Para apagarlo o reiniciarlo, ciérrala y vuelve a hacer doble clic en 2_arrancar_opencode.command."
echo
opencode web
