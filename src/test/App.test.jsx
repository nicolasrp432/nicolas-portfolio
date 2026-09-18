import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { CopyEmail } from '../components/ui/CopyEmail';
import { SplitHeadline } from '../components/motion/SplitHeadline';
import { toProjectCard } from '../data/projects';

beforeEach(() => {
  // Keep the intro curtain out of the way and the GitHub call off the network.
  sessionStorage.setItem('nr:intro-seen', '1');
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

  it('falls back to the curated project when GitHub is unreachable', async () => {
    await renderSettled();

    const projects = document.getElementById('proyectos');
    expect(within(projects).getByRole('heading', { name: /portfolio editorial/i })).toBeInTheDocument();
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

describe('toProjectCard', () => {
  it('prefers the curated copy over the raw GitHub description', () => {
    const card = toProjectCard(
      { name: 'nicolas-portfolio', description: 'raw text', html_url: '#', pushed_at: '2025-01-01' },
      0,
    );

    expect(card.title).toBe('Portfolio editorial');
    expect(card.summary).not.toBe('raw text');
    expect(card.index).toBe('01');
  });

  it('humanises an unknown repo name and keeps its own description', () => {
    const card = toProjectCard(
      { name: 'mi-app-genial', description: 'Una app', html_url: '#', language: 'TypeScript', topics: ['react'] },
      4,
    );

    expect(card.title).toBe('mi app genial');
    expect(card.summary).toBe('Una app');
    expect(card.tags).toEqual(['TypeScript', 'react']);
    expect(card.index).toBe('05');
  });
});
