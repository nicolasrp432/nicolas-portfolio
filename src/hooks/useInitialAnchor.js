import { useEffect } from 'react';

/** A fragment may arrive before React has mounted its target in this document. */
export function useInitialAnchor() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView?.({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}
