import { createElement, useRef } from 'react';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * Scroll-triggered entrance for a block of content.
 *
 * Two variants, each with a matching pre-hidden state in `components.css`:
 *  - `rise` — the default lift-and-fade for prose.
 *  - `wipe` — a clip-path sweep, for images and colour slabs.
 *
 * A variant must never be added here without adding its pre-state to CSS: the
 * element is only hidden while `<html data-motion="on">`, so with reduced
 * motion or without JS the content is simply present.
 */
export function Reveal({
  children,
  as = 'div',
  variant = 'rise',
  delay = 0,
  start = 'top 85%',
  className = '',
  ...rest
}) {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const [from, to] =
          variant === 'wipe'
            ? [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1 }]
            : [{ y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }];

        gsap.fromTo(element, from, {
          ...to,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: element, start, once: true },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [variant, delay, start]);

  return createElement(
    as,
    { ref, className: `reveal reveal-${variant} ${className}`.trim(), ...rest },
    children,
  );
}
