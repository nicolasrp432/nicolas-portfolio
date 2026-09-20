/**
 * School work: the 42 curriculum and the frontend course.
 *
 * Kept apart from `curatedProjects` on purpose. These are exercises, theory and
 * progression — not deliverables built for someone — and mixing the two would
 * weaken both readings. The shape is identical, so `toProjectCard` and the
 * `ProjectCard` / `ProjectRow` components render these unchanged.
 *
 * Same rule as the client list: every entry was checked against its repo tree
 * before being written up. Nothing is inferred from a repo name, and two empty
 * repositories (`libft`, `Primer-repositorio-`) are deliberately absent.
 */
export const schools = [
  {
    id: '42',
    name: '42',
    note: 'Currículo en C y Python, evaluado entre pares',
  },
  {
    id: 'frontend',
    name: 'Formación frontend',
    note: 'JavaScript, React y las bases de la web',
  },
];

export const educationProjects = [
  {
    slug: 'push-swap',
    school: '42',
    title: 'push-swap',
    kind: 'Algoritmos · C',
    summary:
      'Ordenar una pila usando una segunda pila y un juego de instrucciones restringido, gastando los menos movimientos posibles. El repo trae su propia libft y el fichero de trazas con el que se mide cada estrategia de ordenación.',
    tags: ['C', 'Algoritmos', 'Makefile'],
    year: '2026',
    featured: true,
  },
  {
    slug: 'A-mazing',
    school: '42',
    title: 'A-Maze-ing',
    kind: 'Algoritmos · Python',
    summary:
      'Generador de laberintos: lee una configuración, construye el laberinto (opcionalmente perfecto, con un único camino entre entrada y salida), lo guarda en un formato hexadecimal compacto y lo dibuja en el terminal. La lógica vive en un módulo instalable aparte para poder reutilizarla.',
    tags: ['Python', 'Algoritmos'],
    year: '2026',
    featured: true,
  },
  {
    slug: 'Get-Next-Line',
    school: '42',
    title: 'get_next_line',
    kind: 'Memoria y buffers · C',
    summary:
      'Leer una línea de un descriptor de fichero, de cualquier longitud y sin saber cuánta queda por delante, manteniendo el estado entre llamadas sucesivas. El ejercicio de memoria dinámica y buffers estáticos por el que pasa todo el mundo en 42.',
    tags: ['C', 'Punteros', 'Buffers'],
    year: '2025',
  },
  {
    slug: 'printf_teoria',
    school: '42',
    title: 'ft_printf',
    kind: 'Librería · C',
    summary:
      'Reimplementación de printf compilada como librería estática: argumentos variádicos, banderas y conversiones resueltos desde cero. Incluye un análisis escrito del proyecto y su propia batería de pruebas.',
    tags: ['C', 'Variádicos', 'Librería'],
    year: '2025',
  },
  {
    slug: 'Exam-Rank02',
    school: '42',
    title: 'Exam Rank 02',
    kind: 'Examen · C',
    summary:
      'Mis soluciones a los cuatro niveles del examen Rank 02, resueltas contra reloj y sin acceso a internet, que es como se rinde de verdad. Un nivel por carpeta.',
    tags: ['C', 'Examen'],
    year: '2026',
  },
  {
    slug: 'Python',
    school: '42',
    title: 'Módulos de Python',
    kind: 'Currículo · Python',
    summary:
      'Los módulos de Python del currículo de 42, por entregas: cada carpeta es un módulo con sus ejercicios resueltos y el enunciado del que salen.',
    tags: ['Python', 'Currículo'],
    year: '2026',
  },
  {
    slug: 'React-basico',
    school: 'frontend',
    title: 'Curso de React',
    kind: 'Fundamentos · React',
    summary:
      'Los ejercicios del curso de React montados desde cero: componentes, props, estado y composición, antes de usarlos para construir nada real.',
    tags: ['React', 'JavaScript'],
    year: '2025',
  },
  {
    slug: 'katas-javascript',
    school: 'frontend',
    title: 'Katas de JavaScript',
    kind: 'Práctica · Vitest',
    summary:
      'Katas resueltas contra una batería de tests con Vitest: el enunciado es el test y el ejercicio consiste en hacerlo pasar. La forma más rápida que conozco de fijar una API del lenguaje.',
    tags: ['JavaScript', 'Vitest', 'Katas'],
    year: '2025',
  },
  {
    slug: 'Ejercicio-landing-page',
    school: 'frontend',
    title: 'Landing desde modelo',
    kind: 'Maquetación · HTML y CSS',
    summary:
      'Reproducir una landing a partir de un modelo dado y medir el resultado contra el diseño original. HTML y CSS a mano, sin framework ni librería de estilos: el ejercicio es precisamente no tener atajos.',
    tags: ['HTML', 'CSS', 'Maquetación'],
    liveUrl: 'https://nicolasrp432.github.io/Ejercicio-landing-page/',
    year: '2025',
  },
  {
    slug: 'javascript-practice-arena',
    school: 'frontend',
    title: 'JavaScript Practice Arena',
    kind: 'Práctica · Navegador',
    summary:
      'Una página interactiva para practicar JavaScript con ejercicios que se resuelven en el propio navegador, con estética de consola de videojuegos.',
    tags: ['JavaScript', 'HTML'],
    year: '2025',
  },
];

/**
 * Certifications.
 *
 * Each entry needs `verifyUrl`, `file`, or both — a certification nobody can
 * check is just a claim. `file` points at something under `public/`; remember
 * the repository is public, so whatever the document has printed on it becomes
 * public too. The block does not render at all while this list is empty.
 *
 * @typedef  {object} Certificate
 * @property {string}  id
 * @property {string}  title
 * @property {string}  issuer
 * @property {string}  date       ISO `YYYY-MM`.
 * @property {string} [verifyUrl] Public verification page.
 * @property {string} [file]      Path under `public/`, e.g. `/certificados/x.pdf`.
 */
export const certificates = [];
