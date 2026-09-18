import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { principles, profileParagraphs } from '../../data/content';
import { SplitHeadline } from '../motion/SplitHeadline';
import { Reveal } from '../motion/Reveal';

const HEADING = [[{ text: 'Entre el código y' }], [{ text: 'la ' }, { text: 'curiosidad.', accent: true }]];

/**
 * The manifesto spread: a pull quote held in the left margin while the
 * principles scroll past it on the right.
 *
 * The oversized asterisk is the section's anchor — it turns with the scroll,
 * which is the only ornamental motion on the page and is kept to exactly one
 * element for that reason.
 */
export function Profile() {
  const scope = useGsapScope((root) => {
    gsap.to('.profile-asterisk', {
      rotate: 220,
      ease: 'none',
      // `root` is the section itself; a scoped '.profile' selector would only
      // look at its descendants.
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });

    // Each principle rule draws itself left-to-right as the row arrives.
    gsap.utils.toArray('.principle').forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        },
      );
      gsap.fromTo(
        row,
        { '--rule-scale': 0 },
        {
          '--rule-scale': 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        },
      );
    });
  }, [], MOTION_OK);

  return (
    <section className="section profile" id="perfil" ref={scope}>
      <aside className="profile-aside">
        <span className="eyebrow">Manifiesto personal</span>
        <span className="profile-asterisk" aria-hidden="true">
          ✳
        </span>
        <blockquote>
          <p>“No me interesa solo hacer cosas que funcionen, sino entender por qué funcionan.”</p>
        </blockquote>
      </aside>

      <div className="profile-main">
        <SplitHeadline as="h2" lines={HEADING} className="section-title" />

        <div className="profile-copy">
          <Reveal as="p" className="profile-lead">
            Me interesa entender cómo funcionan las cosas, cómo se construyen y cómo se pueden
            mejorar.
          </Reveal>
          {profileParagraphs.map((paragraph, index) => (
            <Reveal as="p" key={paragraph.slice(0, 24)} delay={0.08 * (index + 1)}>
              {paragraph}
            </Reveal>
          ))}
        </div>

        <ol className="principles">
          {principles.map((principle, index) => (
            <li className="principle" key={principle.title}>
              <span className="principle-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
