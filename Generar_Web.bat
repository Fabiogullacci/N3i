@echo off
echo ===================================================
echo     PREPARANDO TU WEB PARA SUBIR A GITHUB PAGES
echo ===================================================
echo.
echo Compilando la pagina (esto tomara un par de segundos)...
call npm run build
echo.
echo Copiando archivos compilados a la raiz de forma automatica...
xcopy /E /Y /I dist\* .
echo.
echo ===================================================
echo LISTO! Los archivos se compilaron y copiaron a la raiz.
echo Ahora puedes ejecutar "Subir_a_GitHub.bat" para publicar.
echo ===================================================
pause

