@echo off
chcp 65001 >nul
title Instalar opencode 1.19.5 - curso Del chat al agente
echo.
echo  Instalador del curso "Del chat al agente"
echo  ==========================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo  [FALTA] Node.js no está instalado.
  echo  Instálalo desde https://nodejs.org ^(versión LTS^) y vuelve a hacer doble clic aquí.
  goto fin
)
for /f %%v in ('node -v') do echo  [OK] Node.js %%v
echo.
echo  Instalando opencode 1.19.5. Puede tardar un par de minutos...
call npm install -g opencode-ai@1.19.5
if errorlevel 1 (
  echo.
  echo  [ERROR] No se ha podido instalar opencode. Copia el texto de arriba y pide ayuda.
  goto fin
)
for /f "delims=" %%v in ('opencode --version') do echo  [OK] opencode %%v
echo.
python -c "import sys; sys.exit(sys.version_info < (3, 10))" >nul 2>nul
if errorlevel 1 (
  echo  [FALTA] Python 3.10 o superior no está instalado ^(o falta marcar "Add python.exe to PATH"^).
  echo  Instálalo con el instalador clásico ^("standalone installer", no el "install manager"^)
  echo  desde https://www.python.org/downloads/windows/ y vuelve a hacer doble clic aquí.
  goto fin
)
for /f "delims=" %%v in ('python --version') do echo  [OK] %%v
echo  Instalando las librerías pandas y matplotlib para la Práctica 6...
python -m pip install --user --quiet --disable-pip-version-check pandas matplotlib
if errorlevel 1 (
  echo  [AVISO] No se han podido instalar las librerías. La Práctica 6 se puede hacer sin ellas.
) else (
  echo  [OK] pandas y matplotlib
)
echo.
echo  Todo listo. Ya puedes cerrar esta ventana.
:fin
echo.
pause
