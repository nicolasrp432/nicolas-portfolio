import { FiSearch, FiLayout, FiCheck, FiMusic, FiFilm, FiPlay, FiBox, FiSun, FiMove } from 'react-icons/fi';
import { useGsapScope } from '../../hooks/useGsapScope';
import { gsap } from '../../lib/gsap';

const symbols = { web: [FiSearch, FiLayout, FiCheck], motion: [FiMusic, FiPlay, FiFilm], '3d': [FiBox, FiSun, FiMove] };

/** Scroll-path concept adapted from 21st Tracing Beam (Manu Arora), using the
 * project's GSAP runtime. Content remains readable without the animated path. */
export function ProcessTrail({ steps, variant }) {
  const scope = useGsapScope(root => {
    gsap.fromTo(root.querySelector('.process-trail-light'), { scaleY: 0 }, {
      scaleY: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 65%', end: 'bottom 65%', scrub: true },
    });
  });
  return <div className="process-trail-wrapper" ref={scope}>
    <span className="process-trail-track" aria-hidden="true"><span className="process-trail-light" /></span>
    <ol className={`process-trail process-trail--${variant}`} >{steps.map(([title, text], index) => {
      const Icon = symbols[variant][index];
      return <li key={title}><span className="process-trail-symbol" aria-hidden="true"><Icon /></span><div><span className="eyebrow">0{index + 1} / {['El punto de partida', 'La construcción', 'La entrega'][index]}</span><h3>{title}</h3><p>{text}</p></div></li>;
    })}
  </ol></div>;
}
