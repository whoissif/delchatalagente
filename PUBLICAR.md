# Publicar en GitHub Pages

El curso es un sitio estático; no requiere backend, compilación ni dependencias externas para que lo use el alumnado.

## Publicación desde la raíz

1. Crea un repositorio en GitHub y sube esta carpeta.
2. En el repositorio, abre **Settings → Pages**.
3. En *Build and deployment*, elige *Deploy from a branch*, la rama principal y la carpeta `/(root)`.
4. Guarda los cambios. GitHub Pages publicará `index.html` como portada y `curso/index.html` como el curso interactivo.

También puedes abrir `index.html` localmente para navegar el material sin publicarlo.

## Actualizar el curso

El curso interactivo ya está construido en `curso/index.html`. Los documentos Markdown contienen el material editable y `slides/slides.md` es la fuente de las diapositivas. Si cambias las fuentes, regenera las salidas correspondientes antes de subirlas.

Los scripts de autoría están en `build/`. Para regenerar el curso, instala las dependencias declaradas en `build/package.json` con npm y ejecuta `node build/build.mjs`. Para reconstruir las diapositivas, usa `node build/build_slides.mjs`. La generación de PDF requiere Python y las bibliotecas indicadas por `build/hacer_pdf.py`.

## Datos y progreso

- El curso funciona sin CDN y adapta su presentación a pantallas pequeñas.
- Los cuestionarios y el progreso se guardan solo en el almacenamiento local del navegador de cada alumno.
- El entorno de práctica contiene datos ficticios. No uses datos reales ni credenciales en los ejercicios.
- GitHub Pages es público si el repositorio es público; revisa los archivos antes de publicarlos.
