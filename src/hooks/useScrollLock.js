import { useEffect } from 'react';

/** Freezes page scroll while a curtain or overlay menu owns the viewport. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    document.body.dataset.scrollLocked = 'true';
    return () => {
      delete document.body.dataset.scrollLocked;
    };
  }, [locked]);
}
