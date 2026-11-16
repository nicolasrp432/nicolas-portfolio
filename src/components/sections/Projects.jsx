import { useState } from 'react';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { useSectionLayoutRefresh } from '../../hooks/useSectionLayoutRefresh';
import { useGithubProjects } from '../../hooks/useGithubProjects';
import { GITHUB_USER } from '../../data/site';
import { projectFolders } from '../../data/projects';
import { GlassFolder } from '../ui/GlassFolder';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowLink } from '../ui/ArrowLink';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectWarpGallery } from '../ui/project-warp-gallery';
import { ProjectRow } from '../ui/ProjectRow';

const HEADING = [[{ text: 'Proyectos reales,' }], [{ text: 'ideas con ' }, { text: 'propósito.', accent: true }]];

/** Folder filters feed both views from the same curated data. The optical
 * gallery is the default; the original cards and rows remain available via
 * “Lista completa” and continue to be shared with the education page. */
export function Projects() {
  const { projects, status } = useGithubProjects();

  const [active, setActive] = useState(null);
  const [view, setView] = useState('carousel');

  const shown = active ? projects.filter((project) => project.folder === active) : projects;
  const featured = shown.filter((project) => project.featured);
  const indexed = shown.filter((project) => !project.featured);
  const activeFolder = projectFolders.find((folder) => folder.id === active);

  const shelf = useGsapScope((root) => {
    gsap.fromTo(
      root.querySelectorAll('.gf-root'),
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.09,
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      },
    );
  }, []);

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
    // Re-run on a filter change: the cards are new nodes and need their triggers.
    [projects.length, active, view],
    MOTION_OK,
  );

  useSectionLayoutRefresh(scope);

  return (
    <section className="section projects on-ink ink-surface" id="proyectos" ref={scope}>
      <SectionHeading
        eyebrow={status === 'live' ? 'Trabajo seleccionado · datos en vivo desde GitHub' : 'Trabajo seleccionado'}
        lines={HEADING}
        standfirst="Sitios para clientes, encargos propios y experimentos. Cada pieza une una necesidad concreta, decisiones visuales y una implementación lista para evolucionar."
      />

      <div className="folder-shelf" role="group" aria-label="Filtrar proyectos por carpeta" ref={shelf}>
        {projectFolders.map((folder, index) => {
          const files = projects.filter((project) => project.folder === folder.id);
          return (
            <GlassFolder
              key={folder.id}
              label={folder.label}
              numeral={String(index + 1).padStart(2, '0')}
              files={files.map((project) => ({ name: project.title, meta: project.year }))}
              art={folder.art}
              seed={folder.seed}
              open={active === folder.id}
              onToggle={() => setActive(active === folder.id ? null : folder.id)}
            />
          );
        })}
      </div>

      <div className="folder-status">
        <p aria-live="polite">
          <span className="folder-status-name">{activeFolder ? activeFolder.label : 'Todo el trabajo'}</span>
          {' · '}
          {String(shown.length).padStart(2, '0')} proyectos
        </p>
        {active && (
          <button type="button" className="folder-reset" onClick={() => setActive(null)}>
            Ver todo
          </button>
        )}
      </div>

      <div className="project-view-switch" role="group" aria-label="Vista de proyectos">
        <button type="button" aria-pressed={view === 'carousel'} onClick={() => setView('carousel')}>Carrusel</button>
        <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}>Lista completa</button>
      </div>
      {view === 'carousel' ? <ProjectWarpGallery key={active || 'all'} projects={shown} /> : <>
      {featured.length > 0 && (
        <ul className="project-grid">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} tone={index} />
          ))}
        </ul>
      )}

      {indexed.length > 0 && (
        <>
          {featured.length > 0 && <h3 className="project-index-title">Más trabajo</h3>}

          <ol className="project-index">
            {indexed.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </ol>
        </>
      )}

      </>}

      <div className="projects-foot">
        <ArrowLink href={`https://github.com/${GITHUB_USER}?tab=repositories`}>
          Ver todos los repositorios
        </ArrowLink>
      </div>
    </section>
  );
}
