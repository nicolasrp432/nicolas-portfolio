import { specialties } from '../../data/specialties';
import { HoverExpandGallery } from '../ui/hover-expand-gallery';
const covers = {
 web:{cover:'/img/stories/nicolas-workspace-1440.webp',alt:'Nicolás trabajando en su estudio',headline:'Ideas que se pueden usar.'},
 motion:{cover:'/img/stories/nicolas-motion-1440.webp',alt:'Retrato de Nicolás con una cinta de luz coral',headline:'Imágenes que se sienten.'},
 '3d':{cover:'/img/stories/chess-world-1440.webp',alt:'Escenario conceptual de ajedrez y vidrio',headline:'Otra forma de mirar.'},
};
export function SpecialtyOverview() {
 return <section className="section specialty-overview specialty-overview--closing" id="especialidades">
  <header className="specialty-section-head"><p className="eyebrow">Una idea es el principio</p><h2>Elige por dónde<br /><em>entrar a mi universo.</em></h2><p>Tres recorridos para explorar mi trabajo. Cada uno tiene su propio lenguaje; todos comparten la misma curiosidad.</p></header>
  <HoverExpandGallery items={specialties.map(s=>({...s,...covers[s.id]}))} />
  <a className="story-door" href="/historia/"><img src="/img/stories/nicolas-chess-768.webp" width="180" height="225" alt="Nicolás con un rey de ajedrez" loading="lazy" /><span><small>Detrás de las ideas</small><strong>Mi siguiente jugada.</strong><span>Entra en mi historia visual ↗</span></span></a>
 </section>;
}
