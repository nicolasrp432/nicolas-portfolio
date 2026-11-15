import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { roadmap } from '../../data/content';
import { SplitHeadline } from '../motion/SplitHeadline';
import { ArrowLink } from '../ui/ArrowLink';
import { Reveal } from '../motion/Reveal';

const HEADING = [[{ text: 'Tu idea, un' }], [{ text: 'camino ' }, { text: 'claro.', accent: true }]];

/** A visible path from the first conversation to delivery. */
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
        <span className="eyebrow">Cómo trabajamos · De la conversación a la entrega</span>
        <SplitHeadline as="h2" lines={HEADING} className="section-title" />
        <Reveal as="p" delay={0.1}>
          Si quieres colaborar, este es el recorrido. Con decisiones compartidas, avances visibles
          y expectativas claras desde el principio.
        </Reveal>
        <ArrowLink href="#contacto" external={false}>Hablemos de tu proyecto</ArrowLink>
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
