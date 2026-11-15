import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useMediaQuery';

/** How much of the stage's height the piece occupies; the CSS inset mirrors it. */
const FILL = 0.84;

/**
 * A cut-out image that turns liquid under the pointer.
 *
 * The static `<img>` is the component: it is what renders without JS, without
 * WebGL2, in jsdom and before the engine arrives. The particle engine is an
 * enhancement layered on top — it is fetched only when the stage approaches
 * the viewport, draws the same image into a canvas at the same rect, and only
 * then is the `<img>` faded out (`data-gl="on"`). If anything fails, the image
 * simply stays.
 *
 * The stage background must be a flat token colour: the engine blends its
 * particles against it, read from `--sculpture-bg`.
 */
export function LiquidSculpture({ src, alt, width, height, className = '', children }) {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (reducedMotion || !root || typeof IntersectionObserver === 'undefined' || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    let disposed = false;
    let teardown = () => {};

    const start = async () => {
      let mod;
      try {
        mod = await import('../../lib/liquidEngine');
      } catch {
        return;
      }
      if (disposed) return;

      const { LiquidEngine, hexToRgb } = mod;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      const bg = hexToRgb(getComputedStyle(root).getPropertyValue('--sculpture-bg').trim(), [0.9, 0.88, 0.84]);

      // A fresh canvas per engine: a released WebGL context can never be reused.
      const canvas = document.createElement('canvas');
      canvas.className = 'sculpture-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      root.prepend(canvas);

      const fail = () => {
        root.dataset.gl = 'off';
      };

      let engine;
      try {
        engine = new LiquidEngine(
          canvas,
          {
            interactive: true,
            strength: 1,
            radius: 190,
            density: 1,
            dotSize: 1,
            spread: 1,
            turbulence: 1,
            liquid: 1,
            streaks: true,
            restStyle: 'image',
            returnSpeed: 1,
            ambient: false,
            ambientIntensity: 1,
            speed: 1,
            intro: false,
            reducedMotion: reduced.matches,
            bg,
            imgBg: null,
          },
          fail,
        );
      } catch {
        canvas.remove();
        fail();
        return;
      }

      let aspect = width / height;
      const relayout = () => {
        const w = root.clientWidth;
        const h = root.clientHeight;
        // Contain the piece in the same box the CSS gives the <img>.
        let rh = h * FILL;
        let rw = rh * aspect;
        if (rw > w) {
          rw = w;
          rh = rw / aspect;
        }
        engine.resize(w, h, { x: (w - rw) / 2, y: (h - rh) / 2, w: rw, h: rh });
      };

      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        if (disposed) return;
        aspect = image.naturalWidth / image.naturalHeight || aspect;
        try {
          engine.onFirstFrame = () => {
            if (!disposed && root.dataset.gl !== 'off') root.dataset.gl = 'on';
          };
          engine.setImage(image);
          relayout();
        } catch {
          fail();
        }
      };
      image.src = src;

      const ro = new ResizeObserver(relayout);
      ro.observe(root);
      let inView = false;
      const visibility = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
          engine.setVisible(inView && !document.hidden && !reduced.matches);
        });
      });
      visibility.observe(root);
      const onHidden = () => engine.setVisible(inView && !document.hidden && !reduced.matches);
      document.addEventListener('visibilitychange', onHidden);
      const onMotion = () => {
        engine.setOptions({ reducedMotion: reduced.matches });
        onHidden();
      };
      reduced.addEventListener?.('change', onMotion);

      const send = (type) => (event) => {
        const touch = event.pointerType === 'touch';
        if (type === 'move' && touch && event.buttons === 0 && event.pressure === 0) return;
        const box = root.getBoundingClientRect();
        engine.pointer(type, event.clientX - box.left, event.clientY - box.top, touch);
        if (type !== 'leave' && type !== 'up') root.dataset.touched = '1';
      };
      const handlers = {
        pointermove: send('move'),
        pointerdown: send('down'),
        pointerup: send('up'),
        pointercancel: send('up'),
        pointerleave: send('leave'),
      };
      Object.entries(handlers).forEach(([name, fn]) => root.addEventListener(name, fn, { passive: true }));

      teardown = () => {
        ro.disconnect();
        visibility.disconnect();
        document.removeEventListener('visibilitychange', onHidden);
        reduced.removeEventListener?.('change', onMotion);
        Object.entries(handlers).forEach(([name, fn]) => root.removeEventListener(name, fn));
        image.onload = null;
        engine.destroy();
        canvas.remove();
        delete root.dataset.gl;
      };
    };

    // Fetch the engine a screen early, not on page load.
    const approach = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          approach.disconnect();
          start();
        }
      },
      { rootMargin: '600px 0px' },
    );
    approach.observe(root);

    return () => {
      disposed = true;
      approach.disconnect();
      teardown();
    };
  }, [src, width, height, reducedMotion]);

  return (
    <div className={`sculpture ${className}`.trim()} ref={rootRef}>
      <img
        className="sculpture-img"
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      {children}
    </div>
  );
}
