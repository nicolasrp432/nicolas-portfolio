import '@testing-library/jest-dom/vitest';

// jsdom has no layout engine, so the GSAP/ScrollTrigger and IntersectionObserver
// APIs the UI relies on need stand-ins before any component mounts.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
window.IntersectionObserver ??= IntersectionObserverStub;
window.scrollTo = window.scrollTo || (() => {});
