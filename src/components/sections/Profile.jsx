import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { principles, profileParagraphs } from '../../data/content';
import { SplitHeadline } from '../motion/SplitHeadline';
import { Reveal } from '../motion/Reveal';
import { Asterisk } from '../ui/Asterisk';

const HEADING = [[{ text: 'Entre el código y' }], [{ text: 'la ' }, { text: 'curiosidad.', accent: true }]];

/**
 * The manifesto spread: a pull quote held in the left margin while the
 * principles scroll past it on the right.
 *
 * The oversized asterisk is the section's anchor — it turns with the scroll,
 * which is the only ornamental motion on the page and is kept to exactly one
 * element for that reason. It is drawn as an SVG, not typed as a character:
 * see `Asterisk` for why.
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

    // Entrada escalonada y levitación suave de la tríada de ajedrez 3D (Torre, Rey, Caballo)
    gsap.fromTo(
      '.profile-chess-item',
      { opacity: 0, y: 32, scale: 0.86 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      },
    );

    gsap.to('.item-rook img', {
      y: -8,
      rotate: -1.5,
      duration: 3.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to('.item-king img', {
      y: -12,
      rotate: 1.5,
      duration: 4.0,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.2,
    });

    gsap.to('.item-knight img', {
      y: -9,
      rotate: -2,
      duration: 3.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.4,
    });

    gsap.to('.profile-chess-triad', {
      yPercent: 7,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
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

        <div className="profile-chess-stage">
          <span className="profile-king-halo" aria-hidden="true" />

          <div className="profile-chess-triad">
            {/* Torre a la izquierda: Estructura & Solidez */}
            <div className="profile-chess-item item-rook">
              <img
                src="/img/chess/chess-rook-3d.png"
                alt="Torre de ajedrez en 3D — Estructura"
                className="profile-chess-img img-rook"
                width="444"
                height="806"
                loading="lazy"
                decoding="async"
              />
              <span className="profile-chess-label">Estructura</span>
            </div>

            {/* Rey en el centro: Estrategia & Visión (Protagonista) */}
            <div className="profile-chess-item item-king">
              <img
                src="/img/chess/chess-king-3d.png"
                alt="Rey de ajedrez en 3D — Estrategia"
                className="profile-chess-img img-king"
                width="368"
                height="891"
                loading="lazy"
                decoding="async"
              />
              <span className="profile-chess-label label-king">Estrategia</span>
            </div>

            {/* Caballo a la derecha: Creatividad & Táctica */}
            <div className="profile-chess-item item-knight">
              <img
                src="/img/chess/chess-knight-3d.png"
                alt="Caballo de ajedrez en 3D — Táctica"
                className="profile-chess-img img-knight"
                width="450"
                height="836"
                loading="lazy"
                decoding="async"
              />
              <span className="profile-chess-label">Táctica</span>
            </div>
          </div>

          <span className="profile-king-chip">
            <span className="chip-dot" aria-hidden="true" />
            Estratega Creativo
          </span>
        </div>

        <span className="profile-asterisk" aria-hidden="true">
          <Asterisk />
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
