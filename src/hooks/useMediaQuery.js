import { useEffect, useState } from 'react';

/** Reactive `window.matchMedia`, SSR- and jsdom-safe. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? (window.matchMedia?.(query).matches ?? false) : false,
  );

  useEffect(() => {
    const list = window.matchMedia?.(query);
    if (!list) return undefined;

    const onChange = (event) => setMatches(event.matches);
    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const useIsDesktop = () => useMediaQuery('(min-width: 901px)');
/** True for devices that can actually hover — gates the custom cursor. */
export const useHasPointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
