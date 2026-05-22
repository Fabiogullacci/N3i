# Guía de Alojamiento (Hosting) para N3i Engineering & Maintenance

Para un sitio web estático (HTML, CSS, JS e imágenes) de tipo institucional como el de **N3i**, la mejor opción es utilizar un **proveedor de hosting estático moderno basado en la nube**. Estas plataformas ofrecen rendimiento ultra-rápido global (CDN), certificado de seguridad SSL gratuito de por vida y la posibilidad de conectar su propio dominio sin pagar costos mensuales de hosting.

A continuación, se presentan las recomendaciones específicas y el paso a paso detallado para subir su web en las dos mejores opciones para su caso: **Netlify** (máxima facilidad sin usar comandos) y **GitHub Pages** (máxima estabilidad mediante Git).

---

## 📋 Resumen de Recomendaciones para N3i

> [!WARNING]
> **Nota sobre Vercel:** Aunque Vercel es excelente y rápido, su plan gratuito (Hobby) prohíbe estrictamente el uso comercial. Como **N3i** es una empresa de ingeniería y contratación, subir el sitio a una cuenta gratuita de Vercel violaría sus términos y podría resultar en la suspensión del sitio. Por ello, **no se recomienda Vercel en su plan gratuito para este proyecto.**

### 🥇 Opción 1: Netlify (Recomendado por Facilidad)
Es la opción perfecta si no quiere lidiar con Git, la consola o herramientas de programación. Permite desplegar la web en segundos simplemente arrastrando y soltando la carpeta.
* **Costo:** 100% Gratis.
* **Límites:** ~15 GB de transferencia mensual (suficiente para miles de visitas al mes).
* **Dominio Propio y SSL:** Gratis y automático.
* **Método:** Arrastrar y soltar la carpeta (*Drag & Drop*).

### 🥈 Opción 2: GitHub Pages (Recomendado por Estabilidad e Integración)
Es la opción ideal si prefiere tener su código respaldado en un repositorio privado en la nube de GitHub y desea que el sitio se actualice automáticamente cada vez que realice un cambio en sus archivos.
* **Costo:** 100% Gratis.
* **Límites:** Generosos 100 GB de transferencia mensual.
* **Dominio Propio y SSL:** Gratis y automático.
* **Método:** Basado en Git (*Push*).

---

## 🚀 Paso a Paso: Cómo Subir su Web a Netlify (Drag & Drop)

Esta es la forma más rápida y sencilla. Tendrá su web en línea en menos de 3 minutos.

### Paso 1: Crear una Cuenta
1. Ingrese a [https://www.netlify.com/](https://www.netlify.com/).
2. Haga clic en **Sign Up** (Registrarse).
3. Puede registrarse usando su cuenta de GitHub, Google o simplemente con su correo electrónico institucional.

### Paso 2: Subir los Archivos
1. Una vez dentro de su panel de Netlify (*Team Overview*), vaya a la pestaña de **Sites** (Sitios).
2. Desplácese hacia el final de la página hasta encontrar un recuadro que dice:
   > *"Want to deploy a new site without connecting to Git? Drag and drop your site folder here"*
3. Abre el explorador de archivos de su computadora y localice la carpeta de su proyecto: `c:\Users\fabio\iCloudDrive\Documents\Web_N3i`.
4. **Arrastre la carpeta completa** y suéltela dentro del recuadro de Netlify.
5. ¡Listo! Netlify procesará los archivos en 5 segundos y le dará un enlace temporal del tipo `https://nombre-aleatorio.netlify.app`.

### Paso 3: Cambiar el Nombre Temporal del Sitio
1. En el panel del sitio recién creado en Netlify, haga clic en **Site configuration** (Configuración del sitio).
2. En la sección *Site info*, haga clic en **Change site name**.
3. Escriba un nombre profesional relacionado con su marca (ej: `n3i-ingenieria` o `n3ibhi`).
4. Su web ahora será accesible desde `https://n3i-ingenieria.netlify.app`.

---

## 🚀 Paso a Paso: Cómo Subir su Web a GitHub Pages

Si decide utilizar Git para mantener un control de versiones y actualizaciones automáticas.

### Paso 1: Instalar Git y crear cuenta en GitHub
1. Si no tiene una cuenta, regístrese gratis en [https://github.com/](https://github.com/).
2. Asegúrese de tener Git instalado en su computadora.

### Paso 2: Inicializar el Repositorio y Subir el Código
Abra una consola (PowerShell) en su directorio `c:\Users\fabio\iCloudDrive\Documents\Web_N3i` y ejecute los siguientes comandos:

```powershell
# 1. Inicializar repositorio local
git init

# 2. Agregar todos los archivos creados
git add .

# 3. Realizar el primer commit
git commit -m "Despliegue inicial de la web N3i"

# 4. Crear una rama principal limpia
git branch -M main
```

Luego, en su cuenta de GitHub:
1. Cree un nuevo repositorio llamado `n3i-web` (puede ser Público o Privado).
2. Copie la dirección del repositorio remota que le brinda GitHub (del tipo `https://github.com/usuario/n3i-web.git`).
3. Vuelva a su terminal de PowerShell y ejecute:

```powershell
# 5. Vincular repositorio local con el de GitHub
git remote add origin https://github.com/TU_USUARIO/n3i-web.git

# 6. Subir los archivos a la nube
git push -u origin main
```

### Paso 3: Activar GitHub Pages
1. Ingrese a su repositorio en la web de GitHub.
2. Vaya a **Settings** (Configuración) -> pestaña **Pages** en el menú de la izquierda.
3. En la sección *Build and deployment*, en *Source*, seleccione **Deploy from a branch**.
4. En *Branch*, elija **main** y en la carpeta seleccione `/ (root)`. Haga clic en **Save** (Guardar).
5. En 1 minuto, su sitio estará en línea en la URL: `https://TU_USUARIO.github.io/n3i-web/`.

---

## 🌐 Cómo Configurar su Dominio Propio (ej. www.n3i.com.ar)

Tanto en Netlify como en GitHub Pages, puede conectar el dominio que compre en registradores como **NIC Argentina** (para dominios `.com.ar`) o **GoDaddy/Namecheap** (para dominios `.com`).

### En Netlify:
1. En el panel de su sitio en Netlify, vaya a **Domain management** (Gestión de dominios).
2. Haga clic en **Add a domain** (Agregar dominio) e ingrese su dominio (ej. `n3i.com.ar`).
3. Netlify le indicará los servidores de nombre (DNS) que debe configurar en el panel de su proveedor de dominios (ej. `dns1.p01.nsone.net`, etc.).
4. Copie esos servidores DNS y péguelos en la configuración de delegación de su dominio en NIC Argentina o su proveedor.
5. Tras unas horas (por propagación de DNS), Netlify activará automáticamente el candado de seguridad (SSL/HTTPS) de Let's Encrypt sin costo alguno.

### En GitHub Pages:
1. En la pestaña **Settings** -> **Pages** de su repositorio, busque la sección **Custom domain**.
2. Escriba su dominio personalizado y haga clic en **Save**.
3. En el proveedor donde compró su dominio, deberá crear un registro de tipo **CNAME** apuntando su subdominio `www` a `TU_USUARIO.github.io`.
4. Marque la casilla **Enforce HTTPS** en GitHub Pages para activar el certificado de seguridad SSL gratis.

---

Cualquiera de las dos opciones le garantizará una web corporativa sumamente veloz, segura y sin costos de alojamiento mensuales.
