import { useRef } from 'react';
import { gsap, ScrollTrigger, MOTION_OK } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * A seamless ticker band that reacts to the reader's scrolling.
 *
 * The track holds the item list twice and loops across exactly half its width,
 * so the seam never lands on screen. Scroll velocity feeds the timeline's
 * `timeScale`: flick the page and the band accelerates and skews; scroll
 * upwards and it reverses. That coupling is the point — it turns a decorative
 * strip into a readout of what the visitor is doing.
 */
export function Marquee({ items, speed = 26, className = '' }) {
  const root = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const track = element.querySelector('.marquee-track');
        const loop = gsap.to(track, {
          xPercent: -50,
          duration: speed,
          ease: 'none',
          repeat: -1,
        });

        const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' });
        // Debounced return to rest: rescheduled on every scroll tick, so it
        // only fires once the reader has actually stopped.
        const settle = gsap.delayedCall(0.4, () => skewTo(0)).pause();
        let direction = 1;

        const trigger = ScrollTrigger.create({
          onUpdate: (self) => {
            // Flip travel direction so the band always "follows" the scroll.
            if (self.direction !== direction) {
              direction = self.direction;
              gsap.to(loop, { timeScale: direction, duration: 0.4, overwrite: true });
            }
            skewTo(-gsap.utils.clamp(-12, 12, self.getVelocity() / 260));
            settle.restart(true);
          },
        });

        return () => {
          trigger.kill();
          settle.kill();
        };
      });
    }, root);

    return () => ctx.revert();
  }, [speed]);

  // Duplicated for the seam; the copy is hidden from assistive tech.
  const renderGroup = (copy) => (
    <ul className="marquee-group" aria-hidden={copy > 0 ? 'true' : undefined}>
      {items.map((item, i) => (
        <li key={`${copy}-${item}-${i}`}>
          <span>{item}</span>
          <i className="marquee-dot" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee ${className}`.trim()} ref={root}>
      <div className="marquee-track">
        {renderGroup(0)}
        {renderGroup(1)}
      </div>
    </div>
  );
}
