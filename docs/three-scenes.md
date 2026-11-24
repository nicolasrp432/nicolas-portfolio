# Añadir 3D real al portfolio

La página `/3d/` ya incluye un rey de ajedrez construido con Three.js. Son mallas
tridimensionales, con iluminación, materiales físicos y cámara orbital. No es una
imagen girando. Se genera localmente y no necesita descargar un modelo.

## Dónde editar

- `src/lib/three/kingModel.js`: forma de las cuatro piezas. Los pares `[radio, altura]`
  del perfil generan superficies de revolución; la cruz utiliza dos cajas.
- `src/lib/three/kingScene.js`: cámara, luces, tablero, materiales, selección por
  rayos, despiece y liberación de recursos.
- `src/components/ui/ThreeKing.jsx`: montaje React, carga al acercarse a la sección,
  imagen alternativa y limpieza al salir.
- `src/components/ui/DimensionLab.jsx`: historia, capítulos y controles accesibles.

Para añadir otro objeto procedural, crea una función que devuelva un `Group`
como `createKing`. Reutiliza el patrón del motor; define sus piezas seleccionables
con `userData.part` y su altura inicial con `userData.homeY`. Mantén una imagen
alternativa y controles HTML para que no dependa exclusivamente del arrastre.

## Incorporar un modelo de Blender

1. Exporta el modelo como glTF binario (`.glb`), con materiales y texturas incluidos.
2. Guarda el archivo optimizado en `public/models/mi-modelo.glb` (esta ruta es un
   ejemplo, no un archivo incluido).
3. En un motor de escena separado, carga el modelo con el addon incluido en Three.js:

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gltf = await new GLTFLoader().loadAsync('/models/mi-modelo.glb');
scene.add(gltf.scene);
```

Después ajusta escala, cámara y centro según sus dimensiones. Maneja errores de
carga; si el visitante sale antes de terminar, libera el resultado en vez de
montarlo. Al desmontar libera geometrías, materiales y texturas, además del renderer.
Si el GLB incluye animaciones, requieren su propio `AnimationMixer` y actualización
mientras se reproducen. No sustituir directamente el rey con un modelo arbitrario:
los controles de despiece actuales esperan cuatro grupos concretos.

Referencia oficial: [GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html).

## Rendimiento y uso táctil

La escena actual se importa solo cerca del visor y dibuja cuando cambia algo.
No añade Three.js al inicio de la home. Limita la densidad de píxeles y pausa fuera
de pantalla. El scroll táctil funciona por defecto; “Explorar con el dedo” activa
el arrastre y “Volver al scroll” lo desactiva. Hay rotación por rango, botones de
material y selección de piezas accesibles por teclado. Si WebGL falla, queda un
poster y una explicación legible. El movimiento reducido elimina las transiciones.

Para futuras escenas, reduce polígonos y texturas antes de exportar y comprueba
el resultado en un teléfono real. No hay que añadir React Three Fiber para esta
escena; Three.js directo ya resuelve los controles y el ciclo de vida necesarios.

## Rey que recorre la historia

`src/lib/three/journeyScene.js` reutiliza `createKing()` en un canvas transparente. `journeyPose.js` define cuatro posiciones y orientaciones, en coordenadas normalizadas; para cambiar la ruta se editan esos puntos. La fase 0–3 llega desde GSAP en `PortraitJourney.jsx`. El capítulo 42 activa la malla de la misma geometría; no se descarga otro modelo. En móvil se reduce el tamaño y se baja el trayecto para proteger la lectura. `JourneyMap` dibuja contornos vectoriales locales, sin solicitudes a servicios de mapas.
