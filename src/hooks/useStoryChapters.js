import { useEffect, useRef, useState } from 'react';

/** Native scrolling selects the chapter; the controls reach the same text. */
export function useStoryChapters() {
  const root = useRef(null);
  const manual = useRef(false);
  const pendingFrame = useRef(0);
  const [chapter, setChapter] = useState(0);
  useEffect(() => () => cancelAnimationFrame(pendingFrame.current), []);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(entries => {
      if (manual.current) return;
      const entry = entries.find(e => e.isIntersecting);
      if (entry) setChapter(Number(entry.target.dataset.storyChapter));
    }, { rootMargin: '-55% 0px -15% 0px' });
    root.current?.querySelectorAll('[data-story-chapter]').forEach(el => observer.observe(el));
    const resume = event => {
      if (event.target?.closest?.('input, button')) return;
      if (event.type === 'keydown' && !['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) return;
      manual.current = false;
    };
    window.addEventListener('wheel', resume, { passive: true });
    window.addEventListener('touchmove', resume, { passive: true });
    window.addEventListener('keydown', resume);
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', resume);
      window.removeEventListener('touchmove', resume);
      window.removeEventListener('keydown', resume);
    };
  }, []);
  const choose = index => {
    manual.current = true;
    setChapter(index);
    // A sticky desktop stage stays beside its chapter. In native mobile flow,
    // reveal the changed stage itself instead of sending the result off-screen.
    cancelAnimationFrame(pendingFrame.current);
    pendingFrame.current = requestAnimationFrame(() => {
      const stage = root.current?.querySelector('.experience-sticky, .motion-story-sticky');
      const sticky = stage && getComputedStyle(stage).position === 'sticky';
      const destination = sticky ? root.current?.querySelector(`[data-story-chapter="${index}"]`) : stage;
      destination?.scrollIntoView?.({ block: sticky ? 'end' : 'start', behavior: 'instant' });
    });
  };
  return { root, chapter, choose };
}
