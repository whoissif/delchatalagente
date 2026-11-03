@echo off
chcp 65001 >nul
title opencode - NO CIERRES ESTA VENTANA
cd /d "%~dp0"
where opencode >nul 2>nul
if errorlevel 1 (
  echo  [FALTA] opencode no está instalado. Haz doble clic antes en 1_instalar_opencode.bat.
  pause
  exit /b 1
)
echo.
echo  Carpeta de trabajo: %CD%
for /f "delims=" %%v in ('opencode --version') do echo  Versión de opencode: %%v  ^(la del curso es 1.19.5^)
echo.
echo  Se abrirá opencode en tu navegador.
echo  NO CIERRES ESTA VENTANA: si la cierras, se apaga el agente.
echo  Para apagarlo o reiniciarlo, ciérrala y vuelve a hacer doble clic en 2_arrancar_opencode.bat.
echo.
call opencode web
pause
