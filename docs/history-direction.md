# Historia visual · 23 noviembre 2026

## Referencias revisadas

- [Apple, AirPods Pro](https://www.apple.com/airpods-pro/): imágenes a gran escala,
  información por capítulos y detalle del objeto. Se toma la jerarquía, no sus assets.
- [Aten7 / Immersive Garden](https://immersive-g.com/projects/aten7/): espacio
  arquitectónico y cronología inmersiva como parte de la narración.
- [Abstract Intelligence / Mallard & Claret](https://mallardandclaret.com/our-latest-release-abstract-intelligence-picks-up-sotd-fwa-and-developer-award/):
  escultura y relato con scroll, con atención al coste de la experiencia.

## Dirección implementada

Cuatro capítulos biográficos: agencia de marketing en Colombia (2023–2025), diseño en Platzi, programación
en 42 y presente en Bilbao. Hechos aportados por Nicolás. Ciudad, campus y periodo de marketing confirmados por Nicolás el 23/11/2026.
No se inventa nombre de agencia, fechas de matrícula, clientes, premios ni dificultades.
Los textos conectan cada aprendizaje con su práctica actual.

Escenas de imagen con profundidad, retratos, composición tipográfica y planos de
código. GSAP mueve solo capas visuales con el scroll nativo. El texto no se oculta
ni desaparece al cruzar un umbral. No se añade un segundo motor WebGL a la historia.
La escena tridimensional real sigue disponible en /3d/.

En móvil cada escena precede a su texto con fondo sólido. No hay texto cubierto
por una escena sticky. Pausa manual y preferencia de movimiento reducido.
La portada original no cambia.

## Legibilidad

El cierre de las especialidades tenía `on-ink` y `ink-surface`, pero esas clases no
le daban fondo oscuro. Se declara el fondo y el texto explícitamente en
`.specialty-contact`. Las placas de proyectos tienen ahora una veladura clara
bajo sus textos oscuros para no depender del color de cada imagen.
