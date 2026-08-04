# Landing Page TRS4531

Este proyecto es una landing page de producto construida con React 19, Vite 4 y Tailwind CSS 4. Está diseñada para presentar las variantes diesel y eléctrica del modelo TRS4531, con soporte multilingüe y descarga de folletos.

## Características

- React 19 + Vite 4 con configuración moderna de frontend
- Tailwind CSS para estilos responsivos y diseño móvil-first
- React Router DOM para navegación entre páginas
- Soporte multilenguaje con contenido en `en`, `es` y `pt`
- Páginas para `Diesel` y `Eléctrico`, galerías, fichas técnicas y secciones de tecnología
- Formularios de contacto y modal de descarga de folletos
- Configuración lista para despliegue en Netlify

## Estructura del proyecto

- `src/` – aplicación principal
  - `components/` – componentes reutilizables por dominio
  - `pages/` – páginas de producto e inicio
  - `routes/` – rutas de React Router
  - `context/` – proveedor de idioma
  - `data/` – contenido, especificaciones e imágenes
  - `services/` – funciones de envío de formulario
  - `utils/` – validaciones y utilidades
- `public/` – archivos estáticos, redirecciones y sitemap
- `package.json` – dependencias y scripts
- `netlify.toml` – configuración de despliegue Netlify

## Comandos disponibles

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Flujo de desarrollo

1. Instalar dependencias con `npm install`
2. Iniciar el servidor de desarrollo con `npm run dev`
3. Abrir `http://localhost:5173`
4. Ejecutar `npm run lint` para comprobar reglas Oxc
5. Construir el proyecto para producción con `npm run build`

## Despliegue en Netlify

La configuración de Netlify se encuentra en `netlify.toml`.

- `build` command: `npm run build`
- `publish` directory: `dist`
- Redirección SPA: `/index.html`

