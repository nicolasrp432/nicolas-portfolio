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

**Nada se fija (`pin`) ni se ata al scroll con `scrub` para cambiar contenido.**
La caja de herramientas lo hacía: secuestraba dos viewports y cruzaba sus tres
grupos en un mismo marco, así que no se podían comparar y no se podía pasar de
largo. Ahora son tres tarjetas en escalera, las tres legibles a la vez. Hay un
test que falla si vuelve a aparecer un trigger con `pin`.

### Titulares

`SplitHeadline` parte la frase en caracteres `inline-block`, y eso convierte
cada hueco entre letras en un punto de corte de línea: un titular más ancho que
su columna se rompe **dentro** de una palabra. Por eso cada palabra va envuelta
en `.split-word` (`inline-block; white-space: nowrap`), que deja los espacios
como único punto de corte.

El hero tiene su escala centrada propia; `--step-display` se ajusta a la columna
que comparte con el standfirst. Los titulares conservan palabras completas.

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

`src/data/projects.js` es la **fuente de verdad**: lista curada y ordenada. Antes
estaba invertido —la API de GitHub elegía los seis repos con más estrellas y
actividad, y un mapa de overrides parcheaba el copy—, así que la portada la
decidía el último push y la selección no se podía controlar.

`useGithubProjects` ya no selecciona, solo **enriquece**: cruza por nombre de
repo y aporta año del último push, lenguaje y estrellas. Sin red, con límite de
peticiones agotado o para un repo de otra persona (el proyecto en equipo lo es),
quedan los valores curados. La lista nunca depende de la red. La respuesta se
cachea 30 min en `sessionStorage`: sin autenticar GitHub da 60 peticiones/hora.

El copy va escrito a mano porque casi ningún repo tiene descripción en GitHub, y
los que la tienen es de plantilla. Nada se infiere del nombre del repo. Un test
falla si un `summary` baja de 30 caracteres, que es como se cuela un marcador de
posición sin sustituir.

Los `featured` llevan tarjeta con plancha de color; el resto son filas de índice
compactas. Trece planchas serían un muro de 3.500 px.

Sobre las dos listas hay un **estante de carpetas de vidrio** (`GlassFolder`,
portado de «Glass Folder Cards» de 21st.dev). Cada proyecto declara una `folder`
en `projects.js` y `projectFolders` define las carpetas. Sin ninguna abierta se
ve el índice entero, igual que antes; abrir una lo acota a esa carpeta. Las
carpetas **filtran, no guardan**: las hojas que asoman son decoración
(`aria-hidden`) y la carpeta es un único botón con `aria-pressed`, porque a ese
tamaño una hoja mide ~20 px de alto y no sirve como enlace. El arte del fondo se
genera con ruido (`lib/folderArt.js`, chunk propio pedido por `import()`) y su
receta nombra tokens, no colores. Las etiquetas se dividen por `--gf-k` para
seguir siendo legibles cuando la carpeta se encoge en móvil.

### Vidrio y manifiesto

El vidrio es el único material que no es papel ni tinta, y sus colores viven en
`tokens.css` como papel cálido visto a través de un lente. `LiquidGlass` (portado
de 21st.dev, de Tailwind a CSS plano) refracta de verdad solo en Chromium; Safari
y Firefox reciben vidrio esmerilado y `prefers-reduced-transparency`, una placa
opaca. Dos reglas:

- **Solo sobre imagen o color.** Sobre papel liso no hay nada que doblar y queda
  un rectángulo gris. Los objetos del hero son renders con transparencia real;
  Waterline dibuja su propia lente. El botón de WhatsApp conserva su contraste.
- **Tamaño fijo.** El mapa de desplazamiento es un PNG generado al medir la
  caja: animar su ancho o alto regenera uno por fotograma.

Las tres piezas del manifiesto usan `LiquidSculpture`, con el motor WebGL2 de
«Liquid Sculpture Hero» de 21st.dev (`lib/liquidEngine.js`). Se carga al acercarse
al viewport y reacciona al puntero o al tacto. El fondo coincide con el papel del
manifiesto. Fuera de pantalla se pausa; con movimiento reducido o sin WebGL queda
la imagen original. Lab ya no es una sección ni un destino de navegación.

### Educación

`/educacion/` es **un segundo documento**, no una ruta de cliente. El proyecto no
tiene router y se despliega estático, así que se añade una entrada más a
`rollupOptions.input` y Vercel la sirve sin reescrituras. A cambio: metadatos
propios e indexables, las anclas `#seccion` siguen sin ambigüedad, y el JS de la
home no crece — cada página carga su propio bundle sobre el chunk compartido.

`src/data/education.js` separa el trabajo de escuela del de cliente a propósito:
son ejercicios y currículo, no entregables para alguien. La forma del dato es
idéntica, así que `toProjectCard`, `ProjectCard` y `ProjectRow` los renderizan
sin cambios.

⚠️ **Un enlace del navbar a otra página estaba condenado a morir.** `goTo`
llamaba a `preventDefault()` sin condición y solo después buscaba el destino:
cancelaba la navegación y no la sustituía por nada. Ahora la comprobación va
antes, y un enlace con `href` se deja al navegador. Un test lo vigila afirmando
que el click **no** queda cancelado.

En `navLinks`, la ausencia de `index` es la señal de que una entrada vive fuera
de la home: el rail y el espía de scroll solo ven `chapters`, la numeración
01–06 sigue contigua, y el navbar marca esa entrada con `↗` en vez de numeral.

Las certificaciones usan `<details>` / `<summary>` nativos —teclado, semántica y
estado sin JS— y el bloque no se renderiza mientras la lista esté vacía: una
sección vacía se lee como un sitio a medio hacer. Cada certificado exige
`verifyUrl` o `file`; un test falla si falta cualquiera de los dos.

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

El hero usa cinco objetos de vidrio generados para representar web/producto,
diseño, motion/vídeo, estrategia digital (caballo de ajedrez) y 3D. Los WebP en `public/img/hero-glass/`
conservan transparencia RGBA y el encuadre original.
Los prompts y el método de generación están en `docs/hero-glass-prompts.md`.
Los retratos anteriores se conservan como recursos del proyecto.

### Hero: De la idea a…

`src/data/hero.js` reúne el mensaje y las posiciones de
los cinco objetos. `PerspectiveTunnelHero` adapta la profundidad del componente
21st.dev usando GSAP, ya instalado. Tiene entrada en Z, paralaje de puntero y
avance con el scroll nativo. En escritorio el hero permanece visible con CSS sticky
durante 240svh; el mismo recorrido transforma el hook de producto a experiencia y
marca. El retrato original conserva su color, con la cara separada del texto.
Las disciplinas viven en `tickerWords`, dentro de la cinta GSAP.
El texto y los CTA permanecen accesibles. En móvil los objetos componen una escena
bajo el texto. Con movimiento reducido se conserva la composición estática.
El componente vive en `src/components/ui`, con CSS en `src/styles/sections.css`.
No necesita Framer Motion, Tailwind, TypeScript ni proveedores adicionales para
esta adaptación al sistema React/JSX existente.

Build actual: **~94 KB gzip** de aplicación + **27 KB gzip** de GSAP en su propio
chunk. El grano de la página es un filtro SVG en línea de ~300 bytes, no un bitmap.

### Navbar de vidrio (Waterline)

`src/components/ui/liquid-glass-navbar.jsx` adapta Nimbus UI Waterline de
Guglielmo Giannattasio. El indicador líquido sigue la sección activa y conserva
los enlaces nativos entre documentos. El material usa papel cálido y coral;
las reglas de integración viven en `src/styles/chrome.css` y los colores en
`src/styles/tokens.css`. En móvil se conserva el menú completo con un botón de
vidrio. Sin WebGL se muestra una cápsula CSS; movimiento reducido elimina la
animación continua. No se activa sonido ni distorsión SVG del contenido.

El portfolio usa React/JSX y CSS propio, con componentes reutilizables en
`src/components/ui`. Esta adaptación no necesita proveedores, imágenes ni
paquetes adicionales. El ejemplo original en TSX puede portarse a JSX como
 aquí; una migración opcional a TypeScript/Tailwind/shadcn sería independiente:
configurar TypeScript con JSX y alias `@/*` hacia `src/*`, integrar Tailwind con
Vite y ejecutar el inicializador de shadcn apuntando a `src/components/ui` y a
la hoja de estilos del proyecto, revisando sus estilos base antes de aplicarlos.


### Warp Carousel de proyectos

`ui/warp-carousel.jsx` adapta el componente de Louis Studios entregado desde
21st.dev: conserva la geometría del anillo, shaders de distorsión y fallback 2D.
El pintor usa títulos, numeración, tipo y tecnologías reales; elimina las métricas
de ejemplo. `project-warp-gallery.jsx` mantiene descripción y enlaces en HTML,
con selección directa, teclado, flechas y arrastre. El motor se importa cerca del
viewport y no tiene autoplay; con movimiento reducido queda una placa estática.
Las carpetas filtran ambas vistas y “Lista completa” conserva las tarjetas/filas
originales, también usadas en Educación. No se cambian URLs ni datos curados.

Se mantiene React/JSX y CSS plano: el componente es autosuficiente y no necesita
instalar shadcn, Tailwind ni TypeScript. La ruta reusable existente es
`src/components/ui`; los estilos están en `src/styles/sections.css`.

El hero suma tres piezas glass en escritorio (ocho en total), con hover en una
capa separada del desplazamiento GSAP. En móvil conserva los cinco objetos;
las imágenes adicionales se sirven con `picture` condicionado al ancho.
Se retiraron las dos leyendas inferiores del hero.
