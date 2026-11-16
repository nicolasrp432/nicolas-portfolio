import { projectArtwork, projectTone, PROJECT_PALETTES } from '../../lib/projectArtwork';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { useReducedMotion } from '../../hooks/useMediaQuery';

const WarpCarousel = lazy(() => import('./warp-carousel'));
const PALETTES = [
  ['#171614', '#382921', '#a34730', '#e77e59', '#593325', '#171614'],
  ['#32362c', '#71764a', '#aeb66f', '#403e27', '#171614', '#5b6040'],
  ['#503129', '#bd7053', '#d7b48e', '#32231e', '#171614', '#784a37'],
  ['#242b2d', '#536669', '#b2b9a8', '#292e2b', '#171614', '#5c5e4f'],
];

/** The renderer is decorative; project copy and real links always stay in HTML. */
export function ProjectWarpGallery({ projects }) {
  const [index, setIndex] = useState(0);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const root = useRef(null);
  const reduced = useReducedMotion();
  const project = projects[index] || projects[0];
  const cards = useMemo(() => projects.map((p, i) => ({
    title: p.title, value: p.index, footer: p.tags.slice(0, 2).join(' / '),
    kind: p.kind, image: projectArtwork(p), palette: PROJECT_PALETTES[projectTone(p)], mesh: PALETTES[i % PALETTES.length], glow: '#e58a65',
  })), [projects]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: '300px' });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  const select = (next) => setIndex((next + projects.length) % projects.length);
  const onKeyDown = (event) => {
    if (event.target.closest('.project-warp-renderer')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); select(index + (event.key === 'ArrowRight' ? 1 : -1));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); select(event.key === 'Home' ? 0 : projects.length - 1);
    }
  };

  if (!project) return null;
  return (
    <div className="project-warp-gallery" ref={root} onKeyDown={onKeyDown}>
      <div className="project-warp-layout">
        <div className="project-warp-stage">
          <div className="project-warp-static" style={{ backgroundImage: `url("${projectArtwork(project)}")`, color: PROJECT_PALETTES[projectTone(project)].ink }} aria-hidden="true" data-hidden={near && ready && !reduced || undefined}>
            <span>PROYECTO / {project.index}</span>
            <strong>{project.title}</strong>
            <small>{project.tags.slice(0, 2).join(' / ')}</small>
          </div>
          {near && !reduced && (
            <Suspense fallback={null}>
              <WarpCarousel cards={cards} index={index} onIndexChange={select} onReady={setReady}
                autoplay={false} step={1} background="#171614" glow="#c67d5b" warp={0.85}
                font="Manrope, sans-serif" className="project-warp-renderer"
                ariaLabel="Girar los proyectos" style={{ minHeight: 0, aspectRatio: 'auto' }} />
            </Suspense>
          )}
        </div>
        <article className="project-warp-detail" aria-label="Proyecto seleccionado">
          <p className="eyebrow">{project.kind} <span> / {project.year}</span></p>
          <h3>{project.title}</h3>
          <p className="project-warp-summary">{project.summary}</p>
          <ul className="tag-row">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          <div className="project-links">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Visitar {project.title} <FiArrowUpRight aria-hidden="true" /></a>}
            <a href={project.repoUrl} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> Código de {project.title}</a>
          </div>
        </article>
      </div>
      <div className="project-warp-controls">
        <button type="button" onClick={() => select(index - 1)} aria-label="Proyecto anterior" disabled={projects.length < 2}><FiArrowLeft aria-hidden="true" /></button>
        <p role="status">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} <span>{project.title}</span></p>
        <button type="button" onClick={() => select(index + 1)} aria-label="Proyecto siguiente" disabled={projects.length < 2}><FiArrowRight aria-hidden="true" /></button>
      </div>
      <div className="project-warp-picker" role="group" aria-label="Elegir proyecto">
        {projects.map((p, i) => <button key={p.id} type="button" aria-pressed={index === i} onClick={() => select(i)}>
          <span aria-hidden="true">{p.index}</span>{p.title}
        </button>)}
      </div>
    </div>
  );
}
