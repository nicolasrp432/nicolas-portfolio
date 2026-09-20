import { FiArrowUpRight, FiGithub, FiStar } from 'react-icons/fi';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { useGithubProjects } from '../../hooks/useGithubProjects';
import { GITHUB_USER } from '../../data/site';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowLink } from '../ui/ArrowLink';

const HEADING = [[{ text: 'Proyectos reales,' }], [{ text: 'ideas con ' }, { text: 'propósito.', accent: true }]];

/**
 * The work index, rendered on ink, in two registers.
 *
 * Six featured projects get a full card with a generated colour plate — repos
 * change faster than screenshots do, and a typographic plate keeps the grid
 * coherent while still giving every project its own identity. The plate's
 * colour cycles a fixed four-tone set from the palette, never a random hue.
 *
 * The rest render as compact index rows. Thirteen plates in a row would be a
 * 3,500px wall nobody scrolls to the end of; as rows they stay scannable and
 * the section still shows everything rather than hiding work behind a button.
 */
export function Projects() {
  const { projects, status } = useGithubProjects();

  const featured = projects.filter((project) => project.featured);
  const indexed = projects.filter((project) => !project.featured);

  const scope = useGsapScope(
    () => {
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          },
        );

        // The plate drifts slower than the card it sits in — a small depth cue
        // that reads as the grid breathing rather than as an effect.
        gsap.fromTo(
          card.querySelector('.project-plate-inner'),
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      const rows = gsap.utils.toArray('.project-row');
      if (rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.06,
            scrollTrigger: { trigger: rows[0], start: 'top 90%', once: true },
          },
        );
      }
    },
    [projects.length],
    MOTION_OK,
  );

  return (
    <section className="section projects on-ink ink-surface" id="proyectos" ref={scope}>
      <SectionHeading
        eyebrow={status === 'live' ? 'Trabajo seleccionado · datos en vivo desde GitHub' : 'Trabajo seleccionado'}
        lines={HEADING}
        standfirst="Sitios para clientes, encargos propios y experimentos. Cada pieza une una necesidad concreta, decisiones visuales y una implementación lista para evolucionar."
      />

      <ul className="project-grid">
        {featured.map((project, index) => (
          <li className="project-card" key={project.id}>
            <a
              className="project-plate"
              href={project.liveUrl || project.repoUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="ABRIR"
              aria-label={`Abrir ${project.title}${project.liveUrl ? '' : ' en GitHub'} (se abre en una pestaña nueva)`}
            >
              <span className={`project-plate-inner tone-${index % 4}`} aria-hidden="true">
                <span className="plate-chrome">
                  <i />
                  <i />
                  <i />
                </span>
                <strong>{project.title}</strong>
                <small>
                  {project.language} · {project.index}
                </small>
                <span className="plate-shape" />
              </span>
              <span className="project-number" aria-hidden="true">
                {project.index}
              </span>
              <span className="project-open" aria-hidden="true">
                <FiArrowUpRight />
              </span>
            </a>

            <div className="project-body">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <span className="project-badges">
                  {project.stars > 0 && (
                    <span className="badge">
                      <FiStar aria-hidden="true" /> {project.stars}
                      <span className="visually-hidden"> estrellas en GitHub</span>
                    </span>
                  )}
                  {project.liveUrl && (
                    <span className="badge is-live">
                      <i aria-hidden="true" /> LIVE
                    </span>
                  )}
                </span>
              </div>

              <p>{project.summary}</p>

              <div className="project-meta">
                <ul className="tag-row">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="project-links">
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    <FiGithub aria-hidden="true" /> Código
                    <span className="visually-hidden"> de {project.title} en GitHub</span>
                  </a>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Visitar <FiArrowUpRight aria-hidden="true" />
                      <span className="visually-hidden"> {project.title} en vivo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {indexed.length > 0 && (
        <>
          <h3 className="project-index-title">Más trabajo</h3>

          <ol className="project-index">
            {indexed.map((project) => (
              <li className="project-row" key={project.id}>
                {/* Two sibling links, never nested: the row opens the live
                    site, the trailing mark opens the repository. */}
                <a
                  className="project-row-main"
                  href={project.liveUrl || project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={project.liveUrl ? 'ABRIR' : 'CÓDIGO'}
                  aria-label={`${project.title} — ${project.kind}${project.liveUrl ? '' : ' (en GitHub)'} (se abre en una pestaña nueva)`}
                >
                  <span className="project-row-number" aria-hidden="true">
                    {project.index}
                  </span>
                  <span className="project-row-title">{project.title}</span>
                  <span className="project-row-kind">{project.kind}</span>
                  <span className="project-row-year" aria-hidden="true">
                    {project.year}
                  </span>
                  <span className="project-row-go" aria-hidden="true">
                    <FiArrowUpRight />
                  </span>
                </a>

                <a
                  className="project-row-code"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Código de ${project.title} en GitHub (se abre en una pestaña nueva)`}
                >
                  <FiGithub aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </>
      )}

      <div className="projects-foot">
        <ArrowLink href={`https://github.com/${GITHUB_USER}?tab=repositories`}>
          Ver todos los repositorios
        </ArrowLink>
      </div>
    </section>
  );
}
