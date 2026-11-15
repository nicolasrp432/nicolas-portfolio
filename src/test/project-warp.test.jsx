import { ProjectCard } from '../components/ui/ProjectCard';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectWarpGallery } from '../components/ui/project-warp-gallery';
import { curatedProjects, toProjectCard } from '../data/projects';

const projects = curatedProjects.map((p, i) => toProjectCard(p, i));
const detail = () => within(screen.getByRole('article', { name: 'Proyecto seleccionado' }));

describe('project warp gallery', () => {
  it('retains the same list artwork when a filter changes the carousel position', () => {
    const project = projects[3];
    const { container } = render(<><ul><ProjectCard project={project} tone={0} /></ul><ProjectWarpGallery projects={[project]} /></>);
    const artwork = container.querySelector('.project-artwork').getAttribute('src');
    expect(container.querySelector('.project-warp-static').style.backgroundImage).toContain(artwork);
  });

  it('keeps real project links usable before the renderer loads', () => {
    render(<ProjectWarpGallery projects={projects} />);
    expect(detail().getByRole('link', { name: `Visitar ${projects[0].title}` })).toHaveAttribute('href', projects[0].liveUrl);
    expect(detail().getByRole('link', { name: `Código de ${projects[0].title}` })).toHaveAttribute('href', projects[0].repoUrl);
    expect(screen.queryByRole('region', { name: 'Girar los proyectos' })).not.toBeInTheDocument();
    expect(within(screen.getByRole('group', { name: 'Elegir proyecto' })).getAllByRole('button')).toHaveLength(projects.length);
  });

  it('keeps rapid navigation, keyboard selection and links synchronized', async () => {
    render(<ProjectWarpGallery projects={projects} />);
    const user = userEvent.setup();
    const next = screen.getByRole('button', { name: 'Proyecto siguiente' });
    await user.click(next); await user.click(next);
    expect(detail().getByRole('heading')).toHaveTextContent(projects[2].title);
    await user.keyboard('{End}');
    expect(detail().getByRole('heading')).toHaveTextContent(projects.at(-1).title);
    await user.click(next);
    expect(detail().getByRole('heading')).toHaveTextContent(projects[0].title);
    expect(detail().getByRole('link', { name: `Visitar ${projects[0].title}` })).toHaveAttribute('href', projects[0].liveUrl);
  });

  it('does not invent a live destination for repository-only projects', async () => {
    render(<ProjectWarpGallery projects={projects} />);
    const project = projects.find(p => !p.liveUrl);
    await userEvent.click(screen.getByRole('button', { name: project.title, exact: true }));
    expect(detail().queryByRole('link', { name: /visitar/i })).not.toBeInTheDocument();
    expect(detail().getByRole('link', { name: `Código de ${project.title}` })).toHaveAttribute('href', project.repoUrl);
  });

  it('provides static artwork with reduced motion and still allows selection', async () => {
    const media = vi.spyOn(window, 'matchMedia').mockImplementation(query => ({matches:query.includes('reduce'), addEventListener:()=>{},removeEventListener:()=>{}}));
    try {
      render(<ProjectWarpGallery projects={projects.slice(0, 1)} />);
      expect(screen.getByRole('button', { name: 'Proyecto siguiente' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Proyecto anterior' })).toBeDisabled();
      expect(detail().getByRole('heading')).toHaveTextContent(projects[0].title);
      expect(document.querySelector('canvas')).not.toBeInTheDocument();
    } finally { media.mockRestore(); }
  });
});
