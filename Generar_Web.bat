@echo off
echo ===================================================
echo     PREPARANDO TU WEB PARA SUBIR A GITHUB PAGES
echo ===================================================
echo.
echo Compilando la pagina (esto tomara un par de segundos)...
call npm run build
echo.
echo ===================================================
echo LISTO! Abriendo la carpeta con los archivos finales.
echo Copia todos los archivos de esta carpeta y subelos a GitHub.
echo ===================================================
timeout /t 3
start dist
