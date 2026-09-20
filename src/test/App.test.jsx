import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { CopyEmail } from '../components/ui/CopyEmail';
import { SplitHeadline } from '../components/motion/SplitHeadline';
import { curatedProjects, toProjectCard } from '../data/projects';

beforeEach(() => {
  // Keep the GitHub call off the network; the page itself needs no priming.
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
});

afterEach(() => {
  vi.unstubAllGlobals();
  sessionStorage.clear();
});

/** The GitHub call settles after the first paint; awaiting it keeps React
 *  from warning about a state update outside `act()`. */
const renderSettled = async () => {
  const utils = render(<App />);
  await screen.findByRole('heading', { name: /portfolio editorial/i });
  return utils;
};

describe('App', () => {
  it('renders the five chapters as landmarks a reader can reach', async () => {
    await renderSettled();

    expect(screen.getByRole('main')).toBeInTheDocument();
    ['proyectos', 'perfil', 'herramientas', 'ruta', 'contacto'].forEach((id) => {
      expect(document.getElementById(id)).toBeInTheDocument();
    });
  });

  it('exposes the hero headline as one readable sentence, not loose letters', async () => {
    await renderSettled();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Construyo ideas que se sienten claras.' }),
    ).toBeInTheDocument();
  });

  it('offers a skip link before any other focusable element', async () => {
    await renderSettled();
    await userEvent.tab();

    expect(screen.getByRole('link', { name: /saltar al contenido/i })).toHaveFocus();
  });

  it('renders the whole curated list even with GitHub unreachable', async () => {
    await renderSettled();

    const section = document.getElementById('proyectos');
    // The list is curated data, not an API response: losing the network costs
    // freshness (year, stars, language), never a project.
    curatedProjects.forEach((project) => {
      // A featured project prints its title twice — once on the plate, once as
      // the card heading — so this counts occurrences rather than demanding one.
      expect(within(section).getAllByText(project.title).length, project.slug).toBeGreaterThan(0);
    });
  });

  it('splits the list into featured cards and index rows', async () => {
    await renderSettled();

    const section = document.getElementById('proyectos');
    const featured = curatedProjects.filter((project) => project.featured);

    expect(section.querySelectorAll('.project-card')).toHaveLength(featured.length);
    expect(section.querySelectorAll('.project-row')).toHaveLength(
      curatedProjects.length - featured.length,
    );
  });
});

describe('SplitHeadline', () => {
  it('hides the split characters from assistive technology', () => {
    const { container } = render(
      <SplitHeadline lines={[[{ text: 'Hola' }]]} autoAnimate={false} />,
    );

    expect(container.querySelectorAll('.split-char')).toHaveLength(4);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hola' })).toBeInTheDocument();
  });

  it('keeps each word in one unbreakable box', () => {
    const { container } = render(
      <SplitHeadline lines={[[{ text: 'dos palabras' }]]} autoAnimate={false} />,
    );

    const words = container.querySelectorAll('.split-word');
    expect(words).toHaveLength(2);
    expect(words[0]).toHaveTextContent('dos');
    expect(words[1]).toHaveTextContent('palabras');

    // Characters are inline-block, so without the word boxes the line could
    // break anywhere — including inside a word. The space between words has
    // to survive as the one real break opportunity.
    expect(container.querySelector('.split-part')).toHaveTextContent('dos palabras');
  });
});

describe('CopyEmail', () => {
  it('copies the address and announces the result politely', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });

    render(<CopyEmail email="hola@ejemplo.com" />);
    await userEvent.click(screen.getByRole('button', { name: /copiar/i }));

    expect(writeText).toHaveBeenCalledWith('hola@ejemplo.com');
    expect(await screen.findByRole('status')).toHaveTextContent(/copiado/i);
  });

  it('still offers a mailto link for people who want their mail client', () => {
    render(<CopyEmail email="hola@ejemplo.com" />);

    expect(screen.getByRole('link', { name: 'hola@ejemplo.com' })).toHaveAttribute(
      'href',
      'mailto:hola@ejemplo.com',
    );
  });
});

describe('the curated project list', () => {
  it('gives every project the fields the cards read', () => {
    curatedProjects.forEach((project) => {
      expect(project.slug, `${project.slug}: slug`).toBeTruthy();
      expect(project.title, `${project.slug}: title`).toBeTruthy();
      expect(project.kind, `${project.slug}: kind`).toBeTruthy();
      expect(project.tags?.length, `${project.slug}: tags`).toBeGreaterThan(0);
      // Copy is written by hand because almost none of these repos carry a
      // usable description on GitHub. A short one is a placeholder nobody
      // replaced.
      expect(project.summary?.length, `${project.slug}: summary`).toBeGreaterThan(30);
    });
  });

  it('has no duplicate entries', () => {
    const slugs = curatedProjects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('toProjectCard', () => {
  it('never lets live repo data overwrite the curated copy', () => {
    const project = curatedProjects[0];
    const card = toProjectCard(project, 0, {
      name: project.slug,
      language: 'Brainfuck',
      description: 'raw text nobody wrote for a portfolio',
      pushed_at: '2026-01-01T00:00:00Z',
      stargazers_count: 7,
    });

    expect(card.title).toBe(project.title);
    expect(card.summary).toBe(project.summary);
    expect(card.tags).toEqual(project.tags);

    // Only what actually changes over time comes from the API.
    expect(card.year).toBe('2026');
    expect(card.stars).toBe(7);
    expect(card.language).toBe('Brainfuck');
  });

  it('keeps the curated values when no repo was fetched', () => {
    const project = curatedProjects[0];
    const card = toProjectCard(project, 0, undefined);

    expect(card.year).toBe(project.year);
    expect(card.stars).toBe(0);
    expect(card.index).toBe('01');
  });

  it('builds the repo URL from the owner when the project is not mine', () => {
    const team = curatedProjects.find((project) => project.owner);
    expect(team, 'expected at least one project owned by a collaborator').toBeDefined();

    expect(toProjectCard(team, 4).repoUrl).toBe(`https://github.com/${team.owner}/${team.slug}`);
  });
});
