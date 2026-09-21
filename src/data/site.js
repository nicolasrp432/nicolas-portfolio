/**
 * Single source of truth for identity, links and SEO copy.
 * Nothing else in the app should hardcode a URL or a handle.
 */

export const GITHUB_USER = 'nicolasrp432';

export const site = {
  name: 'Nicolás Rodríguez',
  shortName: 'Nicolás',
  role: 'Frontend · Producto digital · IA',
  email: 'nicolasrp432@gmail.com',
  whatsapp: '34665015804',
  whatsappDisplay: '+34 665 015 804',
  whatsappMessage: 'Hola Nicolás, vi tu portfolio y me gustaría hablar sobre un proyecto.',
  location: 'España — remoto',
  availability: 'Disponible para colaborar',
  url: 'https://nicolas-portfolio-eight.vercel.app/',
  description:
    'Portfolio de Nicolás Rodríguez, desarrollador frontend y constructor de producto digital. React, interfaces con criterio y soluciones apoyadas en IA.',
};

/** Predefined conversation starters for client convenience. */
export const whatsappPresets = [
  {
    id: 'project',
    title: 'Nuevo proyecto o desarrollo web',
    subtitle: 'Presupuesto, plazos y requerimientos',
    badge: 'Proyecto',
    text: 'Hola Nicolás, vi tu portfolio y tengo un proyecto web en mente. Me gustaría conocer tu disponibilidad y tarifas.',
  },
  {
    id: 'ai',
    title: 'Soluciones de IA y automatización',
    subtitle: 'Flujos de trabajo, agentes e interfaces',
    badge: 'IA & Sistemas',
    text: 'Hola Nicolás, me interesa explorar soluciones de IA y automatización para optimizar mi producto.',
  },
  {
    id: 'collab',
    title: 'Colaboración o propuesta de trabajo',
    subtitle: 'Freelance, equipo o contratación',
    badge: 'Colaboración',
    text: 'Hola Nicolás, me gustaría hablar contigo sobre una oportunidad de colaboración profesional.',
  },
  {
    id: 'quick',
    title: 'Consulta rápida o saludo',
    subtitle: 'Iniciar conversación directa',
    badge: 'Directo',
    text: 'Hola Nicolás, te escribo desde tu portfolio para hacerte una consulta.',
  },
];

/** Generates the direct WhatsApp chat link with an optional prefilled greeting. */
export const getWhatsappUrl = (customMessage) => {
  const cleanNumber = (site.whatsapp || '').replace(/\D/g, '');
  const message = customMessage !== undefined ? customMessage : site.whatsappMessage;
  const text = message ? encodeURIComponent(message) : '';
  return cleanNumber ? `https://wa.me/${cleanNumber}${text ? `?text=${text}` : ''}` : 'https://wa.me/';
};

export const socials = [
  { id: 'github', label: 'GitHub', handle: `@${GITHUB_USER}`, url: `https://github.com/${GITHUB_USER}` },
  { id: 'linkedin', label: 'LinkedIn', handle: '/in/nicolas-rodrigu3z', url: 'https://www.linkedin.com/in/nicolas-rodrigu3z/' },
  { id: 'whatsapp', label: 'WhatsApp', handle: site.whatsappDisplay || '+34 665 015 804', url: getWhatsappUrl() },
  { id: 'email', label: 'Email', handle: site.email, url: `mailto:${site.email}` },
];

/**
 * Everything the masthead lists, in reading order.
 *
 * An entry with an `index` is a chapter of the home page: the rail numbers it
 * and the active-section spy watches it. An entry with an `href` is a separate
 * document — it has no numeral, which is what lets the chapter numbering stay
 * contiguous at 01–05 and gives the navbar something to mark with an outbound
 * glyph instead.
 *
 * `theme` names the background each chapter sits on, which is what the index
 * rail re-colours itself from as the reader moves through.
 */
export const navLinks = [
  { id: 'proyectos', label: 'Proyectos', index: '01', theme: 'ink' },
  { id: 'educacion', label: 'Educación', href: '/educacion/' },
  { id: 'perfil', label: 'Perfil', index: '02', theme: 'paper' },
  { id: 'herramientas', label: 'Herramientas', index: '03', theme: 'paper' },
  { id: 'ruta', label: 'Ruta', index: '04', theme: 'coral' },
  { id: 'contacto', label: 'Contacto', index: '05', theme: 'ink' },
];

/** Only what lives on the home page. The rail and the scroll spy use this. */
export const chapters = navLinks.filter((link) => link.index);

export const heroFacts = [
  site.availability,
  'Frontend · Automatización · IA',
  'Aprendiendo siempre',
];

/** Words cycled through the ticker band under the hero. */
export const tickerWords = [
  'React', 'Interfaces con criterio', 'Sistemas de diseño', 'Automatización',
  'Agentes de IA', 'Producto digital', 'Motion', 'Accesibilidad',
];
