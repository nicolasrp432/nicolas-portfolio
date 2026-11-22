import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpecialtyPage from '../SpecialtyPage';
import { MotionStory } from '../components/ui/MotionStory';
import { specialties } from '../data/specialties';
import { curatedProjects, toProjectCard } from '../data/projects';

const player = vi.hoisted(() => ({
  playSegments: vi.fn(), goToAndStop: vi.fn(), resetSegments: vi.fn(),
  play: vi.fn(), pause: vi.fn(), destroy: vi.fn(),
  addEventListener: vi.fn((name, callback) => { if (name === 'DOMLoaded') queueMicrotask(callback); }),
}));
vi.mock('lottie-web/build/player/lottie_light', () => ({ default: { loadAnimation: () => player } }));

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.unstubAllGlobals());

describe('specialty pages', () => {
  for (const specialty of specialties) it(`${specialty.id}: keeps real work, page navigation and tailored contact connected`, () => {
    const { container } = render(<SpecialtyPage specialty={specialty} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const nav = within(screen.getByRole('navigation', { name: 'Especialidades' }));
    specialties.forEach(s => expect(nav.getByRole('link', { name: s.short, exact: false })).toHaveAttribute('href', s.path));
    expect(nav.getByRole('link', { name: specialty.short, exact: false })).toHaveAttribute('aria-current', 'page');
    const contact = screen.getByRole('link', { name: 'Hablemos por WhatsApp' });
    expect(new URL(contact.href).searchParams.get('text')).toBe(specialty.message);
    expect(container.querySelectorAll('.work-case')).toHaveLength(specialty.projects.length);
    specialty.projects.forEach(slug => {
      const raw = curatedProjects.find(p => p.slug === slug);
      const project = toProjectCard(raw, curatedProjects.indexOf(raw));
      const card = container.querySelector(`#caso-${slug.toLowerCase()}`);
      expect(within(card).getByRole('link', { name: `Ver código de ${project.title}` })).toHaveAttribute('href', project.repoUrl);
      if (!project.liveUrl) expect(within(card).queryByRole('link', { name: `Explorar ${project.title}` })).toBeNull();
    });
    if (specialty.id === 'motion') expect(screen.getByText(/Un estudio original creado para este portfolio/)).toBeInTheDocument();
  });
});

describe('motion story', () => {
  async function loadStory() {
    vi.stubGlobal('IntersectionObserver', undefined);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));
    const result = render(<MotionStory />);
    await waitFor(() => expect(player.playSegments).toHaveBeenCalledWith([0, 60], true));
    return result;
  }

  it('pauses without jumping and resumes the same segment', async () => {
    await loadStory();
    await userEvent.click(screen.getByRole('button', { name: 'Pausar animación' }));
    expect(player.pause).toHaveBeenCalled();
    expect(player.goToAndStop).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Activar animación' }));
    expect(player.play).toHaveBeenCalled();
  });

  it('keeps a new chapter still when paused and releases its renderer on unmount', async () => {
    const { unmount } = await loadStory();
    await userEvent.click(screen.getByRole('button', { name: 'Pausar animación' }));
    await userEvent.click(screen.getByRole('button', { name: 'Una huella.' }));
    expect(player.resetSegments).toHaveBeenCalledWith(true);
    expect(player.goToAndStop).toHaveBeenCalledWith(179, true);
    expect(screen.getByRole('button', { name: 'Una huella.' })).toHaveAttribute('aria-pressed', 'true');
    unmount();
    expect(player.destroy).toHaveBeenCalledOnce();
  });

  it('keeps the narrative and poster available when the animation cannot load', async () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const { container } = render(<MotionStory />);
    await act(async () => {});
    expect(container.querySelector('.motion-poster')).toBeInTheDocument();
    expect(container.querySelector('[data-ready]')).toBeNull();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });

  it('shows static chapter frames when reduced motion is requested', async () => {
    vi.stubGlobal('matchMedia', query => ({ matches: query.includes('reduced-motion'), addEventListener() {}, removeEventListener() {} }));
    vi.stubGlobal('IntersectionObserver', undefined);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));
    render(<MotionStory />);
    await waitFor(() => expect(player.goToAndStop).toHaveBeenCalledWith(59, true));
    expect(player.playSegments).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Pausar animación' })).toBeDisabled();
  });
});
