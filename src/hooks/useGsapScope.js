import { useRef } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Scopes a set of GSAP animations to one element and tears them down cleanly.
 *
 * `setup` runs only when the visitor has not asked for reduced motion.
 * Selector strings inside it resolve against the returned ref, so a component
 * can never animate a sibling by accident.
 *
 * It receives the scope element itself, because scoped selectors only match
 * *descendants* — a section that wants to trigger on its own bounds has to
 * pass the node, not a selector that would silently find nothing.
 *
 * @param {(root: HTMLElement, ctx: object) => void} setup
 * @param {unknown[]} deps    Re-runs the whole scope when these change.
 * @param {string} query      Override the media query the block is keyed on.
 * @returns {import('react').RefObject<HTMLElement>}
 */
export function useGsapScope(setup, deps = [], query = MOTION_OK) {
  const scope = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(query, (mmContext) => setup(root, mmContext));
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
