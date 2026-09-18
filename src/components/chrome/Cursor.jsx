import { useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * A two-part cursor: a hard coral dot that tracks the pointer exactly, and a
 * ring that lags behind it. Any element carrying `data-cursor="LABEL"` swells
 * the ring and prints that word inside it, so hovering a project card reads
 * "ABRIR" rather than relying on an icon.
 *
 * Mounted only for fine pointers with motion enabled; the native cursor is
 * hidden by the same condition in CSS, so it can never be lost.
 */
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState('');

  useIsomorphicLayoutEffect(() => {
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return undefined;

    const ctx = gsap.context(() => {
      // Two different durations are what creates the trailing feel.
      const dotX = gsap.quickTo(dotEl, 'x', { duration: 0.12, ease: 'power3.out' });
      const dotY = gsap.quickTo(dotEl, 'y', { duration: 0.12, ease: 'power3.out' });
      const ringX = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3.out' });
      const ringY = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (event) => {
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
      };

      const onOver = (event) => {
        const target = event.target.closest?.('[data-cursor]');
        setLabel(target ? target.dataset.cursor : '');
        // Only the scale is animated. Colour is left to CSS: the layer is
        // painted with `mix-blend-mode: difference`, which inverts it against
        // both the paper and the ink sections — GSAP cannot tween a `var()`.
        gsap.to(ringEl, { scale: target ? 2.6 : 1, duration: 0.35, ease: 'power3.out' });
      };

      const onDown = () => gsap.to(ringEl, { scale: 0.85, duration: 0.2 });
      const onUp = () => gsap.to(ringEl, { scale: 1, duration: 0.3 });
      const onLeave = () => gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.2 });
      const onEnter = () => gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.2 });

      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerover', onOver, { passive: true });
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      document.addEventListener('pointerleave', onLeave);
      document.addEventListener('pointerenter', onEnter);

      return () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerover', onOver);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        document.removeEventListener('pointerleave', onLeave);
        document.removeEventListener('pointerenter', onEnter);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <span className="cursor-dot" ref={dot} />
      <span className={`cursor-ring${label ? ' is-labelled' : ''}`} ref={ring}>
        <span className="cursor-label">{label}</span>
      </span>
    </div>
  );
}
