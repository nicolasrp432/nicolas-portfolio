/** One identity, three specialties. These records also drive the home orbit. */
export const specialties = [
  {
    id: 'web', path: '/web-producto/', number: '01', label: 'Web y producto digital', short: 'Web & producto', verb: 'Toma forma',
    image: '/img/hero-glass/optimized/web.webp', title: 'De una necesidad', emphasis: 'a algo que se usa.',
    description: 'Diseño y desarrollo webs, aplicaciones e interfaces para que tus clientes puedan descubrirte, reservar, aprender o gestionar su día a día.',
    summary: 'Una idea se convierte en una web o una aplicación con una función clara.', example: 'Suly Pretty Nails · una web para reservar',
    metaTitle: 'Desarrollo web y producto digital — Nicolás Rodríguez', workTitle: 'Ideas que ya se pueden usar.',
    workIntro: 'Webs para clientes y productos propios. Cada caso conecta una necesidad concreta con una experiencia que puedes explorar.',
    offers: [
      ['Una web para tu negocio', 'Presentación, servicios y contacto. Desde una landing hasta una web con reservas y contenido propio.'],
      ['Una aplicación o producto', 'Flujos, pantallas y desarrollo de una primera versión: una plataforma de formación o una app de lectura, por ejemplo.'],
      ['Una interfaz que evoluciona', 'Componentes, mejoras de navegación e integración con servicios existentes.'],
    ],
    process: [
      ['Entender', 'Aclaramos qué necesita hacer el usuario, qué contenido tienes y cuál es el alcance.'],
      ['Diseñar y construir', 'Definimos estructura y pantallas. Desarrollo la experiencia y comparto avances para revisarla contigo.'],
      ['Probar y entregar', 'Revisamos móvil, navegación y formularios. Acordamos la publicación y cómo mantenerla.'],
    ],
    tools: ['React', 'JavaScript', 'Figma', 'Vite', 'Git & GitHub'],
    supports: 'Diseño de interfaces, motion y automatizaciones cuando el proyecto los necesita.',
    contact: 'Cuéntame qué necesitas construir.', message: 'Hola Nicolás, me interesa una web o producto digital. Necesito…',
    faq: [
      ['¿Una web o una aplicación?', 'Una web presenta y conecta con tu negocio. Una aplicación permite tareas como estudiar, reservar o gestionar información. Lo decidimos a partir de lo que necesitas resolver.'],
      ['¿Qué necesito para empezar?', 'Un objetivo, los contenidos disponibles y cualquier referencia o fecha importante. Con eso definimos una propuesta y un presupuesto ajustados al alcance.'],
    ],
    projects: ['SulyWeb', 'AppLectorJournal', 'PlataformaAinara'],
  },
  {
    id: 'motion', path: '/motion/', number: '02', label: 'Motion y contenido visual', short: 'Motion', verb: 'Cobra movimiento',
    image: '/img/hero-glass/optimized/motion.webp', title: 'Darle ritmo.', emphasis: 'Hacerlo sentir.',
    description: 'Animación, motion graphics y edición de vídeo para explicar ideas, presentar productos y dar una voz visual a tu marca.',
    summary: 'La forma encuentra su ritmo. El movimiento dirige la atención y cuenta algo.', example: 'De un punto a una idea · estudio interactivo',
    metaTitle: 'Motion graphics y animación web — Nicolás Rodríguez', workTitle: 'Una idea. Tres momentos.',
    workIntro: 'Un estudio original creado para este portfolio. Explora cómo una misma forma cambia de intención a través del movimiento.',
    offers: [
      ['Motion para marcas', 'Tipografía animada, transiciones y piezas gráficas que mantienen una identidad reconocible.'],
      ['Edición y narrativa', 'Montaje, ritmo y adaptación de material audiovisual para que el mensaje tenga una secuencia clara.'],
      ['Movimiento en la web', 'Animaciones vectoriales e interacciones integradas en una interfaz: ligeras, adaptables y conectadas con el usuario.'],
    ],
    process: [
      ['Encontrar la historia', 'Acordamos qué debe contar la pieza, dónde se verá y con qué materiales contamos.'],
      ['Diseñar el ritmo', 'Trabajo la dirección visual y una primera secuencia para validar composición, intención y movimiento.'],
      ['Afinar y adaptar', 'Revisamos el resultado y preparo las versiones acordadas: animación para web o vídeo para publicación.'],
    ],
    tools: ['After Effects', 'Lottie', 'GSAP', 'Edición de vídeo'],
    supports: 'Diseño gráfico, dirección visual y recursos 3D al servicio del mensaje.',
    contact: 'Demos movimiento a tu idea.', message: 'Hola Nicolás, me interesa una pieza de motion o edición de vídeo. Quiero comunicar…',
    faq: [
      ['¿Animación web o vídeo?', 'Para gráficos que reaccionan a una web, uso animación con código o Lottie. Para una pieza con montaje, sonido y reproducción independiente, acordamos una entrega en vídeo. El formato depende de la historia y del lugar donde se verá.'],
      ['¿Puedo partir de material que ya tengo?', 'Sí. Revisamos tu identidad, vídeos, imágenes y textos, sus permisos de uso y qué falta. La propuesta define duración, formatos y rondas de revisión.'],
    ],
    projects: [],
  },
  {
    id: '3d', path: '/3d/', number: '03', label: '3D y experiencias interactivas', short: '3D', verb: 'Gana dimensión',
    image: '/img/hero-glass/optimized/3d.webp', title: 'Una idea.', emphasis: 'Otra dimensión.',
    description: 'Creo escenas y experiencias 3D para explorar objetos, entender cómo funcionan y recorrer una historia desde otro punto de vista.',
    summary: 'La pantalla se abre a un espacio. Puedes acercarte, explorar y descubrir.', example: 'Torno CNC y Silicon Gambit · proyectos propios',
    metaTitle: '3D y experiencias interactivas — Nicolás Rodríguez', workTitle: 'Profundidad con propósito.',
    workIntro: 'Dos proyectos propios: una máquina que se puede inspeccionar y una navegación construida alrededor del ajedrez.',
    offers: [
      ['Visualización interactiva', 'Objetos y escenas que se pueden recorrer, girar e inspeccionar para entender sus partes.'],
      ['Experiencias para la web', 'Composiciones 3D integradas en una página, con navegación, interacción y atención al rendimiento.'],
      ['Exploración visual', 'Prototipos de escenas, materiales y movimiento para encontrar una dirección antes de construir la experiencia completa.'],
    ],
    process: [
      ['Elegir qué mostrar', 'Definimos el objeto, la historia y la interacción. Revisamos referencias y materiales disponibles.'],
      ['Construir la escena', 'Desarrollo una primera composición y validamos cámara, materiales y comportamiento.'],
      ['Integrar y ajustar', 'Probamos controles, tiempos de carga y adaptación a móvil según los dispositivos acordados.'],
    ],
    tools: ['Three.js', 'React Three Fiber', 'GLSL', 'React'],
    supports: 'Desarrollo web, composición y motion para conectar el objeto con la experiencia.',
    contact: 'Exploremos tu próxima dimensión.', message: 'Hola Nicolás, me interesa una visualización o experiencia 3D. Quiero mostrar…',
    faq: [
      ['¿Necesito tener un modelo 3D?', 'Depende del objeto. Podemos partir de un modelo disponible o valorar una construcción procedural, como en el torno CNC. Revisamos la complejidad antes de presupuestar.'],
      ['¿Puede funcionar en móvil?', 'El dispositivo es parte del diseño. Ajustamos geometría, efectos y controles, y definimos una alternativa visual cuando la experiencia lo requiere.'],
    ],
    projects: ['cnc-lathe-visualizer', 'nicolas-portfolio3D'],
  },
];
export const specialtyById = id => specialties.find(specialty => specialty.id === id);
export const caseNotes = {
  SulyWeb: { type: 'Web para cliente', need: 'Presentar el salón y facilitar el acceso a reservas y contacto.', response: 'Galería, reservas, calendario y acceso directo a WhatsApp.' },
  AppLectorJournal: { type: 'Producto propio', need: 'Reunir lectura, práctica y seguimiento en una misma experiencia.', response: 'Biblioteca, lector, ejercicios y ruta de aprendizaje en una aplicación móvil y web.' },
  PlataformaAinara: { type: 'Plataforma educativa', need: 'Organizar formación en micro-learning con distintos niveles de acceso.', response: 'Itinerarios, mentoría y comunidad conectados con autenticación y datos en Supabase.' },
  'cnc-lathe-visualizer': { type: 'Visualización · proyecto propio', need: 'Explorar las partes de un torno CNC desde el navegador.', response: 'Geometría procedural, cámara orbital y piezas seleccionables con su ficha técnica.' },
  'nicolas-portfolio3D': { type: 'Experiencia · proyecto propio', need: 'Explorar una forma de navegar a través de una escena de ajedrez.', response: 'Una partida de ajedrez sobre un chip que avanza con el scroll, con shaders y postprocesado.' },
};
