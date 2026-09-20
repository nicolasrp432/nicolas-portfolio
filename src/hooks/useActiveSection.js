import { useEffect, useState } from 'react';

/**
 * Reports which chapter currently owns the reading line.
 *
 * `rootMargin` collapses the viewport to a zero-height band a little above the
 * middle, so exactly one section can ever intersect it. That removes the usual
 * "two links lit at once" problem of threshold-based spies, and it costs one
 * observer instead of a scroll listener.
 *
 * Deliberately independent of `prefers-reduced-motion` and of GSAP: knowing
 * where you are is navigation, not decoration, so it runs for everyone.
 *
 * @param {string[]} ids Section element ids, in document order.
 * @returns {string|null} The active id, or null before the first crossing.
 */
export function useActiveSection(ids) {
  const key = ids.join(',');
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const targets = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (targets.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
