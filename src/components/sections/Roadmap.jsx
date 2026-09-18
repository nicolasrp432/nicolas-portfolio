import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { roadmap } from '../../data/content';
import { SplitHeadline } from '../motion/SplitHeadline';
import { Reveal } from '../motion/Reveal';

const HEADING = [[{ text: 'Un portfolio que' }], [{ text: 'también ' }, { text: 'evoluciona.', accent: true }]];

/**
 * The forward-looking chapter, on a full coral field.
 *
 * A single rule is drawn down the left of the list as the reader scrolls, and
 * each milestone's marker fills as the line passes it — the roadmap literally
 * draws itself, which is the clearest way to say "this is still being built".
 */
export function Roadmap() {
  const scope = useGsapScope(() => {
    gsap.fromTo(
      '.roadmap-rule',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: '.roadmap-list',
          start: 'top 75%',
          end: 'bottom 80%',
          scrub: 0.5,
        },
      },
    );

    gsap.utils.toArray('.roadmap-item').forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        },
      );
      gsap.fromTo(
        item.querySelector('.roadmap-dot'),
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(3)',
          scrollTrigger: { trigger: item, start: 'top 82%', once: true },
        },
      );
    });
  }, [], MOTION_OK);

  return (
    <section className="section roadmap" id="ruta" ref={scope}>
      <div className="roadmap-intro">
        <span className="eyebrow">Plan visual · Próximas iteraciones</span>
        <SplitHeadline as="h2" lines={HEADING} className="section-title" />
        <Reveal as="p" delay={0.1}>
          La base ya prioriza trabajo real, narrativa y una identidad propia. Estos son los
          siguientes pasos de diseño para mantenerlo vivo.
        </Reveal>
      </div>

      <ol className="roadmap-list">
        <span className="roadmap-rule" aria-hidden="true" />
        {roadmap.map((step) => (
          <li className="roadmap-item" key={step.title}>
            <span className="roadmap-dot" aria-hidden="true" />
            <span className="roadmap-stage">{step.stage}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
