import { useEffect } from 'react';
import { ScrollTrigger } from '../lib/gsap';

/** Remeasure a changing section and the content below it without resetting
 * the document scroller. A global refresh temporarily scrolls to zero, which
 * can interrupt a touch gesture / smooth scroll and send the reader home. */
export function useSectionLayoutRefresh(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof ResizeObserver === 'undefined') return undefined;
    let height = root.getBoundingClientRect().height;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      const next = root.getBoundingClientRect().height;
      if (Math.abs(next - height) < 1) return;
      height = next;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ScrollTrigger.getAll().forEach((trigger) => {
          const element = trigger.trigger;
          if (element && (root.contains(element) ||
            root.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING)) {
            trigger.refresh();
          }
        });
      });
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}
