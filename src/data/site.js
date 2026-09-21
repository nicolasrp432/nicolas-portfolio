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
  // WhatsApp de contacto: reemplazar por tu número real con prefijo internacional
  // (ej. para España: 34 seguido de 9 dígitos, sin signos + ni espacios).
  whatsapp: '34600000000',
  whatsappDisplay: 'Chat directo',
  whatsappMessage: 'Hola Nicolás, vi tu portfolio y me gustaría hablar sobre un proyecto.',
  location: 'España — remoto',
  availability: 'Disponible para colaborar',
  url: 'https://nicolas-portfolio-eight.vercel.app/',
  description:
    'Portfolio de Nicolás Rodríguez, desarrollador frontend y constructor de producto digital. React, interfaces con criterio y soluciones apoyadas en IA.',
};

/** Generates the direct WhatsApp chat link with an optional prefilled greeting. */
export const getWhatsappUrl = () => {
  const cleanNumber = (site.whatsapp || '').replace(/\D/g, '');
  const text = site.whatsappMessage ? encodeURIComponent(site.whatsappMessage) : '';
  return cleanNumber ? `https://wa.me/${cleanNumber}${text ? `?text=${text}` : ''}` : 'https://wa.me/';
};

export const socials = [
  { id: 'github', label: 'GitHub', handle: `@${GITHUB_USER}`, url: `https://github.com/${GITHUB_USER}` },
  { id: 'linkedin', label: 'LinkedIn', handle: '/in/nicolas-rodrigu3z', url: 'https://www.linkedin.com/in/nicolas-rodrigu3z/' },
  { id: 'whatsapp', label: 'WhatsApp', handle: site.whatsappDisplay || 'Chat directo', url: getWhatsappUrl() },
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
