import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { caseNotes } from '../../data/specialties';
import { projectArtwork } from '../../lib/projectArtwork';

export function WorkCase({ project, index }) {
  const note = caseNotes[project.slug];
  return <article className="work-case" id={`caso-${project.slug.toLowerCase()}`}>
    <div className="work-case-plate" style={{ backgroundImage: `url("${projectArtwork(project)}")` }}>
      <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {note.type}</span>
      <h3>{project.title}</h3>
      <span className="work-case-kind">{project.kind}</span>
    </div>
    <div className="work-case-copy">
      <dl><div><dt>El punto de partida</dt><dd>{note.need}</dd></div>
        <div><dt>La respuesta</dt><dd>{note.response}</dd></div></dl>
      <ul className="tag-row" aria-label={`Tecnologías de ${project.title}`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="project-links">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Explorar {project.title} <FiArrowUpRight aria-hidden="true" /></a>}
        <a href={project.repoUrl} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> Ver código de {project.title}</a>
      </div>
    </div>
  </article>;
}
