import { createElement, useRef } from 'react';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * Scrubbed vertical parallax. `speed` is expressed as a percentage of the
 * element's own height, so the same value reads consistently whether it wraps
 * a portrait or a small badge.
 *
 * Positive values trail the scroll (drift down), negative values lead it.
 */
export function Parallax({ children, speed = 12, as = 'div', className = '', ...rest }) {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          element,
          { yPercent: -speed / 2 },
          {
            yPercent: speed / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return createElement(as, { ref, className, ...rest }, children);
}
