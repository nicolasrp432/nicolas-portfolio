import { cloneElement, useRef } from 'react';
import { gsap, MOTION_OK_DESKTOP } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * Gives a single interactive child a magnetic pull toward the pointer.
 *
 * Only registered for fine pointers with motion enabled, so touch and
 * keyboard users get an ordinary, fully functional control — the effect is
 * pure garnish on top of a button that already works.
 *
 * @param {object} props
 * @param {import('react').ReactElement} props.children  One focusable element.
 * @param {number} [props.strength=0.35]  Fraction of the cursor offset followed.
 */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK_DESKTOP, () => {
        const moveX = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' });
        const moveY = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' });

        const onMove = (event) => {
          const box = element.getBoundingClientRect();
          moveX((event.clientX - (box.left + box.width / 2)) * strength);
          moveY((event.clientY - (box.top + box.height / 2)) * strength);
        };

        const onLeave = () => {
          moveX(0);
          moveY(0);
        };

        element.addEventListener('pointermove', onMove);
        element.addEventListener('pointerleave', onLeave);
        // A keyboard visitor tabbing away must not leave it stuck off-centre.
        element.addEventListener('blur', onLeave);

        return () => {
          element.removeEventListener('pointermove', onMove);
          element.removeEventListener('pointerleave', onLeave);
          element.removeEventListener('blur', onLeave);
          gsap.set(element, { x: 0, y: 0 });
        };
      });
    }, ref);

    return () => ctx.revert();
  }, [strength]);

  return cloneElement(children, { ref });
}
