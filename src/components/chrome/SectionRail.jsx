import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, MOTION_OK_DESKTOP } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * The fixed left-hand index rail — the page's signature element.
 *
 * It does three jobs at once: a coral bar reports overall reading progress,
 * the numeral shows which of the five chapters you are in, and the rotated
 * label names it. It replaces a conventional "active link" underline in the
 * navbar with something that reads like a print index running down the margin.
 *
 * Desktop and motion-enabled only; the mobile layout has no margin to spare and
 * the navbar already carries the same information.
 */
/** The hero has no nav entry of its own, so the rail opens on chapter zero. */
const HOME_OPENING = { id: 'inicio', index: '00', label: 'Inicio', theme: 'paper' };

export function SectionRail({ sections, opening = HOME_OPENING }) {
  const root = useRef(null);
  const [active, setActive] = useState(opening);

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK_DESKTOP, () => {
        gsap.to(element.querySelector('.rail-progress'), {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
        });

        // One trigger per chapter, each claiming the rail as it takes over the
        // upper half of the viewport in either scroll direction.
        const triggers = [opening, ...sections].map((section) => {
          const target = document.getElementById(section.id);
          if (!target) return null;
          return ScrollTrigger.create({
            trigger: target,
            start: 'top 45%',
            end: 'bottom 45%',
            onToggle: (self) => self.isActive && setActive(section),
          });
        });

        gsap.fromTo(element, { opacity: 0, x: -12 }, { opacity: 1, x: 0, delay: 0.2 });

        return () => triggers.forEach((trigger) => trigger?.kill());
      });
    }, root);

    return () => ctx.revert();
  }, [sections, opening]);

  return (
    <aside className="section-rail" ref={root} data-theme={active.theme} aria-hidden="true">
      <div className="rail-track">
        <span className="rail-progress" />
      </div>
      <div className="rail-readout">
        <span className="rail-index">{active.index}</span>
        <span className="rail-label">{active.label}</span>
      </div>
      <span className="rail-foot">NR</span>
    </aside>
  );
}
