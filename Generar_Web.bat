@echo off
echo ===================================================
echo     PREPARANDO TU WEB PARA SUBIR A GITHUB PAGES
echo ===================================================
echo.
echo Compilando la pagina (esto tomara un par de segundos)...
call npm run build
echo.
echo Limpiando archivos compilados anteriores en la raiz...
if exist _astro rmdir /S /Q _astro
if exist assets rmdir /S /Q assets
if exist auditoria rmdir /S /Q auditoria
if exist empleo rmdir /S /Q empleo
if exist evaluacion rmdir /S /Q evaluacion
if exist en rmdir /S /Q en
if exist gracias rmdir /S /Q gracias
if exist herramientas rmdir /S /Q herramientas
if exist obras rmdir /S /Q obras
if exist portal rmdir /S /Q portal

if exist index.html del /Q index.html
if exist robots.txt del /Q robots.txt
if exist sitemap-index.xml del /Q sitemap-index.xml
if exist sitemap-0.xml del /Q sitemap-0.xml
if exist sitemap.xml del /Q sitemap.xml

echo.
echo Copiando archivos compilados a la raiz de forma automatica...
xcopy /E /Y /I dist\* .
echo.
echo ===================================================
echo LISTO! Los archivos se compilaron y copiaron a la raiz.
echo Ahora puedes ejecutar "Subir_a_GitHub.bat" para publicar.
echo ===================================================
pause

