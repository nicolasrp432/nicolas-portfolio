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
  location: 'España — remoto',
  availability: 'Disponible para colaborar',
  url: 'https://nicolasrp432.github.io/nicolas-portfolio/',
  description:
    'Portfolio de Nicolás Rodríguez, desarrollador frontend y constructor de producto digital. React, interfaces con criterio y soluciones apoyadas en IA.',
};

export const socials = [
  { id: 'github', label: 'GitHub', handle: `@${GITHUB_USER}`, url: `https://github.com/${GITHUB_USER}` },
  { id: 'linkedin', label: 'LinkedIn', handle: '/in/nicolas-rodrigu3z', url: 'https://www.linkedin.com/in/nicolas-rodrigu3z/' },
  { id: 'email', label: 'Email', handle: site.email, url: `mailto:${site.email}` },
];

/**
 * The five chapters. `theme` names the background each section sits on, which
 * is what the index rail re-colours itself from as the reader moves through.
 */
export const navLinks = [
  { id: 'proyectos', label: 'Proyectos', index: '01', theme: 'ink' },
  { id: 'perfil', label: 'Perfil', index: '02', theme: 'paper' },
  { id: 'herramientas', label: 'Herramientas', index: '03', theme: 'paper' },
  { id: 'ruta', label: 'Ruta', index: '04', theme: 'coral' },
  { id: 'contacto', label: 'Contacto', index: '05', theme: 'ink' },
];

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
