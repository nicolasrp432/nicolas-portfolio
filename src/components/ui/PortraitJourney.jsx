import { useEffect, useRef, useState } from 'react';
import { Si42, SiPlatzi } from 'react-icons/si';
import { FiArrowUpRight, FiPenTool, FiPlay, FiCode, FiBox } from 'react-icons/fi';
import { journey } from '../../data/journey';
import { journeyMaps } from '../../data/journeyMaps';
import { StoryImage } from './SpecialtyHero';
import { useGsapScope } from '../../hooks/useGsapScope';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/gsap';

export function JourneyMap({ country, className = '' }) {
  const map = journeyMaps[country];
  return <svg className={`atlas-map ${className}`} viewBox="0 0 500 500" aria-hidden="true"><path className="atlas-map-shadow" d={map.path} /><path d={map.path} />{map.bilbao && <g><circle cx={map.bilbao[0]} cy={map.bilbao[1]} r="13" className="atlas-map-beacon" /><circle cx={map.bilbao[0]} cy={map.bilbao[1]} r="4" /><path d={`M${map.bilbao.join(',')}h60l20,-25`} className="atlas-map-leader" /></g>}</svg>;
}

function JourneySymbol({ id }) {
  const stage = { colombia: 'social', platzi: 'design', 'escuela-42': 'react', presente: 'king' }[id];
  const className = `atlas-static-symbol atlas-static-symbol--${stage}`;
  if (stage === 'king') return <img className={className} data-stage={stage} src="/img/manifesto/icons/strategy.webp" alt="" width="480" height="480" loading="lazy" />;
  return <svg className={className} data-stage={stage} viewBox="-100 -100 200 200" width="480" height="480" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3">
    {stage === 'social' && <>
      <g transform="translate(-27 -29) rotate(-9)"><rect className="atlas-symbol-tile" x="-34" y="-34" width="68" height="68" rx="14" /><g className="atlas-symbol-relief"><rect x="-21" y="-21" width="42" height="42" rx="12" /><circle r="10" /><circle cx="13" cy="-13" r="2" fill="currentColor" /></g></g>
      <g transform="translate(35 4) rotate(10)"><rect className="atlas-symbol-tile" x="-31" y="-31" width="62" height="62" rx="13" /><path className="atlas-symbol-relief" d="M-9-15 15 0-9 15Z" fill="currentColor" /></g>
      <g transform="translate(-20 46) rotate(-5)"><rect className="atlas-symbol-tile" x="-29" y="-29" width="58" height="58" rx="12" /><path className="atlas-symbol-relief" d="M3 23V-11Q3-21 18-18M-9-2H16" strokeWidth="9" /></g>
    </>}
    {stage === 'design' && <>
      <g transform="translate(-4 -17) rotate(18)"><path className="atlas-symbol-tile" d="M0-63-33-7-19 43H19L33-7Z" /><path className="atlas-symbol-relief" d="M0-63V-14" /><circle cy="-7" r="7" className="atlas-symbol-relief" /><rect x="-24" y="44" width="48" height="14" rx="3" /></g>
      <path d="M-73 50C-44 92 48-8 73 42" /><path d="M-73 50-44 92M48-8 73 42" strokeWidth="1" /><circle cx="-44" cy="92" r="4" /><circle cx="48" cy="-8" r="4" /><path d="M-78 45h10v10h-10ZM68 37h10v10H68Z" fill="currentColor" />
    </>}
    {stage === 'react' && <><ellipse rx="78" ry="31" /><ellipse rx="78" ry="31" transform="rotate(60)" /><ellipse rx="78" ry="31" transform="rotate(120)" /><circle r="12" fill="currentColor" /></>}
  </svg>;
}

function ChapterScene({ id }) {
  if (id === 'colombia') return <>
    <div className="atlas-place-word" aria-hidden="true">COLOMBIA</div>
    <div className="atlas-colombia-map" data-depth="map"><JourneyMap country="colombia" /><span>ORIGEN / CO</span></div>
    <div className="atlas-campaign" data-depth="object" aria-hidden="true"><span>UNA IDEA QUE</span><strong>se<br /><em>siente.</em></strong><div><FiPlay /> COMUNICAR / CONECTAR</div></div>
    <StoryImage className="atlas-agency-portrait" name="nicolas-agency-cutout" alt="Retrato conceptual de Nicolás con bocetos de diseño" />
    <div className="atlas-date" aria-hidden="true">2023<span>— 2025</span></div>
  </>;
  if (id === 'platzi') return <>
    <div className="atlas-type-sheet" data-depth="object" aria-hidden="true"><span>EL OJO TAMBIÉN SE ENTRENA</span><strong>Aa<span>&</span></strong><div>FORMA · COLOR · JERARQUÍA</div><FiPenTool /></div>
    <div className="atlas-swatches" data-depth="map" aria-hidden="true"><i /><i /><i /><i /><span>Encontrar mi lenguaje.</span></div>
    <StoryImage className="atlas-reader" name="nicolas-reading" alt="Retrato conceptual de Nicolás aprendiendo con un libro" />
    <SiPlatzi className="atlas-brand atlas-brand--platzi" aria-label="Platzi" />
    <svg className="atlas-bezier" viewBox="0 0 700 400" aria-hidden="true"><path d="M30 350C180 10 350 450 650 50" /><path d="M30 350L180 10M350 450L650 50" /><circle cx="30" cy="350" r="8" /><circle cx="650" cy="50" r="8" /></svg>
  </>;
  if (id === 'escuela-42') return <>
    <Si42 className="atlas-brand atlas-brand--42" aria-label="42" />
    <div className="atlas-code-stack" data-depth="object" aria-hidden="true"><div className="atlas-code-layer atlas-code-layer--back"><span>01 / ENTENDER</span><FiBox /></div><div className="atlas-code-layer"><span>02 / CONSTRUIR</span><pre>{'while (idea)\n{\n  aprender();\n  construir();\n  probar();\n}'}</pre><small>UN PROCESO, NO UNA RESPUESTA MÁGICA.</small></div></div>
    <img className="atlas-coder" src="/img/portraits/portrait-elevado-960.webp" alt="Nicolás trabajando con su portátil" width="768" height="960" loading="lazy" />
    <span className="atlas-code-location">42 URDULIZ<br /><strong>BIZKAIA</strong><small>APRENDIZAJE EN CURSO</small></span>
  </>;
  return <>
    <span className="atlas-bilbao-word" aria-hidden="true">Bilbao.</span>
    <div className="atlas-spain-map" data-depth="map"><JourneyMap country="spain" /><span>BILBAO / MI PRESENTE</span></div>
    <div className="atlas-arrival-path" aria-hidden="true"><span>CO</span><i /><FiArrowUpRight /><i /><span>BIO</span></div>
    <StoryImage className="atlas-walker" name="nicolas-walking-cutout" alt="Retrato conceptual de Nicolás caminando hacia su siguiente etapa" />
    <div className="atlas-discipline-orbit" data-depth="object" aria-hidden="true"><span><FiCode /> WEB</span><span><FiPlay /> MOTION</span><span><FiBox /> 3D</span></div>
  </>;
}

export function PortraitJourney() {
  const [paused, setPaused] = useState(false);
  const [renderer, setRenderer] = useState('poster');
  const reduced = useReducedMotion();
  const timelines = useRef([]), engine = useRef(null), host = useRef(null), position = useRef({ phase: 0 });
  const scope = useGsapScope(root => {
    timelines.current = [];
    const region = root.querySelector('.atlas-travel-region');
    const sections = [...root.querySelectorAll('.journey-chapter')];
    const links = [...root.querySelectorAll('.journey-navigation a')];
    let current = -1;
    const travel = gsap.to(position.current, {
      phase: 3, ease: 'none',
      scrollTrigger: { trigger: region, start: 'top top', endTrigger: sections[3], end: 'top top', scrub: .45, invalidateOnRefresh: true },
      onUpdate: () => {
        engine.current?.update(position.current.phase);
        const next = Math.min(3, Math.round(position.current.phase));
        if (next !== current) { current = next; links.forEach((link, i) => { if (i === next) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current'); }); }
      },
    });
    timelines.current.push(travel);
    sections.forEach(section => {
      const objects = section.querySelectorAll('[data-depth="object"]');
      const maps = section.querySelectorAll('[data-depth="map"]');
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .6 } });
      if (objects.length) timeline.fromTo(objects, { y: 35, rotate: -5 }, { y: -35, rotate: 3, ease: 'none' }, 0);
      if (maps.length) timeline.fromTo(maps, { y: -20 }, { y: 25, ease: 'none' }, 0);
      timelines.current.push(timeline);
    });
    return () => links.forEach(link => link.removeAttribute('aria-current'));
  });
  useEffect(() => {
    if (reduced) return;
    let cancelled = false, started = false;
    const start = async () => {
      if (started) return; started = true;
      try {
        const { createJourneyScene } = await import('../../lib/three/journeyScene');
        if (cancelled) return;
        engine.current = createJourneyScene(host.current, () => setRenderer('fallback'));
        engine.current.update(position.current.phase); setRenderer('ready');
      } catch { if (!cancelled) setRenderer('fallback'); }
    };
    const io = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { start(); io.disconnect(); } }, { rootMargin: '200px' });
    if (io) io.observe(host.current); else start();
    return () => { cancelled = true; io?.disconnect(); engine.current?.dispose(); engine.current = null; };
  }, [reduced]);
  useEffect(() => { if (renderer === 'fallback') { engine.current?.dispose(); engine.current = null; } }, [renderer]);
  useEffect(() => {
    timelines.current.forEach(timeline => {
      if (paused) { timeline.scrollTrigger?.disable(false, false); timeline.scrollTrigger?.getTween()?.pause(); }
      else timeline.scrollTrigger?.enable(false, false);
    });
  }, [paused, reduced]);
  return <div className="journey-experience" ref={scope} data-still={paused || reduced} data-reduced={reduced} data-renderer={renderer}>
    <nav className="journey-navigation" aria-label="Etapas de mi recorrido">
      <span>ATLAS PERSONAL / 04 ETAPAS</span><div>{journey.map((chapter, i) => <a href={`#${chapter.id}`} key={chapter.id}><small>0{i + 1}</small> {chapter.label}</a>)}</div>
      <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused || reduced} disabled={reduced}>{paused || reduced ? 'Efectos pausados' : 'Pausar efectos'}</button>
    </nav>
    <div className="atlas-travel-region">
      <div className="atlas-traveller" aria-hidden="true"><div ref={host} className="atlas-traveller-canvas" /></div>
      {journey.map((chapter, i) => <section className={`journey-chapter journey-chapter--${chapter.id}`} id={chapter.id} key={chapter.id} aria-labelledby={`title-${chapter.id}`}>
        <div className="atlas-art"><ChapterScene id={chapter.id} /><JourneySymbol id={chapter.id} /></div>
        <div className="journey-chapter-copy"><p className="eyebrow">0{i + 1} / {chapter.chapter}</p><h2 id={`title-${chapter.id}`}>{chapter.title}</h2><p>{chapter.text}</p><a className="arrow-link" href={chapter.href}>{chapter.link}</a></div>
        <span className="atlas-chapter-foot" aria-hidden="true">{chapter.turn}</span>
      </section>)}
    </div>
  </div>;
}
