import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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
  sessionStorage.clear();
});

describe('with animations enabled', () => {
  it('resolves every animation target it is given', async () => {
    const noise = [];
    const warn = vi.spyOn(console, 'warn').mockImplementation((...args) => noise.push(args.join(' ')));
    const error = vi.spyOn(console, 'error').mockImplementation((...args) => noise.push(args.join(' ')));

    render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    // The preloader owns the viewport and says so to assistive tech.
    expect(screen.getByText(/cargando el portfolio/i)).toBeInTheDocument();
    expect(document.body.dataset.scrollLocked).toBe('true');

    // GSAP reports an unmatched selector as "Element not found" rather than
    // throwing, so a broken trigger is otherwise completely silent. This
    // caught three sections whose ScrollTrigger pointed at their own scope
    // root, where scoped selectors only ever match descendants.
    expect(noise.filter((line) => line.includes('not found'))).toEqual([]);

    warn.mockRestore();
    error.mockRestore();
  });

  it('tears every animation down cleanly on unmount', async () => {
    const { unmount } = render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    expect(() => unmount()).not.toThrow();
    // The scroll lock must not outlive the component that set it.
    expect(document.body.dataset.scrollLocked).toBeUndefined();
  });

  it('skips the intro on a second visit in the same tab', async () => {
    sessionStorage.setItem('nr:intro-seen', '1');

    render(<App />);
    await screen.findByRole('heading', { name: /portfolio editorial/i });

    expect(screen.queryByText(/cargando el portfolio/i)).not.toBeInTheDocument();
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

describe('the intro curtain', () => {
  it('lifts on its own and hands the page back to the reader', async () => {
    render(<App />);

    expect(screen.getByText(/cargando el portfolio/i)).toBeInTheDocument();

    // GSAP is driven by requestAnimationFrame, which fake timers do not
    // advance, so this waits in real time for the ~1.7s timeline to finish.
    await waitFor(() => expect(screen.queryByText(/cargando el portfolio/i)).toBeNull(), {
      timeout: 6000,
    });

    expect(document.body.dataset.scrollLocked).toBeUndefined();
    expect(sessionStorage.getItem('nr:intro-seen')).toBe('1');
  }, 10000);
});
