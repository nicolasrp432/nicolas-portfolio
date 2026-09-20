import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

/**
 * The compact register: one project as an index row.
 *
 * Two sibling links, never nested — nesting an anchor inside an anchor is
 * invalid and browsers recover from it unpredictably. The row opens the live
 * site (or the repo when there is none), the trailing mark opens the code.
 *
 * @param {object} props
 * @param {object} props.project A card from `toProjectCard`.
 */
export function ProjectRow({ project }) {
  return (
    <li className="project-row">
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
  );
}
