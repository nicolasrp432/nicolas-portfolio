import { specialties } from './data/specialties';
import { curatedProjects, toProjectCard } from './data/projects';
import { getWhatsappUrl, site } from './data/site';
import { useInitialAnchor } from './hooks/useInitialAnchor';
import { Navbar } from './components/chrome/Navbar';
import { Footer } from './components/chrome/Footer';
import { GrainOverlay } from './components/chrome/GrainOverlay';
import { GlassPanel } from './components/ui/GlassPanel';
import { SpecialtyHero, StoryImage } from './components/ui/SpecialtyHero';
import { WebWorkshop } from './components/ui/WebWorkshop';
import { DimensionLab } from './components/ui/DimensionLab';
import { WorkCase } from './components/ui/WorkCase';
import { MotionStory } from './components/ui/MotionStory';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { FiArrowUpRight } from 'react-icons/fi';

/** Shared structure, individual narrative, proof and contact for each service. */
export default function SpecialtyPage({ specialty }) {
  useInitialAnchor();
  const s = specialty;
  const projects = s.projects.map(slug => {
    const index = curatedProjects.findIndex(project => project.slug === slug);
    return { ...toProjectCard(curatedProjects[index], index), slug };
  });
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <GrainOverlay />
    <div className="shell">
      <Navbar currentPage={s.id} />
      <main id="contenido" className={`specialty-page specialty-page--${s.id}`}>
        <SpecialtyHero specialty={s} />
        {s.id === 'web' && <WebWorkshop />}
        {s.id === '3d' && <DimensionLab />}
        {s.id === 'motion' && <section className="motion-director-note section" id="experiencia"><p className="eyebrow">El movimiento es una decisión</p><h2>Una pausa.<br /><em>Y cambia todo.</em></h2><p>Trabajo el ritmo como una conversación: cuándo atraer la mirada, cuándo dejar respirar y qué imagen debe quedarse contigo.</p><a className="arrow-link" href="#trabajos">Mira cómo una idea se transforma ↓</a></section>}

        <section className="section specialty-work" id="trabajos">
          <header className="specialty-section-head"><p className="eyebrow">Del concepto a la experiencia</p><h2>{s.workTitle}</h2><p>{s.workIntro}</p></header>
          {s.id === 'motion' ? <MotionStory /> : <div className="work-cases">{projects.map((project, index) => <WorkCase project={project} index={index} key={project.id} />)}</div>}
        </section>

        <aside className={`specialty-author specialty-author--${s.id}`}>
          <div className="specialty-author-portrait"><StoryImage name={s.id === 'web' ? 'nicolas-reading' : 'nicolas-chess'} alt={s.id === 'web' ? 'Nicolás Rodríguez con un libro' : 'Nicolás Rodríguez con una pieza de ajedrez de vidrio'} /></div>
          <div><p className="eyebrow">Detrás de cada decisión / Nicolás</p><h2>{s.id === 'web' ? 'Pienso el recorrido. Construyo cada paso.' : s.id === 'motion' ? 'No muevo cosas. Busco una intención.' : 'La siguiente jugada empieza con curiosidad.'}</h2><p>{s.supports} El ajedrez, la lectura y la exploración visual forman parte de mi manera de encontrar respuestas.</p><a className="arrow-link" href="/historia/">Entra en mi historia ↗</a></div>
        </aside>
        <section className="section specialty-offer" aria-labelledby="offer-title">
          <header className="specialty-section-head"><p className="eyebrow">Ahora, tu idea</p><h2 id="offer-title">Qué podemos crear.</h2></header>
          <div className="specialty-offer-grid">{s.offers.map(([title, text], index) => <GlassPanel as="article" key={title}><span className="eyebrow">0{index + 1}</span><h3>{title}</h3><p>{text}</p></GlassPanel>)}</div>
          <div className="specialty-support"><p>{s.supports}</p><ul className="tag-row" aria-label="Herramientas de esta especialidad">{s.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>
        </section>

        <section className="section specialty-process" aria-labelledby="process-title">
          <header className="specialty-section-head"><p className="eyebrow">Un recorrido compartido</p><h2 id="process-title">Del primer mensaje<br /><em>a la entrega.</em></h2><p>Definimos alcance, tiempos, presupuesto y revisiones antes de empezar. Durante el proceso, comparto avances para tomar decisiones contigo.</p></header>
          <ol>{s.process.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </section>

        <section className="section specialty-faq" aria-labelledby="faq-title"><h2 id="faq-title">Antes de empezar.</h2><div>{s.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

        <section className="section specialty-contact on-ink ink-surface" id="conversemos">
          <p className="eyebrow">La siguiente historia puede ser la tuya</p><h2>{s.contact}</h2>
          <p>Cuéntame el objetivo, en qué punto estás y qué tienes en mente. Empezamos por una conversación.</p>
          <a className="button-slab" href={getWhatsappUrl(s.message)} target="_blank" rel="noreferrer">Hablemos por WhatsApp <FiArrowUpRight aria-hidden="true" /></a>
          <a className="specialty-email" href={`mailto:${site.email}`}>{site.email}</a>
        </section>
        <section className="section specialty-next" aria-label="Otras especialidades"><p className="eyebrow">La historia continúa</p>{specialties.filter(other => other.id !== s.id).map(other => <a key={other.id} href={other.path}><span>{other.number} / {other.verb}</span><strong>{other.label}</strong><FiArrowUpRight aria-hidden="true" /></a>)}</section>
      </main>
      <Footer homeHref="/" topHref="#especialidad" />
      <WhatsAppButton />
    </div>
  </>;
}
