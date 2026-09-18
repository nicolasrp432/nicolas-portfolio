import { useRef } from 'react';
import { SiClaude, SiFigma, SiGithub, SiJavascript, SiOpenai, SiReact, SiVite } from 'react-icons/si';
import { RiGeminiFill } from 'react-icons/ri';
import { gsap, MOTION_OK, MOTION_OK_DESKTOP } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { toolGroups } from '../../data/content';
import { SectionHeading } from '../ui/SectionHeading';

const HEADING = [[{ text: 'El stack cambia.' }], [{ text: 'El ' }, { text: 'criterio', accent: true }, { text: ' queda.' }]];

const STACK_ICONS = [
  { Icon: SiReact, label: 'React' },
  { Icon: SiJavascript, label: 'JavaScript' },
  { Icon: SiVite, label: 'Vite' },
  { Icon: SiOpenai, label: 'ChatGPT' },
  { Icon: SiClaude, label: 'Claude' },
  { Icon: RiGeminiFill, label: 'Gemini' },
  { Icon: SiFigma, label: 'Figma' },
  { Icon: SiGithub, label: 'GitHub' },
];

/**
 * The toolbox, presented as a pinned three-act sequence.
 *
 * On desktop the section pins and the reader scrubs through the three groups:
 * the oversized numeral swaps, the chips deal in, and a progress rule tracks
 * position. On narrow screens pinning costs more than it gives, so the same
 * three groups simply stack and reveal in turn — same content, same markup,
 * different choreography.
 */
export function Toolbox() {
  const root = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const acts = gsap.utils.toArray('.tool-act', element);

      mm.add(MOTION_OK_DESKTOP, () => {
        gsap.set(acts, { autoAlpha: 0 });
        gsap.set(acts[0], { autoAlpha: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.tool-stage',
            start: 'top top+=80',
            // One extra viewport of scroll per act after the first.
            end: () => `+=${window.innerHeight * (acts.length - 1)}`,
            pin: '.tool-stage',
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        acts.forEach((act, index) => {
          if (index === 0) return;
          tl.to(acts[index - 1], { autoAlpha: 0, yPercent: -8, duration: 0.4 })
            .fromTo(act, { autoAlpha: 0, yPercent: 8 }, { autoAlpha: 1, yPercent: 0, duration: 0.4 }, '<')
            .to('.tool-progress-bar', { scaleX: (index + 1) / acts.length, duration: 0.8 }, '<');
        });

        return () => tl.kill();
      });

      // Narrow screens (or coarse pointers): no pin, just sequential reveals.
      mm.add(`${MOTION_OK} and (max-width: 900px)`, () => {
        gsap.set(acts, { autoAlpha: 1 });
        acts.forEach((act) => {
          gsap.fromTo(
            act,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'expo.out',
              scrollTrigger: { trigger: act, start: 'top 88%', once: true },
            },
          );
        });
      });

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.stack-icons li',
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: '.stack-icons', start: 'top 92%', once: true },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section toolbox" id="herramientas" ref={root}>
      <SectionHeading eyebrow="Mi caja de herramientas" lines={HEADING} compact />

      <ul className="stack-icons" aria-label="Tecnologías principales">
        {STACK_ICONS.map(({ Icon, label }) => (
          <li key={label}>
            <Icon aria-hidden="true" />
            <span className="visually-hidden">{label}</span>
          </li>
        ))}
      </ul>

      <div className="tool-stage">
        <div className="tool-progress" aria-hidden="true">
          <span className="tool-progress-bar" />
        </div>

        <div className="tool-acts">
          {toolGroups.map((group) => (
            <article className="tool-act" key={group.number}>
              <div className="tool-act-head">
                <span className="tool-act-number" aria-hidden="true">
                  {group.number}
                </span>
                <div>
                  <h3>{group.label}</h3>
                  <p className="eyebrow">{group.caption}</p>
                </div>
              </div>
              <ul className="tag-row is-large">
                {group.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
