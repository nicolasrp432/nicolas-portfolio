import { Navbar } from './components/chrome/Navbar';
import { Footer } from './components/chrome/Footer';
import { GrainOverlay } from './components/chrome/GrainOverlay';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { StoryImage } from './components/ui/SpecialtyHero';
import { SpecialtyNav } from './components/ui/SpecialtyNav';
import { PortraitJourney } from './components/ui/PortraitJourney';
import { useGsapScope } from './hooks/useGsapScope';
import { gsap } from './lib/gsap';
import { site, getWhatsappUrl } from './data/site';

export default function HistoryPage() {
  const scope=useGsapScope(root=>{
    gsap.to(root.querySelector('.history-opening-portrait'), { yPercent: 12, ease:'none', scrollTrigger:{trigger:root.querySelector('.history-opening'),start:'top top',end:'bottom top',scrub:.7} });
  });
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><GrainOverlay /><div className="shell"><Navbar currentPage="historia" /><main id="contenido" className="history-page" ref={scope}>
    <header className="history-opening" id="historia"><div className="history-opening-copy"><a className="eyebrow" href="/">← Volver al portfolio completo</a><p className="eyebrow">Nicolás Rodríguez / Un retrato en cuatro movimientos</p><h1>Mi siguiente<br /><em>jugada.</em></h1><p>No separo lo que pienso de lo que construyo. El código, las imágenes y el movimiento son mis formas de darle cuerpo a una idea.</p><a className="button-slab" href="#mirar">Conoce mi manera de crear ↓</a></div><div className="history-opening-portrait"><span aria-hidden="true">N.</span><StoryImage name="nicolas-chess" alt="Nicolás Rodríguez sosteniendo un rey de ajedrez de vidrio" priority /></div><span className="history-opening-foot">Curiosidad como punto de partida. Intención como dirección.</span></header>
    <PortraitJourney />
    <section className="history-closing section"><p className="eyebrow">La intención permanece</p><h2>No me interesa solo hacer cosas que funcionen,<br /><em>sino dejar huella en este mundo.</em></h2><p>La siguiente historia podemos construirla juntos.</p><a className="button-slab" href={getWhatsappUrl()} target="_blank" rel="noreferrer">Hablemos de tu idea ↗</a><SpecialtyNav /><a className="arrow-link" href={`mailto:${site.email}`}>{site.email}</a></section>
  </main><Footer homeHref="/" topHref="#historia" /><WhatsAppButton /></div></>;
}
