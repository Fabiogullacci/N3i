@echo off
setlocal enabledelayedexpansion
echo ===================================================
echo     SUBIR SITIO WEB A GITHUB (AUTOMATICO)
echo ===================================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git no esta instalado en este sistema.
    echo Por favor instala Git desde https://git-scm.com/ e intenta de nuevo.
    pause
    exit /b
)

:: Check if .git directory exists
if not exist .git (
    echo [INFO] Inicializando repositorio Git local...
    git init
    git branch -M main
    echo.
)

:: Check if remote origin is set
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 (
    echo [CONFIGURACION] No se detecto un repositorio remoto de GitHub vinculado.
    echo.
    echo 1. Ve a GitHub y crea un repositorio (puede ser privado o publico).
    echo 2. Copia la URL del repositorio (ejemplo: https://github.com/tu-usuario/nombre-repo.git).
    echo.
    set /p REPO_URL="Ingresa la URL de tu repositorio de GitHub: "
    
    if "!REPO_URL!"=="" (
        echo [ERROR] URL no valida. Operacion cancelada.
        pause
        exit /b
    )
    
    git remote add origin !REPO_URL!
    echo [OK] Repositorio remoto vinculado con exito.
    echo.
)

echo [1/3] Agregando archivos al commit...
git add .

echo.
echo [2/3] Creando confirmacion (commit)...
set /p COMMIT_MSG="Ingresa un comentario para este cambio (o presiona ENTER para usar uno por defecto): "
if "!COMMIT_MSG!"=="" (
    set COMMIT_MSG="Actualizacion automatica desde script"
)
git commit -m "!COMMIT_MSG!"

echo.
echo [3/3] Subiendo codigo a GitHub...
echo Esto puede solicitarte que inicies sesion en GitHub si no lo has hecho.
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Hubo un problema al subir los archivos. 
    echo Verifica tu conexion a internet y tus credenciales en GitHub.
) else (
    echo.
    echo ===================================================
    echo [EXITO] Los archivos se subieron correctamente.
    echo GitHub Actions empezara a compilar y publicar tu web
    echo de forma automatica en unos minutos.
    echo ===================================================
)

pause

