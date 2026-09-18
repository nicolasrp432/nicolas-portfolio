# Portfolio — Nicolás Rodríguez

Portfolio personal: frontend, producto digital e IA. React 19 + Vite 7, animado
con GSAP y construido sobre un sistema de diseño propio.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # -> dist/
npm run preview  # sirve dist/
npm test         # vitest
```

## Dirección de diseño

**Editorial Brutalism.** Papel y tinta con un único acento coral, tipografía
sobredimensionada y rejilla asimétrica. Tres registros tipográficos con papeles
distintos y no intercambiables:

| Registro | Fuente | Uso |
| --- | --- | --- |
| Estructura | Manrope 600–800 | Titulares y cuerpo |
| Énfasis | Playfair Display *italic* | El corte serif dentro de un titular — nunca en cuerpo |
| Metadatos | DM Mono | Índices, etiquetas, pies |

La paleta vive entera en `src/styles/tokens.css`. **Ningún color se escribe
fuera de ese archivo.** Sombras duras desplazadas, nunca elevación difusa.

El elemento identitario es el **rail de índice** fijo a la izquierda: marca el
progreso de lectura, numera el capítulo actual y se recolorea según el fondo de
la sección (`theme` en `navLinks`).

## Arquitectura

```
src/
├─ data/          Contenido y enlaces — única fuente de verdad, sin URLs sueltas
├─ hooks/         useGsapScope, useGithubProjects, useMediaQuery, useScrollLock
├─ lib/gsap.js    Registro de plugins, defaults y el interruptor de movimiento
├─ components/
│  ├─ motion/     SplitHeadline · Reveal · Marquee · Magnetic · Parallax
│  ├─ chrome/     Preloader · Cursor · SectionRail · Navbar · Footer · GrainOverlay
│  ├─ ui/         BrandMark · ArrowLink · SectionHeading · CopyEmail
│  └─ sections/   Hero · Ticker · Projects · Profile · Toolbox · Roadmap · Contact
└─ styles/        tokens → base → components → chrome → sections (orden obligatorio)
```

### Animación

Toda animación se registra dentro de un bloque `gsap.matchMedia()` con la clave
`MOTION_OK`. Si alguien pide movimiento reducido, el bloque **nunca se ejecuta** y
`matchMedia` revierte lo que hubiera creado.

Los elementos que GSAP va a animar solo se pre-ocultan con
`<html data-motion="on">`, atributo que fija `main.jsx` antes del primer pintado.
Sin JS o con movimiento reducido el atributo no existe y **todo el contenido se
ve**: nunca queda atrapado detrás de una animación que no va a ocurrir.

> Al añadir una variante nueva a `Reveal`, hay que añadir su estado previo en
> `components.css`. Una variante sin pre-estado produce un parpadeo.

⚠️ `gsap.context` resuelve los selectores contra los **descendientes** del scope.
Una sección que quiera dispararse con sus propios límites debe usar el nodo que
recibe `useGsapScope(setup)`, no un selector con su propia clase — este último no
encuentra nada y GSAP solo lo avisa por consola. Hay un test que lo vigila.

### Proyectos

`useGithubProjects` lee la API pública de GitHub, ordena por estrellas y
actividad, y cachea 30 min en `sessionStorage` (el límite sin autenticar es de 60
peticiones/hora). `projectOverrides` en `src/data/projects.js` permite sustituir
la descripción de un repo por copy editorial; el resto usa los datos de la API.
Si la petición falla, se renderiza la selección curada.

## Accesibilidad

- Skip link como primer elemento enfocable.
- Titulares partidos en caracteres: los `span` van `aria-hidden` y la frase se
  expone una vez en `aria-label`, no letra a letra.
- Foco siempre visible, con contraste invertido sobre los fondos de tinta.
- Cursor personalizado solo con puntero fino; el nativo se oculta bajo esa misma
  condición, así que nunca se pierde.
- El email se copia con anuncio `aria-live` y recurre a seleccionar el texto si
  no hay Clipboard API.

## Rendimiento

El retrato pesaba 2,2 MB (un PNG en base64 dentro de un SVG). Ahora son 102 KB en
WebP con `<picture>`, variante de 640 px para móvil y PNG de respaldo.

Build actual: **~94 KB gzip** de aplicación + **27 KB gzip** de GSAP en su propio
chunk. El grano de la página es un filtro SVG en línea de ~300 bytes, no un bitmap.

## Pendiente

- Sustituir la URL de LinkedIn en `src/data/site.js` por la real.
- `site.url` y las URL absolutas de `index.html` asumen GitHub Pages; ajustar si
  se despliega en otro dominio.
