import { useEffect, useRef, useState } from 'react';
import { journey } from '../../data/journey';
import { StoryImage } from './SpecialtyHero';
import { useGsapScope } from '../../hooks/useGsapScope';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/gsap';

function ChapterScene({ id }) {
  if (id === 'colombia') return <div className="journey-image-world" data-depth="back"><StoryImage name="nicolas-agency" alt="Recreación conceptual de Nicolás en un estudio creativo" /><div className="journey-glass-frame" data-depth="front" /></div>;
  if (id === 'platzi') return <div className="journey-design-world" aria-hidden="true">
    <div className="journey-design-grid" />
    <div className="journey-type-object" data-depth="back">Aa<span>FORMA / CONTRASTE / INTENCIÓN</span></div>
    <div className="journey-color-object" data-depth="front"><i /><i /><i /><i /><span>Una mirada propia.</span></div>
    <div className="journey-design-portrait" data-depth="portrait"><StoryImage name="nicolas-reading" /></div>
  </div>;
  if (id === 'escuela-42') return <div className="journey-code-world">
    <span className="journey-school-number" aria-hidden="true">42</span>
    <div className="journey-code-plane" data-depth="back" aria-hidden="true"><span>C / PENSAR · PROBAR · ENTENDER</span><pre>{'size_t ft_strlen(const char *s)\n{\n    size_t i = 0;\n\n    while (s[i])\n        i++;\n    return (i);\n}'}</pre><small>Una función. Un problema que puedes entender.</small></div>
    <img className="journey-coder" data-depth="portrait" src="/img/portraits/portrait-elevado-960.webp" alt="Nicolás trabajando con su portátil" width="768" height="960" loading="lazy" />
    <div className="journey-code-token" data-depth="front" aria-hidden="true">{'{ construir(); }'}</div>
  </div>;
  return <div className="journey-image-world journey-image-world--today" data-depth="back"><StoryImage name="nicolas-workspace" alt="Retrato conceptual de Nicolás trabajando en su estudio" /><div className="journey-location" aria-hidden="true"><span>DE COLOMBIA A</span><strong>Bilbao.</strong><span>42 URDULIZ BIZKAIA · SIGO APRENDIENDO</span></div><div className="journey-today-ring" data-depth="front" aria-hidden="true" /></div>;
}

export function PortraitJourney() {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timelines = useRef([]);
  const scope = useGsapScope(root => {
    timelines.current = [];
    root.querySelectorAll('.journey-chapter').forEach(section => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .65 } });
      timeline.fromTo(section.querySelector('[data-depth="back"]'), { yPercent: -5, scale: 1.08 }, { yPercent: 5, scale: 1, ease: 'none' }, 0);
      timelines.current.push(timeline);
      const front = section.querySelector('[data-depth="front"]');
      if (front) timeline.fromTo(front, { y: 55, rotateY: -14, rotateZ: -6 }, { y: -65, rotateY: 14, rotateZ: 4, ease: 'none' }, 0);
      const portrait = section.querySelector('[data-depth="portrait"]');
      if (portrait) timeline.fromTo(portrait, { yPercent: 7 }, { yPercent: -4, ease: 'none' }, 0);
    });
  });
  useEffect(() => {
    timelines.current.forEach(timeline => {
      if (paused) {
        timeline.scrollTrigger?.disable(false, false);
        timeline.scrollTrigger?.getTween()?.pause();
      } else {
        timeline.scrollTrigger?.enable(false, false);
      }
    });
  }, [paused]);
  return <div className="journey-experience" ref={scope} data-still={paused || reduced} data-reduced={reduced}>
    <nav className="journey-navigation" aria-label="Etapas de mi recorrido">
      <span>MI RECORRIDO</span><div>{journey.map((chapter, i) => <a href={`#${chapter.id}`} key={chapter.id}><small>0{i + 1}</small> {chapter.label}</a>)}</div>
      <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused || reduced} disabled={reduced}>{paused || reduced ? 'Efectos pausados' : 'Pausar efectos'}</button>
    </nav>
    {journey.map((chapter, i) => <section className={`journey-chapter journey-chapter--${chapter.id}`} id={chapter.id} key={chapter.id} aria-labelledby={`title-${chapter.id}`}>
      <div className="journey-chapter-stage">
        <div className="journey-scenery"><ChapterScene id={chapter.id} /></div>
        <div className="journey-chapter-copy"><p className="eyebrow">0{i + 1} / {chapter.label} · {chapter.chapter}</p><h2 id={`title-${chapter.id}`}>{chapter.title}</h2><p>{chapter.text}</p><p className="journey-turn">{chapter.turn}</p><a className="arrow-link" href={chapter.href}>{chapter.link}</a></div>
        <span className="journey-scene-index" aria-hidden="true">0{i + 1}<span>/ 04</span></span>
      </div>
    </section>)}
  </div>;
}
