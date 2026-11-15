import { useEffect } from 'react';
import { useReducedMotion } from './useMediaQuery';

/** One liquid simulation shared by the sixteen facets of the hovered tile. */
export function useLiquidRibbon(ref, enabled) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = ref.current;
    if (!enabled || reduced || !root || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let active = null;
    let engine = null;
    let generation = 0;
    let timer;
    let point = null;
    const clear = () => {
      generation++;
      clearTimeout(timer); timer = undefined;
      if (engine) { engine.onDraw = null; engine.destroy(); engine = null; }
      active?.querySelectorAll('.ribbon-liquid-facet').forEach((canvas) => canvas.remove());
      if (active) delete active.dataset.liquidReady;
      active = null;
      delete root.dataset.liquidHover;
    };
    const send = () => {
      if (!engine || !active || !point) return;
      const slice = point.slice;
      const rect = slice.getBoundingClientRect();
      const count = active.children.length;
      const x = (Number(slice.dataset.slice) + Math.max(0, Math.min(1, (point.x - rect.left) / rect.width))) / count;
      engine.pointer('move', x * active.clientWidth, (point.y - rect.top) / rect.height * active.clientHeight, false);
    };
    const start = async (tile) => {
      clear();
      active = tile;
      root.dataset.liquidHover = 'true';
      const token = generation;
      try {
        const [{ LiquidEngine }, image] = await Promise.all([
          import('../lib/liquidEngine'),
          new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = tile.dataset.src;
          }),
        ]);
        if (token !== generation) return;
        const source = document.createElement('canvas');
        engine = new LiquidEngine(source, {
          interactive: true, strength: 1, radius: 120, density: .65, dotSize: 1,
          spread: 1, turbulence: 1, liquid: 1, streaks: true, restStyle: 'image',
          returnSpeed: 1, ambient: false, ambientIntensity: 1, speed: 1,
          intro: false, reducedMotion: false, preserveImage: true, bg: [.09, .086, .078], imgBg: null,
        }, clear);
        const facets = Array.from(tile.children, (slice) => {
          const canvas = document.createElement('canvas');
          canvas.className = 'ribbon-liquid-facet';
          slice.append(canvas);
          return { canvas, context: canvas.getContext('2d') };
        });
        if (facets.some(({ context }) => !context)) { clear(); return; }
        const w = tile.clientWidth;
        const h = tile.clientHeight;
        engine.resize(w, h, { x: 0, y: 0, w, h });
        // Copy before WebGL discards its drawing buffer. All facets receive
        // the same frame, so the moving liquid stays continuous around the arc.
        engine.onDraw = () => {
          if (token !== generation) return;
          const strip = source.width / facets.length;
          facets.forEach(({ canvas, context }, index) => {
            const width = Math.min(strip + source.width / w, source.width - index * strip);
            if (canvas.width !== Math.ceil(width) || canvas.height !== source.height) {
              canvas.width = Math.ceil(width);
              canvas.height = source.height;
            }
            context.drawImage(source, index * strip, 0, width, source.height, 0, 0, canvas.width, canvas.height);
          });
          tile.dataset.liquidReady = 'true';
        };
        engine.setImage(image);
        engine.setVisible(true);
        send();
      } catch { if (token === generation) clear(); }
    };
    const leave = () => {
      if (!active || timer) return;
      engine?.pointer('leave', 0, 0, false);
      timer = setTimeout(() => { timer = undefined; clear(); }, 1100);
    };
    const move = (event) => {
      if (event.pointerType === 'touch') return;
      const slice = event.target.closest('.tilted-grid-slice');
      const tile = slice?.closest('.tilted-grid-tile');
      if (!tile) { leave(); return; }
      clearTimeout(timer); timer = undefined;
      point = { x: event.clientX, y: event.clientY, slice };
      if (active !== tile) start(tile);
      else send();
    };
    const hidden = () => { if (document.hidden) clear(); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) clear(); });
    observer?.observe(root);
    root.addEventListener('pointermove', move, { passive: true });
    root.addEventListener('pointerleave', leave);
    window.addEventListener('resize', clear);
    document.addEventListener('visibilitychange', hidden);
    return () => {
      clear();
      observer?.disconnect();
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', leave);
      window.removeEventListener('resize', clear);
      document.removeEventListener('visibilitychange', hidden);
    };
  }, [ref, enabled, reduced]);
}
