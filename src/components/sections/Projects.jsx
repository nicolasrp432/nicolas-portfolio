import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { useGithubProjects } from '../../hooks/useGithubProjects';
import { GITHUB_USER } from '../../data/site';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowLink } from '../ui/ArrowLink';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectRow } from '../ui/ProjectRow';

const HEADING = [[{ text: 'Proyectos reales,' }], [{ text: 'ideas con ' }, { text: 'propósito.', accent: true }]];

/**
 * The work index, rendered on ink, in two registers.
 *
 * The featured projects get a full card with a generated colour plate; the
 * rest render as compact index rows. Sixteen plates in a row would be a wall
 * nobody scrolls to the end of; as rows they stay scannable and the section
 * still shows everything rather than hiding work behind a button.
 *
 * Both registers live in `ui/ProjectCard` and `ui/ProjectRow`, because the
 * education page renders the same two shapes.
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
          <ProjectCard key={project.id} project={project} tone={index} />
        ))}
      </ul>

      {indexed.length > 0 && (
        <>
          <h3 className="project-index-title">Más trabajo</h3>

          <ol className="project-index">
            {indexed.map((project) => (
              <ProjectRow key={project.id} project={project} />
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
