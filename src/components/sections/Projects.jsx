import { FiArrowUpRight, FiGithub, FiStar } from 'react-icons/fi';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { useGithubProjects } from '../../hooks/useGithubProjects';
import { GITHUB_USER } from '../../data/site';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowLink } from '../ui/ArrowLink';

const HEADING = [[{ text: 'Proyectos reales,' }], [{ text: 'ideas con ', accent: false }, { text: 'propósito.', accent: true }]];

/**
 * The work index, rendered on ink.
 *
 * Each card gets a generated colour plate instead of a screenshot: repos
 * change faster than screenshots do, and a typographic plate keeps the grid
 * coherent while still giving every project its own identity. The plate's
 * colour is derived from the project's position, cycling a fixed four-tone set
 * from the palette rather than a random hue.
 */
export function Projects() {
  const { projects, status } = useGithubProjects();

  const scope = useGsapScope(
    () => {
      const cards = gsap.utils.toArray('.project-card');

      cards.forEach((card) => {
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
    },
    [projects.length],
    MOTION_OK,
  );

  return (
    <section className="section projects on-ink ink-surface" id="proyectos" ref={scope}>
      <SectionHeading
        eyebrow={status === 'live' ? 'Trabajo reciente · en vivo desde GitHub' : 'Trabajo reciente'}
        lines={HEADING}
        standfirst="Una selección viva de productos que he diseñado y desarrollado. Cada pieza une una necesidad concreta, decisiones visuales y una implementación lista para evolucionar."
      />

      <ul className="project-grid">
        {projects.map((project, index) => (
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

      <div className="projects-foot">
        <ArrowLink href={`https://github.com/${GITHUB_USER}?tab=repositories`}>
          Ver todos los repositorios
        </ArrowLink>
      </div>
    </section>
  );
}
