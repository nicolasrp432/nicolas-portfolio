import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({ renderers: [], environments: [], objects: [], failEnvironment: false }));
vi.mock('three', async importOriginal => {
  const actual = await importOriginal();
  return { ...actual,
    WebGLRenderer: class {
      constructor() {
        this.domElement = document.createElement('canvas');
        for (const name of ['setClearColor', 'setPixelRatio', 'setSize', 'render', 'dispose']) this[name] = vi.fn();
        state.renderers.push(this);
      }
    },
    PMREMGenerator: class {
      dispose = vi.fn();
      fromScene() {
        if (state.failEnvironment) throw new Error('Environment failed');
        const environment = { texture: {}, dispose: vi.fn() }; state.environments.push(environment); return environment;
      }
    },
  };
});
vi.mock('../lib/three/journeyObjects', async () => {
  const { Group } = await import('three');
  return { createJourneyObjects() {
    const objects = { root: new Group(), update: vi.fn(), dispose: vi.fn() }; state.objects.push(objects); return objects;
  } };
});
import { createJourneyScene } from '../lib/three/journeyScene';

let frames, resizeObserver, intersectionObserver, host, width;
beforeEach(() => {
  state.renderers = []; state.environments = []; state.objects = []; state.failEnvironment = false;
  frames = new Map(); let nextFrame = 0;
  vi.stubGlobal('requestAnimationFrame', vi.fn(callback => { frames.set(++nextFrame, callback); return nextFrame; }));
  vi.stubGlobal('cancelAnimationFrame', vi.fn(id => frames.delete(id)));
  vi.stubGlobal('ResizeObserver', class { constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); resizeObserver = this; } observe() {} });
  vi.stubGlobal('IntersectionObserver', class { constructor(callback) { this.callback = callback; this.disconnect = vi.fn(); intersectionObserver = this; } observe() {} });
  vi.stubGlobal('devicePixelRatio', 3);
  width = 1200; host = document.createElement('div');
  Object.defineProperties(host, { clientWidth: { get: () => width }, clientHeight: { value: 800 } });
  document.body.appendChild(host);
});
afterEach(() => { host.remove(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
function flush() { const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback()); }

describe('atlas single-canvas lifecycle', () => {
  it('coalesces updates, renders on demand, caps DPR and releases all scene ownership', () => {
    const engine = createJourneyScene(host), renderer = state.renderers[0];
    expect(host.querySelectorAll('canvas')).toHaveLength(1);
    expect(renderer.domElement.style.pointerEvents).toBe('none');
    expect(renderer.setPixelRatio).toHaveBeenLastCalledWith(1.25);
    engine.update(1); engine.update(2); expect(frames.size).toBe(1); flush();
    expect(renderer.render).toHaveBeenCalledOnce(); expect(frames.size).toBe(0);
    expect(state.objects[0].update).toHaveBeenLastCalledWith(2, 2.5);
    width = 390; resizeObserver.callback(); flush(); expect(renderer.setPixelRatio).toHaveBeenLastCalledWith(1);
    intersectionObserver.callback([{ isIntersecting: false }]); engine.update(3); expect(frames.size).toBe(0);
    intersectionObserver.callback([{ isIntersecting: true }]); flush(); expect(state.objects[0].update).toHaveBeenLastCalledWith(3, 3.8);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true); engine.update(1); expect(frames.size).toBe(0);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false); document.dispatchEvent(new Event('visibilitychange')); expect(frames.size).toBe(1);
    engine.dispose(); engine.dispose(); engine.update(2); document.dispatchEvent(new Event('visibilitychange'));
    expect(frames.size).toBe(0); expect(host.children).toHaveLength(0);
    for (const owner of [renderer, state.objects[0], state.environments[0]]) expect(owner.dispose).toHaveBeenCalledOnce();
    expect(resizeObserver.disconnect).toHaveBeenCalledOnce(); expect(intersectionObserver.disconnect).toHaveBeenCalledOnce();
  });

  it('falls back and cleans up immediately on context loss', () => {
    const error = vi.fn(), engine = createJourneyScene(host, error), renderer = state.renderers[0];
    const lost = new Event('webglcontextlost', { cancelable: true }); renderer.domElement.dispatchEvent(lost);
    expect(lost.defaultPrevented).toBe(true); expect(error).toHaveBeenCalledOnce();
    expect(frames.size).toBe(0); expect(host.children).toHaveLength(0);
    engine.dispose(); expect(renderer.dispose).toHaveBeenCalledOnce(); expect(state.objects[0].dispose).toHaveBeenCalledOnce();
  });

  it('removes a partially initialized canvas if environment setup fails', () => {
    state.failEnvironment = true;
    expect(() => createJourneyScene(host)).toThrow('Environment failed');
    expect(host.children).toHaveLength(0); expect(state.renderers[0].dispose).toHaveBeenCalledOnce();
  });
});
