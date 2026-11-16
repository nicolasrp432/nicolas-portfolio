import { useRef } from 'react';
import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ScrollTrigger } from '../lib/gsap';
import { useSectionLayoutRefresh } from '../hooks/useSectionLayoutRefresh';

function Page() {
  const ref = useRef(null);
  useSectionLayoutRefresh(ref);
  return <><section id="hero" /><section id="projects" ref={ref}><div id="card" /></section><section id="footer" /></>;
}

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('project layout changes', () => {
  it('remeasures affected content without restarting the hero or moving the page', () => {
    let resized;
    let height = 500;
    let pending;
    const disconnect = vi.fn();
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback) { resized = callback; }
      observe() {}
      disconnect = disconnect;
    });
    vi.stubGlobal('requestAnimationFrame', vi.fn(callback => { pending = callback; return 1; }));
    const cancel = vi.fn();
    vi.stubGlobal('cancelAnimationFrame', cancel);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({ height }));
    const globalRefresh = vi.spyOn(ScrollTrigger, 'refresh').mockImplementation(() => {});
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { unmount } = render(<Page />);
    const triggers = ['hero', 'projects', 'card', 'footer'].map(id => ({
      trigger: document.getElementById(id), refresh: vi.fn(),
    }));
    vi.spyOn(ScrollTrigger, 'getAll').mockReturnValue(triggers);

    act(() => resized());
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    height = 700;
    act(() => { resized(); pending(); });
    expect(triggers[0].refresh).not.toHaveBeenCalled();
    triggers.slice(1).forEach(trigger => expect(trigger.refresh).toHaveBeenCalledOnce());
    expect(globalRefresh).not.toHaveBeenCalled();
    expect(scroll).not.toHaveBeenCalled();

    // Card changes that retain the same height need no layout work.
    act(() => resized());
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(cancel).toHaveBeenLastCalledWith(1);
  });
});
