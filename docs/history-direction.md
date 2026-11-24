# Atlas personal — dirección y funcionamiento

## Decisión visual

Una historia editorial que explica de dónde viene la mezcla de marketing, diseño y programación de Nicolás. El ancla memorable es un único rey de ajedrez tridimensional que acompaña el recorrido, cambia de posición y se convierte en una malla en 42. El retrato es una capa independiente en cada capítulo.

DFII: impacto 5 + encaje 5 + viabilidad 4 + rendimiento 4 − riesgo de consistencia 3 = **15**.

Paleta: papel cálido, tinta y coral; menta en la etapa de programación. Se conservan las familias tipográficas existentes, sin fuentes ni librerías nuevas. La escala tipográfica, los mapas y los objetos construyen la composición.

- Portada: retrato caminando entre los contornos de Colombia y España.
- Colombia: cartel de campaña, mapa y retrato con bocetos. Marketing en agencia, 2023–2025.
- Platzi: mesa de tipografía, muestras de color, curva Bézier y retrato leyendo. Diseño.
- 42 Urduliz Bizkaia: marca 42, capas de código y retrato con portátil. Formación actual, no graduación.
- Bilbao: llegada al mapa, retrato caminando y convergencia de web, motion y 3D.

El bloque de código es una metáfora visual del proceso, no un proyecto atribuido a 42. No se han añadido fechas académicas, nombre de agencia, puesto ni resultados no confirmados.

## Animación y accesibilidad

`PortraitJourney` coordina GSAP/ScrollTrigger y un único motor `journeyScene`, cargado al acercarse al relato. La geometría se reutiliza de `kingModel`, también usada por la especialidad 3D. El motor recibe una fase continua 0–3, sin actualizaciones React por fotograma. El recorrido es reversible y no captura el scroll.

La pieza no intercepta gestos. Se dibuja bajo demanda, con densidad máxima 1.25; se detiene fuera de pantalla o con la pestaña oculta. El motor libera canvas, observadores, geometrías, materiales y entorno al desmontarse. Un fallo de WebGL conserva la versión estática en los capítulos.

En móvil, el texto determina su altura antes del escenario, sin superponerse con los retratos. El rey es más pequeño y su trayecto queda más bajo. Los capítulos ofrecen enlaces nativos, navegación por teclado y pausa sin modificar la altura de la página. Con movimiento reducido se omite el 3D y se mantienen ilustraciones estáticas y todo el contenido.

El cursor nativo solo se oculta cuando hay un cursor personalizado montado **y** una posición real de ratón. Se restaura al salir, perder el foco o desmontarse. Las páginas nuevas conservan el puntero nativo.

## Fuentes y referencias

- [Natural Earth 1:110m](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson): contornos de Colombia y España, dominio público, proyección equirectangular simplificada. El punto de Bilbao es orientativo a escala nacional.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): coordinación del recorrido.
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html): renderizado y recursos.
- [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): revisión de navegación, movimiento, imágenes, foco y móvil.
- Referencias conceptuales previas: [Apple](https://www.apple.com/airpods-pro/) para jerarquía y secuencia; [Immersive Garden](https://immersive-g.com/projects/aten7/) para continuidad espacial. No se copian sus imágenes ni composiciones.

Las guías de StyleSeed/ui-motion están orientadas a componentes Framer Motion, no a scroll/GSAP; no se incorpora una segunda librería para aplicarlas fuera de su alcance. Web Artifacts Builder está orientado a artefactos nuevos: se mantiene la aplicación existente y su publicación habitual.
