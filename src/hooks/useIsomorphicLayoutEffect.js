import { useEffect, useLayoutEffect } from 'react';

/** Avoids React's layout-effect warning if this ever renders on a server. */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
