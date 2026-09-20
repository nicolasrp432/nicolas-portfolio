import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import EducationPage from '../EducationPage';
import { schools, educationProjects, certificates } from '../data/education';
import { curatedProjects } from '../data/projects';
import { navLinks, chapters } from '../data/site';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
});

afterEach(() => {
  vi.unstubAllGlobals();
  sessionStorage.clear();
});

/**
 * Records whether React cancelled a click, from a listener on `document` —
 * above React's root container, so it runs after React's delegated handler.
 */
async function clickAndReport(element) {
  let prevented = null;
  const spy = (event) => {
    prevented = event.defaultPrevented;
    // jsdom cannot navigate; cancelling here keeps the console clean.
    event.preventDefault();
  };
  document.addEventListener('click', spy);
  await userEvent.click(element);
  document.removeEventListener('click', spy);
  return prevented;
}

describe('cross-page navigation', () => {
  it('lets the education link actually navigate', async () => {
    render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    const nav = screen.getByRole('navigation', { name: /navegación principal/i });
    const link = within(nav).getByRole('link', { name: /educación/i });
    expect(link).toHaveAttribute('href', '/educacion/');

    // The regression: `goTo` used to call preventDefault() unconditionally and
    // only look for the target in a later frame, so a link to another document
    // was cancelled and nothing replaced it — the click did nothing at all.
    expect(await clickAndReport(link)).toBe(false);
  });

  it('still intercepts in-page chapter links', async () => {
    render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    const nav = screen.getByRole('navigation', { name: /navegación principal/i });
    const link = within(nav).getByRole('link', { name: /proyectos/i });

    expect(await clickAndReport(link)).toBe(true);
  });

  it('keeps the rail and the scroll spy on home chapters only', () => {
    expect(chapters).toHaveLength(5);
    expect(chapters.every((link) => link.index)).toBe(true);
    expect(chapters.some((link) => link.href)).toBe(false);
    // The numbering has to stay contiguous once a page link joins the navbar.
    expect(chapters.map((link) => link.index)).toEqual(['01', '02', '03', '04', '05']);
    expect(navLinks).toHaveLength(6);
  });

  it('points chapter links back at the home page from elsewhere', () => {
    render(<EducationPage />);

    const nav = screen.getByRole('navigation', { name: /navegación principal/i });
    expect(within(nav).getByRole('link', { name: /proyectos/i })).toHaveAttribute(
      'href',
      '/#proyectos',
    );
    expect(within(nav).getByRole('link', { name: /educación/i })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });
});

describe('the education page', () => {
  it('renders every project, grouped under its school', () => {
    render(<EducationPage />);

    schools.forEach((school) => {
      const section = document.getElementById(`escuela-${school.id}`);
      expect(section, school.id).toBeInTheDocument();

      educationProjects
        .filter((project) => project.school === school.id)
        .forEach((project) => {
          expect(within(section).getAllByText(project.title).length, project.slug).toBeGreaterThan(0);
        });
    });
  });

  it('uses the same two registers as the home page', () => {
    const { container } = render(<EducationPage />);

    const featured = educationProjects.filter((project) => project.featured);
    expect(container.querySelectorAll('.project-card')).toHaveLength(featured.length);
    expect(container.querySelectorAll('.project-row')).toHaveLength(
      educationProjects.length - featured.length,
    );
  });

  it('offers a way back to the portfolio', () => {
    render(<EducationPage />);
    expect(screen.getByRole('link', { name: /volver al portfolio/i })).toHaveAttribute('href', '/');
  });
});

describe('the education data', () => {
  it('gives every project the fields the cards read', () => {
    const ids = schools.map((school) => school.id);

    educationProjects.forEach((project) => {
      expect(ids, `${project.slug}: school`).toContain(project.school);
      expect(project.title, `${project.slug}: title`).toBeTruthy();
      expect(project.kind, `${project.slug}: kind`).toBeTruthy();
      expect(project.tags?.length, `${project.slug}: tags`).toBeGreaterThan(0);
      expect(project.summary?.length, `${project.slug}: summary`).toBeGreaterThan(30);
    });
  });

  it('has no duplicates and does not repeat a client project', () => {
    const slugs = educationProjects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    const client = new Set(curatedProjects.map((project) => project.slug));
    slugs.forEach((slug) => expect(client.has(slug), `${slug} está en las dos listas`).toBe(false));
  });

  it('moved the 42 maze generator out of the client work', () => {
    expect(curatedProjects.map((project) => project.slug)).not.toContain('A-mazing');
    expect(educationProjects.map((project) => project.slug)).toContain('A-mazing');
  });

  it('requires every certificate to be checkable', () => {
    certificates.forEach((certificate) => {
      expect(certificate.id, 'id').toBeTruthy();
      expect(certificate.title, 'title').toBeTruthy();
      expect(certificate.issuer, 'issuer').toBeTruthy();
      // A certification nobody can check is a claim, not a certification.
      expect(
        Boolean(certificate.verifyUrl || certificate.file),
        `${certificate.id}: necesita verifyUrl o file`,
      ).toBe(true);
    });
  });
});
