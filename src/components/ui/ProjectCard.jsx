import { FiArrowUpRight, FiGithub, FiStar } from 'react-icons/fi';

/**
 * The full project card: colour plate, then the body.
 *
 * The plate is typographic rather than a screenshot — repos change faster than
 * screenshots do, and a generated plate keeps a grid coherent while still
 * giving every project its own identity. `tone` cycles a fixed four-tone set
 * from the palette, never a random hue.
 *
 * @param {object} props
 * @param {object} props.project A card from `toProjectCard`.
 * @param {number} props.tone    Position used to pick the plate colour.
 */
export function ProjectCard({ project, tone }) {
  return (
    <li className="project-card">
      <a
        className="project-plate"
        href={project.liveUrl || project.repoUrl}
        target="_blank"
        rel="noreferrer"
        data-cursor="ABRIR"
        aria-label={`Abrir ${project.title}${project.liveUrl ? '' : ' en GitHub'} (se abre en una pestaña nueva)`}
      >
        <span className={`project-plate-inner tone-${tone % 4}`} aria-hidden="true">
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
  );
}
