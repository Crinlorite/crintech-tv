# CrinTech TV

Sistema de cartelería digital para las instalaciones deportivas. Cada TV carga una URL con su slideshow de imágenes promocionales.

## Cómo funciona

1. Metes imágenes en la carpeta `images/` de cada instalación
2. Push a GitHub
3. Cloudflare Pages hace build (`node _build.js`) y genera `images.json` por carpeta
4. Las TVs cargan las imágenes automáticamente

## Instalaciones

| Instalación | Carpeta | URL |
|---|---|---|
| Ciudad Deportiva Ártica | `artica/` | `tv.crintech.pro/artica/` |
| La Planilla | `planilla/` | `tv.crintech.pro/planilla/` |
| San Adrián | `san-adrian/` | `tv.crintech.pro/san-adrian/` |
| Ciudad Deportiva Sarriguren | `sarriguren/` | `tv.crintech.pro/sarriguren/` |
| Instalaciones Deportivas Berrioplano | `berrioplano/` | `tv.crintech.pro/berrioplano/` |
| Polideportivo Municipal Valle de Egüés | `egues/` | `tv.crintech.pro/egues/` |

## Añadir imágenes

```bash
# Copiar imágenes a la carpeta de la instalación
cp foto1.jpg tv/artica/images/
cp foto2.png tv/artica/images/

# Commit solo las imágenes nuevas
git add artica/images/foto1.jpg artica/images/foto2.png
git commit -m "Add images artica"
git push
```

Formatos soportados: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`, `.avif`

## Añadir nueva instalación

1. Crear carpeta con `images/` dentro
2. Copiar el `index.html` de cualquier instalación existente
3. Añadir enlace en el `index.html` raíz
4. Push

## Anti-sleep (TVs LG WebOS)

Las TVs LG activan protector de pantalla a los 30 min. La web incluye 4 mecanismos para evitarlo:

- **Video invisible en loop** — WebOS detecta reproducción multimedia y no duerme la pantalla
- **Eventos simulados** cada 60s (mousemove, keydown)
- **Reload completo** cada 28 min
- **Wake Lock API** para navegadores compatibles

## Auto-refresh de imágenes

La web comprueba `images.json` cada 60 segundos. Si hay imágenes nuevas, actualiza el slideshow sin recargar la página. Las TVs no necesitan intervención manual al subir contenido nuevo.

## Cloudflare Pages

- **Build command:** `node _build.js`
- **Build output directory:** `/`
- **Custom domain:** `tv.crintech.pro`
