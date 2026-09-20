import { useRef } from 'react';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { toolGroups } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { StackIcons } from '../ui/StackIcons';

const HEADING = [[{ text: 'El stack cambia.' }], [{ text: 'El ' }, { text: 'criterio', accent: true }, { text: ' queda.' }]];

/**
 * The toolbox: three layers of practice, all three readable at once.
 *
 * This replaces a pinned, scrubbed sequence where the acts cross-faded in a
 * single frame. That version failed the reader three ways: it took two extra
 * viewports of scroll hostage, it swapped content in place so the three groups
 * could never be compared, and it behaved nothing like the plain stack it fell
 * back to on phones.
 *
 * Now they are three cards on one staircase — descending to the right, which
 * reads as 01 → 02 → 03 without a progress bar having to say so. Nothing is
 * pinned, nothing is scrubbed, and the mobile layout is the same composition
 * with the staircase flattened. The only motion is one arrival per card.
 */
export function Toolbox() {
  const root = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray('.tool-card', element).forEach((card) => {
          // One trigger per card, so each arrives on its own terms whether the
          // row is side by side or stacked.
          const onArrival = { trigger: card, start: 'top 86%', once: true };

          gsap.fromTo(
            card,
            { opacity: 0, y: 44 },
            { opacity: 1, y: 0, duration: 0.85, ease: 'expo.out', scrollTrigger: onArrival },
          );

          gsap.fromTo(
            card.querySelector('.tool-card-rule'),
            { '--rule-scale': 0 },
            { '--rule-scale': 1, duration: 0.9, delay: 0.15, ease: 'expo.out', scrollTrigger: onArrival },
          );

          gsap.fromTo(
            card.querySelectorAll('.tag-row li'),
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.25,
              stagger: 0.04,
              ease: 'power3.out',
              scrollTrigger: onArrival,
            },
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section toolbox" id="herramientas" ref={root}>
      <SectionHeading eyebrow="Mi caja de herramientas" lines={HEADING} compact />

      <StackIcons />

      <ol className="tool-grid">
        {toolGroups.map((group) => (
          <li className="tool-card" key={group.number}>
            <div className="tool-card-head">
              <span className="tool-card-number" aria-hidden="true">
                {group.number}
              </span>
              <span className="tool-card-caption">{group.caption}</span>
            </div>

            <span className="tool-card-rule" aria-hidden="true" />

            <h3>{group.label}</h3>

            <ul className="tag-row is-large">
              {group.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
