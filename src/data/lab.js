import { curatedProjects, toProjectCard } from './projects';

/**
 * The lab chapter: motion, video and 3D.
 *
 * `pieces` are slugs from `projects.js` — the lab never carries its own copy
 * of a project, it points at the curated one. A discipline with no finished
 * piece says so in `status` instead of showing an empty grid: add the piece
 * to `projects.js`, list its slug here, and drop the `status`.
 */
const disciplines = [
  {
    id: 'motion',
    title: 'Motion graphics',
    text: 'Animación con intención: titulares que entran, transiciones que explican y un ritmo que guía la lectura. En web la escribo con GSAP, y este portfolio es la primera pieza.',
    tags: ['GSAP', 'Motion en web'],
    pieces: [],
  },
  {
    id: 'video',
    title: 'Edición de vídeo',
    text: 'Montaje, ritmo y narrativa para contenido digital. Editar me enseñó a mirar un producto como una secuencia completa, no como una pantalla suelta.',
    tags: ['Montaje', 'Contenido digital'],
    pieces: [],
    status: 'Reel en preparación',
  },
  {
    id: '3d',
    title: '3D',
    text: 'Escenas en tiempo real dentro del navegador: geometría procedural, shaders propios y piezas que se pueden tocar.',
    tags: ['Three.js', 'GLSL', 'React Three Fiber'],
    pieces: ['cnc-lathe-visualizer', 'nicolas-portfolio3D'],
  },
];

const bySlug = new Map(curatedProjects.map((project, index) => [project.slug, toProjectCard(project, index)]));

export const labDisciplines = disciplines.map((discipline, index) => ({
  ...discipline,
  number: String(index + 1).padStart(2, '0'),
  // A slug that no longer exists is dropped rather than rendered as a dead link.
  pieces: discipline.pieces.map((slug) => bySlug.get(slug)).filter(Boolean),
}));
