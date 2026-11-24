import { useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * A sleek two-part tactile cursor:
 * A high-precision center dot that tracks pointer movements synchronously,
 * accompanied by a smooth trailing magnetic ring.
 *
 * Expands organically over interactive elements with zero text clutter,
 * providing clean visual feedback.
 */
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return undefined;

    const ctx = gsap.context(() => {
      let isHovered = false;

      // Trailing latency creates organic fluid inertia
      const dotX = gsap.quickTo(dotEl, 'x', { duration: 0.08, ease: 'power3.out' });
      const dotY = gsap.quickTo(dotEl, 'y', { duration: 0.08, ease: 'power3.out' });
      const ringX = gsap.quickTo(ringEl, 'x', { duration: 0.38, ease: 'power3.out' });
      const ringY = gsap.quickTo(ringEl, 'y', { duration: 0.38, ease: 'power3.out' });

      const onMove = (event) => {
        if (event.pointerType === 'touch') return;
        // Keep the native pointer until the replacement has a real position.
        if (!document.documentElement.hasAttribute('data-custom-cursor')) {
          gsap.set(dotEl, { x: event.clientX, y: event.clientY, opacity: 1 });
          gsap.set(ringEl, { x: event.clientX, y: event.clientY, opacity: 1 });
          document.documentElement.setAttribute('data-custom-cursor', '');
        }
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
      };

      const interactiveSelector = 'a, button, [role="button"], input, textarea, select, .hero-float, .profile-chess-piece, .project-card, .certificate-card, [data-cursor]';

      const onOver = (event) => {
        const target = event.target.closest?.(interactiveSelector);
        isHovered = Boolean(target);

        if (isHovered) {
          ringEl.classList.add('is-hovering');
          gsap.to(ringEl, { scale: 1.75, duration: 0.3, ease: 'power3.out' });
          gsap.to(dotEl, { scale: 0.6, duration: 0.25, ease: 'power3.out' });
        } else {
          ringEl.classList.remove('is-hovering');
          gsap.to(ringEl, { scale: 1, duration: 0.35, ease: 'power3.out' });
          gsap.to(dotEl, { scale: 1, duration: 0.25, ease: 'power3.out' });
        }
      };

      const onDown = () => {
        gsap.to(ringEl, { scale: 0.82, duration: 0.15, ease: 'power2.out' });
        gsap.to(dotEl, { scale: 1.4, duration: 0.15, ease: 'power2.out' });
      };

      const onUp = () => {
        gsap.to(ringEl, { scale: isHovered ? 1.75 : 1, duration: 0.25, ease: 'back.out(2)' });
        gsap.to(dotEl, { scale: isHovered ? 0.6 : 1, duration: 0.25, ease: 'back.out(2)' });
      };

      const onLeave = () => {
        document.documentElement.removeAttribute('data-custom-cursor');
        gsap.set([dotEl, ringEl], { opacity: 0 });
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerover', onOver, { passive: true });
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      document.addEventListener('pointerleave', onLeave);
      window.addEventListener('blur', onLeave);

      return () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerover', onOver);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        document.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('blur', onLeave);
        document.documentElement.removeAttribute('data-custom-cursor');
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <span className="cursor-dot" ref={dot} />
      <span className="cursor-ring" ref={ring} />
    </div>
  );
}
