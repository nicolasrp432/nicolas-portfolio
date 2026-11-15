import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { labDisciplines } from '../../data/lab';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowLink } from '../ui/ArrowLink';
import { LiquidGlass } from '../ui/LiquidGlass';
import { LiquidSculpture } from '../ui/LiquidSculpture';

const HEADING = [[{ text: 'La imagen también' }], [{ text: 'se ' }, { text: 'mueve.', accent: true }]];

/**
 * The lab: motion, video and 3D, on paper.
 *
 * The left half is the argument made physical — the chess king from the hero,
 * rebuilt from particles that turn liquid under the pointer. The right half is
 * the plain index of the three disciplines and the pieces that back them.
 *
 * Nothing here is pinned or scrubbed: the king reacts to the pointer, not to
 * the scroll, so the chapter can be read past like any other.
 */
export function Lab() {
  const scope = useGsapScope(
    () => {
      gsap.fromTo(
        '.lab-stage',
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.lab-stage', start: 'top 85%', once: true },
        },
      );

      gsap.utils.toArray('.lab-item').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: item, start: 'top 88%', once: true },
          },
        );
      });
    },
    [],
    MOTION_OK,
  );

  return (
    <section className="section lab" id="laboratorio" ref={scope}>
      <SectionHeading
        eyebrow="Laboratorio · motion, vídeo y 3D"
        lines={HEADING}
        standfirst="Lo que estoy sumando al código: animación, montaje y escenas en tres dimensiones. Mismas reglas que una interfaz — claridad, ritmo e intención."
      />

      <div className="lab-grid">
        <figure className="lab-stage">
          <LiquidSculpture
            className="lab-sculpture"
            src="/img/chess/chess-king-3d.png"
            alt="Rey de ajedrez en 3D"
            width={368}
            height={891}
          >
            <LiquidGlass className="lab-hint" aria-hidden="true" bevelDepth={12} scale={44} aberration={4}>
              <span className="lab-hint-dot" />
              Pasa el cursor por la pieza
            </LiquidGlass>
          </LiquidSculpture>

          <figcaption className="lab-caption">
            <span>Fig. 01</span>
            <span>Rey · partículas en tiempo real · WebGL2</span>
          </figcaption>
        </figure>

        <ol className="lab-list">
          {labDisciplines.map((discipline) => (
            <li className="lab-item" key={discipline.id}>
              <span className="lab-item-number" aria-hidden="true">
                {discipline.number}
              </span>

              <div className="lab-item-body">
                <h3>{discipline.title}</h3>
                <p>{discipline.text}</p>

                <ul className="tag-row">
                  {discipline.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                {discipline.pieces.length > 0 && (
                  <ul className="lab-pieces">
                    {discipline.pieces.map((piece) => (
                      <li key={piece.id}>
                        <ArrowLink
                          href={piece.liveUrl || piece.repoUrl}
                          label={`${piece.title} (se abre en una pestaña nueva)`}
                        >
                          {piece.title}
                        </ArrowLink>
                      </li>
                    ))}
                  </ul>
                )}

                {discipline.status && <p className="lab-status">{discipline.status}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
