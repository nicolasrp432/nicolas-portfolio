import { GITHUB_USER } from './site';

/**
 * The work index — curated, ordered, and the single source of truth.
 *
 * This used to be inverted: the GitHub API chose the projects (top six by
 * stars, then recency) and a small override map patched their copy. That put
 * whatever happened to be pushed last on the front page and made the selection
 * impossible to control. Now the list below decides what appears and in what
 * order; GitHub only supplies freshness on top of it.
 *
 * It has to carry the copy, too: all but three of these repos have no
 * description on GitHub, and the three that do have templates
 * ("React + TypeScript + Vite"). Nothing here is inferred from a repo name.
 *
 * `featured` entries get a full card with a colour plate; the rest render as
 * compact index rows, so thirteen projects stay scannable instead of becoming
 * a wall of plates.
 */
export const curatedProjects = [
  {
    slug: 'SulyWeb',
    title: 'Suly Pretty Nails',
    kind: 'Salón de belleza · reservas',
    summary:
      'Sitio del salón con reservas, galería y contacto directo por WhatsApp. Incluye un panel de calendario con vistas de día, semana, mes y agenda, además de reseñas de Google y mapa integrados.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://suly-web.vercel.app',
    year: '2026',
    featured: true,
  },
  {
    slug: 'bar-zaharra',
    title: 'Bar Zaharra',
    kind: 'Carta digital · QR',
    summary:
      'Carta digital pensada para el QR de la mesa: capítulos navegables, ficha ampliada de cada plato con maridaje, favoritos que persisten entre visitas y un recomendador de tres preguntas para quien no sabe qué pedir.',
    tags: ['TypeScript', 'GitHub Pages'],
    liveUrl: 'https://nicolasrp432.github.io/bar-zaharra/',
    year: '2026',
    featured: true,
  },
  {
    slug: 'roket-agency',
    title: 'Roket Agency',
    kind: 'Agencia · proyecto propio',
    summary:
      'La web de mi agencia de marketing digital, construida con Astro: se sirve como HTML estático, así que carga rápido y el contenido es fácil de mantener.',
    tags: ['Astro', 'Sitio estático'],
    liveUrl: 'https://roket-agency.vercel.app',
    year: '2026',
    featured: true,
  },
  {
    slug: 'Unamunzaga-web',
    title: 'Unamunzaga',
    kind: 'Constructora',
    summary:
      'Sitio corporativo para una empresa constructora: presentación de servicios y vía de contacto en una estructura sobria y directa.',
    tags: ['TypeScript', 'React', 'Vite'],
    liveUrl: 'https://unamunzaga-web.vercel.app',
    year: '2025',
    featured: true,
  },
  {
    slug: 'playwrong',
    owner: 'ionburetx',
    title: 'Playwrong',
    kind: 'Cartelera · en equipo',
    summary:
      'Plataforma de cartelera de películas desarrollada en equipo, conectando una API externa como fuente del catálogo. Interfaz en React.',
    tags: ['React', 'API', 'En equipo'],
    liveUrl: 'https://playwrong-red.vercel.app',
    year: '2025',
    featured: true,
  },
  {
    slug: 'nicolas-portfolio',
    title: 'Portfolio editorial',
    kind: 'Proyecto propio',
    summary:
      'Identidad, proyectos y proceso en una experiencia editorial construida con React y GSAP. Sistema de tokens propio, animación con opt-out accesible y assets optimizados.',
    tags: ['React', 'GSAP', 'Design system'],
    liveUrl: 'https://nicolas-portfolio-eight.vercel.app',
    year: '2026',
    featured: true,
  },

  /* --- Index rows ------------------------------------------------------- */
  {
    slug: 'aura-glass-studio',
    title: 'Aura Glass Studio',
    kind: 'Salón de uñas · cliente',
    summary: 'Sitio para el salón de uñas de una clienta.',
    tags: ['TypeScript'],
    liveUrl: 'https://aura-glass-studio.vercel.app',
    year: '2026',
  },
  {
    slug: 'importadora-prototipo',
    title: 'Importadora',
    kind: 'Vehículos · prototipo',
    summary: 'Prototipo de sitio para una importadora de vehículos.',
    tags: ['TypeScript'],
    liveUrl: 'https://importadora-prototipo.vercel.app',
    year: '2026',
  },
  {
    slug: 'valentina-birthday',
    title: 'Valentina',
    kind: 'Evento · invitación',
    summary: 'Invitación digital de cumpleaños.',
    tags: ['HTML', 'CSS'],
    liveUrl: 'https://valentina-birthday-two.vercel.app',
    year: '2026',
  },
  {
    slug: 'A-mazing',
    title: 'A-Maze-ing',
    kind: 'Algoritmos · Python',
    summary:
      'Generador de laberintos del currículo de 42: lee una configuración, construye el laberinto (opcionalmente perfecto), lo guarda en un formato hexadecimal compacto y lo dibuja en el terminal. La lógica vive en un módulo instalable aparte.',
    tags: ['Python', 'Algoritmos'],
    year: '2026',
  },
  {
    slug: 'xs-landing-page',
    title: 'XS Landing',
    kind: 'Landing de producto',
    summary: 'Landing de una sola página para el lanzamiento de un producto.',
    tags: ['JavaScript'],
    liveUrl: 'https://xs-landing-page.vercel.app',
    year: '2026',
  },
  {
    slug: 'invitacion50',
    title: 'Invitación 50',
    kind: 'Evento · confirmación',
    summary: 'Invitación de cumpleaños con formulario de confirmación de asistencia.',
    tags: ['TypeScript', 'Formularios'],
    liveUrl: 'https://invitacion50.vercel.app',
    year: '2026',
  },
  {
    slug: 'Costurero',
    title: 'Costurero',
    kind: 'Tienda de costura',
    summary: 'Sitio para una tienda de costura.',
    tags: ['JavaScript'],
    liveUrl: 'https://costurero.vercel.app',
    year: '2025',
  },
];

/**
 * Merges one curated project with the live repo behind it, if the API answered.
 *
 * Curated copy always wins — the point of the list is that it reads better
 * than a repo description. Live data only fills in what changes over time.
 *
 * @param {object} project A `curatedProjects` entry.
 * @param {number} index Position in the rendered list, for the numeral.
 * @param {object} [repo] The matching GitHub repo, when one was fetched.
 */
export function toProjectCard(project, index, repo) {
  const owner = project.owner ?? GITHUB_USER;

  return {
    id: project.slug,
    index: String(index + 1).padStart(2, '0'),
    name: project.slug,
    title: project.title,
    kind: project.kind,
    summary: project.summary,
    tags: project.tags,
    featured: project.featured === true,
    repoUrl: `https://github.com/${owner}/${project.slug}`,
    liveUrl: project.liveUrl ?? '',
    year: repo?.pushed_at?.slice(0, 4) ?? project.year ?? '',
    stars: repo?.stargazers_count ?? 0,
    language: repo?.language ?? project.tags[0] ?? 'Producto digital',
  };
}
