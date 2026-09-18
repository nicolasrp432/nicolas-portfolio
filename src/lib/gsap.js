import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Every animation in the app is registered inside a `gsap.matchMedia()` block
 * keyed on this query. When a visitor asks for reduced motion the block simply
 * never runs — and `matchMedia` reverts anything it already created, so the
 * page settles into its plain CSS state instead of a half-played timeline.
 */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP = '(min-width: 901px)';
export const MOTION_OK_DESKTOP = `${MOTION_OK} and ${DESKTOP}`;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/**
 * Marks the document so CSS can pre-hide elements that GSAP is about to
 * animate in. Without JS — or with reduced motion — the attribute is absent and
 * everything renders visible, so content is never trapped behind an animation.
 */
export function enableMotionStyles() {
  if (typeof document === 'undefined') return false;
  const allowed = !prefersReducedMotion();
  document.documentElement.dataset.motion = allowed ? 'on' : 'off';
  return allowed;
}

gsap.defaults({ ease: 'power3.out', duration: 0.9 });

// ScrollTrigger measures against a layout that only exists once fonts have
// swapped in; stale positions are the usual cause of "reveals fire too early".
if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
}

export { gsap, ScrollTrigger };
