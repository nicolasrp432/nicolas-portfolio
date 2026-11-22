import { FiArrowDownRight } from 'react-icons/fi';
import { SpecialtyNav } from './SpecialtyNav';
import { useGsapScope } from '../../hooks/useGsapScope';
import { gsap } from '../../lib/gsap';

export function StoryImage({ name, alt = '', className = '', priority = false }) {
  return <img className={className} src={`/img/stories/${name}-768.webp`} srcSet={`/img/stories/${name}-768.webp 768w, /img/stories/${name}-1440.webp 1440w`} sizes="(max-width: 600px) 100vw, 70vw" width={['nicolas-chess','nicolas-reading'].includes(name) ? 1122 : 1536} height={['nicolas-chess','nicolas-reading'].includes(name) ? 1402 : 1024} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} />;
}

export function SpecialtyHero({ specialty: s }) {
  const scope = useGsapScope(root => {
    gsap.to(root.querySelectorAll('[data-drift]'), { yPercent: 14, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: .6 } });
  });
  return <header id="especialidad" className={`story-hero story-hero--${s.id}`} ref={scope}>
    <div className="story-hero-navigation"><a href="/">← Portfolio completo</a><SpecialtyNav current={s.id} /></div>
    {s.id === 'motion' && <div className="story-hero-scene" data-drift><StoryImage name="nicolas-motion" alt="Retrato creativo de Nicolás entre cintas de luz coral" priority /></div>}
    {s.id === '3d' && <div className="story-hero-scene" data-drift><StoryImage name="chess-world" priority /></div>}
    <div className="story-hero-content">
      <p className="eyebrow">{s.number} / {s.label} · Nicolás Rodríguez</p>
      <h1>{s.id === 'web' ? <>Lo imaginas.<br /><em>Lo construimos.</em></> : s.id === 'motion' ? <>No solo<br />se ve.<br /><em>Se siente.</em></> : <>Sal del plano.<br /><em>Entra en<br />la idea.</em></>}</h1>
      <p className="story-hero-lead">{s.description}</p>
      <a className="button-slab" href="#experiencia">{s.id === 'web' ? 'Entrar al taller' : s.id === 'motion' ? 'Seguir el movimiento' : 'Explorar la dimensión'} <FiArrowDownRight aria-hidden="true" /></a>
    </div>
    {s.id === 'web' && <div className="web-hero-collage" data-drift aria-hidden="true"><span className="web-blueprint">IDEA → INTERFAZ → EXPERIENCIA</span><div className="web-wireframe"><i /><i /><i /><span /><span /></div><img src="/img/portraits/portrait-elevado-960.webp" alt="" width="768" height="960" /><span className="web-note">Diseñar el recorrido.<br />Cuidar cada detalle.</span></div>}
    {s.id === '3d' && <div className="dimension-author"><StoryImage name="nicolas-chess" alt="Nicolás con un rey de ajedrez de vidrio" priority /><span>Mi siguiente jugada:<br /><strong>dar profundidad a una idea.</strong></span></div>}
    <span className="story-hero-foot">{s.id === 'web' ? '01 / Un problema real. Una respuesta que puedes usar.' : s.id === 'motion' ? 'Dirección visual · Ritmo · Código · After Effects' : 'Perspectiva · Material · Interacción'}</span>
  </header>;
}
