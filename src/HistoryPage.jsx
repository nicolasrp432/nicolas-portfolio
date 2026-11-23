import { Navbar } from './components/chrome/Navbar';
import { Footer } from './components/chrome/Footer';
import { GrainOverlay } from './components/chrome/GrainOverlay';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { StoryImage } from './components/ui/SpecialtyHero';
import { SpecialtyNav } from './components/ui/SpecialtyNav';
import { PortraitJourney } from './components/ui/PortraitJourney';
import { useGsapScope } from './hooks/useGsapScope';
import { useInitialAnchor } from './hooks/useInitialAnchor';
import { gsap } from './lib/gsap';
import { site, getWhatsappUrl } from './data/site';

export default function HistoryPage() {
  useInitialAnchor();
  const scope = useGsapScope(root => {
    gsap.fromTo(root.querySelector('.journey-opening-image'), { scale: 1.04 }, { scale: 1.18, yPercent: 8, ease: 'none', scrollTrigger: { trigger: root.querySelector('.journey-opening'), start: 'top top', end: 'bottom top', scrub: .7 } });
  });
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><GrainOverlay /><div className="shell"><Navbar currentPage="historia" /><main id="contenido" className="history-page history-page--cinematic" ref={scope}>
    <header className="journey-opening" id="historia">
      <div className="journey-opening-image"><StoryImage name="nicolas-passage" alt="Recreación conceptual de Nicolás atravesando una galería de puertas" priority /></div>
      <div className="journey-opening-copy"><a className="eyebrow" href="/">← Volver al portfolio completo</a><p className="eyebrow">Nicolás Rodríguez / Una historia que sigue</p><h1>Vengo de<br />las ideas.<br /><em>Construyo<br />lo que sigue.</em></h1><p>De Colombia a Bilbao. Del marketing al diseño y la programación. Este es el recorrido detrás de lo que ves.</p><a className="button-slab" href="#colombia">Recorre mi historia ↓</a></div>
      <div className="journey-opening-bottom"><span>COLOMBIA → PLATZI → 42 URDULIZ → BILBAO</span><span>Cuatro capítulos. Una misma curiosidad.</span></div>
    </header>
    <PortraitJourney />
    <section className="journey-synthesis section"><p className="eyebrow">Lo que conecta todo</p><h2>Aprendí a comunicar.<br /><em>A darle forma.</em><br />A hacerlo funcionar.</h2><p>Por eso hoy conviven en mi trabajo el desarrollo, el motion y el 3D. Cada disciplina aporta una parte de mi recorrido.</p><SpecialtyNav /><small>Las escenas de este relato son recreaciones visuales generadas para acompañar mi historia.</small></section>
    <section className="history-closing section"><p className="eyebrow">La intención permanece</p><h2>No me interesa solo hacer cosas que funcionen,<br /><em>sino dejar huella en este mundo.</em></h2><p>La siguiente historia podemos construirla juntos.</p><a className="button-slab" href={getWhatsappUrl()} target="_blank" rel="noreferrer">Hablemos de tu idea ↗</a><a className="arrow-link" href={`mailto:${site.email}`}>{site.email}</a></section>
  </main><Footer homeHref="/" topHref="#historia" /><WhatsAppButton /></div></>;
}
