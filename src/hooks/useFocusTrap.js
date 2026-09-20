import { useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab inside an open overlay and returns focus where it came from.
 *
 * Without this the mobile menu is a trap of the wrong kind: the panel covers
 * the page, but Tab walks straight into the links behind it, which a sighted
 * keyboard user cannot see and a screen-reader user cannot escape.
 *
 * @param {import('react').RefObject<HTMLElement>} ref Container to hold focus in.
 * @param {boolean} active
 */
export function useFocusTrap(ref, active) {
  useEffect(() => {
    const container = ref.current;
    if (!active || !container) return undefined;

    const previous = document.activeElement;
    const first = container.querySelector(FOCUSABLE);
    // `preventScroll`: the panel is mid-wipe when this runs, and a browser
    // scroll-into-view on a clipped element jumps the panel's own scroller.
    first?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;

      const items = Array.from(container.querySelectorAll(FOCUSABLE));
      if (items.length === 0) return;

      const edge = event.shiftKey ? items[0] : items[items.length - 1];
      if (document.activeElement !== edge) return;

      event.preventDefault();
      (event.shiftKey ? items[items.length - 1] : items[0]).focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, [ref, active]);
}
