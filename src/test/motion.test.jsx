import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

/**
 * The default test environment reports `prefers-reduced-motion: reduce`, which
 * means every `gsap.matchMedia` block is skipped and none of the animation code
 * ever executes. These tests flip that: `matchMedia` answers "yes" to the
 * motion query so the real timelines, ScrollTriggers and pinned sections are
 * built. jsdom has no layout engine, so nothing visual is asserted — the point
 * is to catch malformed tweens, bad selectors and teardown errors, which would
 * otherwise only surface in a browser.
 */
const stubMatchMedia = (predicate) => {
  vi.stubGlobal('matchMedia', (query) => ({
    matches: predicate(query),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));
};

/** A desktop machine with a mouse and no motion preference. */
const enableMotion = () =>
  stubMatchMedia(
    (query) =>
      query.includes('no-preference') || query.includes('min-width') || query.includes('hover'),
  );

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
  enableMotion();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('with animations enabled', () => {
  it('resolves every animation target it is given', async () => {
    const noise = [];
    const warn = vi.spyOn(console, 'warn').mockImplementation((...args) => noise.push(args.join(' ')));
    const error = vi.spyOn(console, 'error').mockImplementation((...args) => noise.push(args.join(' ')));

    render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    // GSAP reports an unmatched selector as "Element not found" rather than
    // throwing, so a broken trigger is otherwise completely silent. This
    // caught three sections whose ScrollTrigger pointed at their own scope
    // root, where scoped selectors only ever match descendants.
    expect(noise.filter((line) => line.includes('not found'))).toEqual([]);

    warn.mockRestore();
    error.mockRestore();
  });

  it('shows the page immediately, with no curtain holding the scroll', async () => {
    render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
    expect(document.body.dataset.scrollLocked).toBeUndefined();
    expect(screen.getByRole('heading', { level: 1 })).toBeVisible();
  });

  it('tears every animation down cleanly on unmount', async () => {
    const { unmount } = render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    expect(() => unmount()).not.toThrow();
    expect(document.body.dataset.scrollLocked).toBeUndefined();
  });

  it('mounts the custom cursor only where a fine pointer exists', async () => {
    const { container, unmount } = render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });
    expect(container.querySelector('.cursor-layer')).toBeInTheDocument();
    unmount();

    // Coarse pointer (touch): the hover query no longer matches.
    stubMatchMedia((query) => query.includes('no-preference'));

    const touch = render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });
    expect(touch.container.querySelector('.cursor-layer')).not.toBeInTheDocument();
  });
});

describe('the mobile menu', () => {
  it('renders its panel outside the masthead so `inset` resolves to the viewport', async () => {
    const { container } = render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    await userEvent.click(screen.getByRole('button', { name: /abrir navegación/i }));

    const panel = await screen.findByRole('dialog', { name: /navegación/i });
    expect(panel).toBeInTheDocument();
    // The regression this guards: the masthead carries `backdrop-filter`, which
    // makes it a containing block for fixed children. A panel nested inside it
    // is sized against an 86px bar and collapses to nothing on a phone.
    expect(container.querySelector('.masthead')).not.toContainElement(panel);
  });

  it('locks the page while open and releases it on close', async () => {
    render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    await userEvent.click(screen.getByRole('button', { name: /abrir navegación/i }));
    expect(document.body.dataset.scrollLocked).toBe('true');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(document.body.dataset.scrollLocked).toBeUndefined());
  });

  it('offers a close control inside the panel, where focus is trapped', async () => {
    render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    await userEvent.click(screen.getByRole('button', { name: /abrir navegación/i }));
    const panel = await screen.findByRole('dialog', { name: /navegación/i });

    const close = within(panel).getByRole('button', { name: /cerrar navegación/i });
    await userEvent.click(close);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
