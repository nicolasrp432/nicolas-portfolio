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
├─ hooks/         useGsapScope · useActiveSection · useFocusTrap · useGithubProjects
│                 useMediaQuery · useScrollLock
├─ lib/gsap.js    Registro de plugins, defaults y el interruptor de movimiento
├─ components/
│  ├─ motion/     SplitHeadline · Reveal · Marquee · Magnetic · Parallax
│  ├─ chrome/     Navbar · Cursor · SectionRail · Footer · GrainOverlay
│  ├─ ui/         BrandMark · ArrowLink · SectionHeading · CopyEmail · StackIcons
│                 Asterisk
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

### Navegación

La página **no tiene cortina de entrada**: pinta directamente y el timeline del
hero es su animación de apertura.

La masthead no se esconde al bajar, se **condensa**. Una barra que se oculta en
scroll descendente desaparece justo cuando un salto de ancla la necesita. La
orientación la dan tres señales: una cápsula que se desliza al capítulo activo
(`useActiveSection`, con un `IntersectionObserver` colapsado a una banda de altura
cero, así solo un enlace puede estar activo), `aria-current` para tecnología
asistiva, y una regla de progreso que sustituye al rail lateral en pantallas
estrechas.

⚠️ El panel móvil se renderiza como **hermano** de `<header>`, nunca dentro. La
masthead lleva `backdrop-filter`, que la convierte en bloque contenedor de sus
descendientes `fixed`: un panel anidado resuelve su `inset` contra una barra de
86 px en lugar del viewport y colapsa a nada. Hay un test que lo vigila.

### Scroll horizontal

Regla del `sections.css`: en el bloque responsive **nada puede fijar una altura
en píxeles ni un ancho mayor que 100%** a un elemento en flujo. Además, los hijos
de grid y flex llevan `min-width: 0` en `base.css` — su valor por defecto (`auto`)
deja que un solo token largo sin puntos de corte, como el slug de un repo o una
dirección de correo, ensanche su pista por encima del viewport. Es invisible en
escritorio y es la causa habitual del scroll lateral en móvil.

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

El retrato es `public/nicolasrp-Photoroom.png`, el recorte sin fondo tal cual. Se
sirve como WebP de 76 KB (32 KB en móvil) mediante `<picture>`, con el PNG de
1,7 MB solo como respaldo para navegadores sin WebP. Las derivadas son
**reencodings, no recortes**: mismo encuadre, y el CSS lo dibuja con
`object-fit: contain` sobre una caja `aspect-ratio`, sin altura fija que lo corte.

Build actual: **~94 KB gzip** de aplicación + **27 KB gzip** de GSAP en su propio
chunk. El grano de la página es un filtro SVG en línea de ~300 bytes, no un bitmap.

## Pendiente

- Sustituir la URL de LinkedIn en `src/data/site.js` por la real.
- `site.url` y las URL absolutas de `index.html` asumen GitHub Pages; ajustar si
  se despliega en otro dominio.
