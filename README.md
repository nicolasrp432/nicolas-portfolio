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

Los techos de `--step-hero` y `--step-display` los fija la columna más estrecha
en la que viven, no lo que luce en un monitor ancho. `--step-hero` comparte fila
con el retrato; `--step-display`, con el standfirst.

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
01–05 sigue contigua, y el navbar marca esa entrada con `↗` en vez de numeral.

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

El retrato es `public/nicolasrp-Photoroom.png`, el recorte sin fondo tal cual. Se
sirve como WebP de 76 KB (32 KB en móvil) mediante `<picture>`, con el PNG de
1,7 MB solo como respaldo para navegadores sin WebP. Las derivadas son
**reencodings, no recortes**: mismo encuadre, y el CSS lo dibuja con
`object-fit: contain` sobre una caja `aspect-ratio`, sin altura fija que lo corte.

Build actual: **~94 KB gzip** de aplicación + **27 KB gzip** de GSAP en su propio
chunk. El grano de la página es un filtro SVG en línea de ~300 bytes, no un bitmap.
