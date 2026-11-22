import { useEffect, useRef, useState } from 'react';

/** Native scrolling selects the chapter; the controls reach the same text. */
export function useStoryChapters() {
  const root = useRef(null);
  const manual = useRef(false);
  const [chapter, setChapter] = useState(0);
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
    // Wait for the selected interface state before measuring the destination.
    requestAnimationFrame(() => root.current?.querySelector(`[data-story-chapter="${index}"]`)?.scrollIntoView?.({ block: 'end', behavior: 'instant' }));
  };
  return { root, chapter, choose };
}
