@echo off
title Panel de Obras N3i
color 0A

echo =========================================================
echo       Iniciando Panel de Administracion de N3i
echo =========================================================
echo.
echo Por favor, NO cierres esta ventana negra mientras estes 
echo subiendo o editando obras en el navegador.
echo.
echo Abriendo el panel en tu navegador web...
echo.

:: Abre el navegador predeterminado
start http://localhost:4322

:: Inicia el servidor local de Node
npm run admin

pause
