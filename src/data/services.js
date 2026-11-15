import { toolGroups } from './content';

/** Service copy uses the existing stack; no invented software or metrics. */
export const services = [
  {
    id: 'web', title: 'Desarrollo', emphasis: 'con propósito.', label: 'Web & producto', image: '/img/hero-glass/web.webp',
    caption: 'De la idea a una interfaz que se usa',
    description: 'Sitios web y productos digitales que conectan una necesidad real con una experiencia clara, adaptable y bien construida.',
    deliverables: ['Webs para negocios', 'Interfaces de producto', 'Aplicaciones y prototipos'],
    tools: toolGroups[0].tools,
    process: ['Entender el objetivo y a quién va dirigido.', 'Definir estructura y flujos de navegación.', 'Desarrollar, probar y ajustar en dispositivos reales.'],
    href: '#proyectos', cta: 'Ver proyectos',
  },
  {
    id: 'design', title: 'Diseño', emphasis: 'con criterio.', label: 'Diseño gráfico & UI', image: '/img/hero-glass/design.webp',
    caption: 'La forma también comunica',
    description: 'Diseño gráfico, interfaces y sistemas visuales para que una marca se reconozca y su mensaje se entienda desde el primer vistazo.',
    deliverables: ['Diseño de interfaces', 'Sistemas visuales', 'Piezas gráficas digitales'],
    tools: toolGroups[1].tools,
    process: ['Explorar la identidad, las referencias y el contexto.', 'Diseñar jerarquías, composiciones y componentes.', 'Refinar la propuesta y preparar las piezas finales.'],
    href: '#contacto', cta: 'Hablemos de diseño',
  },
  {
    id: 'motion', title: 'Imagen', emphasis: 'en movimiento.', label: 'Motion, vídeo & 3D', image: '/img/hero-glass/motion.webp',
    caption: 'Ritmo, narrativa y profundidad',
    description: 'Motion graphics, edición de vídeo y experiencias 3D que dan vida a una idea y guían la atención con intención.',
    deliverables: ['Animación y motion graphics', 'Montaje de vídeo', 'Escenas 3D interactivas'],
    tools: toolGroups[2].tools,
    process: ['Definir el mensaje y la secuencia visual.', 'Construir el montaje, la animación o la escena.', 'Afinar ritmo, transiciones y formato de entrega.'],
    href: '#perfil', cta: 'Conocer mi enfoque',
  },
  {
    id: 'marketing', title: 'Estrategia', emphasis: 'que conecta.', label: 'Estrategia digital', image: '/img/hero-glass/strategy-chess.webp',
    caption: 'Del mensaje al punto de contacto',
    description: 'Marketing digital y contenido que conectan la identidad de una marca con su público, desde una landing hasta sus piezas de comunicación.',
    deliverables: ['Landings de campaña', 'Contenido para marcas', 'Comunicación visual'],
    tools: ['Contenido digital', 'Diseño gráfico', 'Landing pages', 'IA aplicada'],
    process: ['Aclarar público, objetivo y mensaje.', 'Dar forma a los contenidos y puntos de contacto.', 'Revisar la respuesta y proponer mejoras.'],
    href: '#contacto', cta: 'Hablemos de tu marca',
  },
  {
    id: 'ai', title: 'Ideas', emphasis: 'amplificadas.', label: 'IA & automatización', image: '/img/hero-glass/3d.webp',
    caption: 'El multiplicador del proceso',
    description: 'Uso inteligencia artificial y automatización para explorar posibilidades, conectar herramientas y agilizar tareas con revisión y criterio humano.',
    deliverables: ['Flujos de automatización', 'Agentes de IA', 'Prototipado asistido'],
    tools: toolGroups[3].tools,
    process: ['Identificar una tarea repetitiva o una oportunidad.', 'Prototipar el flujo y comprobar sus resultados.', 'Integrar, revisar y documentar su uso.'],
    href: '#contacto', cta: 'Explorar una solución',
  },
];
