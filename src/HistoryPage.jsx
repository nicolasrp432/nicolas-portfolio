import { Navbar } from './components/chrome/Navbar';
import { Footer } from './components/chrome/Footer';
import { GrainOverlay } from './components/chrome/GrainOverlay';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { StoryImage } from './components/ui/SpecialtyHero';
import { SpecialtyNav } from './components/ui/SpecialtyNav';
import { PortraitJourney, JourneyMap } from './components/ui/PortraitJourney';
import { useInitialAnchor } from './hooks/useInitialAnchor';
import { site, getWhatsappUrl } from './data/site';

export default function HistoryPage() {
  useInitialAnchor();
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><GrainOverlay /><div className="shell"><Navbar currentPage="historia" /><main id="contenido" className="history-page history-page--cinematic">
    <header className="journey-opening" id="historia">
      <div className="journey-opening-top"><a href="/" aria-label="← Volver al portfolio completo">← Portfolio completo</a><span>NICOLÁS RODRÍGUEZ / ATLAS PERSONAL</span></div>
      <h1>Ninguna jugada<br /><em>empieza de cero.</em></h1>
      <div className="journey-cover-map journey-cover-map--co"><JourneyMap country="colombia" /><span>CO / EL ORIGEN</span></div>
      <div className="journey-cover-map journey-cover-map--es"><JourneyMap country="spain" /><span>BIO / EL PRESENTE</span></div>
      <StoryImage className="journey-cover-portrait" name="nicolas-walking-cutout" alt="Retrato conceptual de Nicolás, protagonista de este recorrido" priority />
      <div className="journey-opening-note"><p>Colombia me dio un punto de partida.<br />El diseño, una mirada.<br />El código, otra dimensión.</p><a className="arrow-link" href="#colombia">Esta es mi historia ↓</a></div>
      <span className="journey-cover-coordinate" aria-hidden="true">Una historia<br />que sigue.</span>
    </header>
    <PortraitJourney />
    <section className="journey-synthesis section"><p className="eyebrow">Mi siguiente movimiento</p><h2>Todo lo aprendido.<br /><em>En lo que viene.</em></h2><SpecialtyNav /><small>Las escenas de este relato son recreaciones visuales generadas para acompañar mi historia.</small></section>
    <section className="history-closing section"><p className="eyebrow">La intención permanece</p><h2>No me interesa solo hacer cosas que funcionen,<br /><em>sino dejar huella en este mundo.</em></h2><p>La siguiente historia podemos construirla juntos.</p><a className="button-slab" href={getWhatsappUrl()} target="_blank" rel="noreferrer">Hablemos de tu idea ↗</a><a className="arrow-link" href={`mailto:${site.email}`}>{site.email}</a></section>
  </main><Footer homeHref="/" topHref="#historia" /><WhatsAppButton /></div></>;
}
