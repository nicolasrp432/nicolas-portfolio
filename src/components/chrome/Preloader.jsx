import { useRef, useState } from 'react';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useScrollLock } from '../../hooks/useScrollLock';
import { BrandMark } from '../ui/BrandMark';

const SLATS = 5;

/**
 * The opening curtain: a counter runs to 100 while an ink panel holds the
 * page, then five slats wipe upward to hand over to the hero.
 *
 * Deliberately short (~1.7s) and never shown twice in a session — a portfolio
 * visitor returning from a project link should land straight on the content.
 * With reduced motion it does not render at all.
 */
export function Preloader({ onDone }) {
  const root = useRef(null);
  const [count, setCount] = useState(0);

  useScrollLock(true);

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const counter = { value: 0 };

        const tl = gsap.timeline({ onComplete: onDone });

        tl.to(counter, {
          value: 100,
          duration: 1.1,
          ease: 'power2.inOut',
          onUpdate: () => setCount(Math.round(counter.value)),
        })
          .to('.preloader-line', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
          .fromTo('.preloader-mark', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
          .to('.preloader-meta', { opacity: 0, y: -14, duration: 0.35, ease: 'power2.in' })
          .to(
            '.preloader-slat',
            { scaleY: 0, duration: 0.7, ease: 'expo.inOut', stagger: 0.07, transformOrigin: 'top center' },
            '-=0.1',
          );

        return () => tl.kill();
      });

      // Reduced motion: never mounted, but guard the callback anyway.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        onDone();
      });
    }, root);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div className="preloader" ref={root} role="status" aria-live="polite">
      <span className="visually-hidden">Cargando el portfolio</span>
      {Array.from({ length: SLATS }, (_, i) => (
        <span className="preloader-slat" key={i} style={{ '--slat': i }} aria-hidden="true" />
      ))}
      <div className="preloader-meta" aria-hidden="true">
        <div className="preloader-mark">
          <BrandMark />
        </div>
        <div className="preloader-track">
          <span className="preloader-line" />
        </div>
        <span className="preloader-count">{String(count).padStart(3, '0')}</span>
      </div>
    </div>
  );
}
