import { useEffect, useRef } from 'react';

// The existing <N/> signature, drawn as paths so every browser uses the same shape.
const MARK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 60"><g fill="none" stroke="#e0431f" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 18 6 30l13 12M94 18l13 12-13 12M85 12 72 48"/></g><path fill="#252620" d="M29 46V14h8l19 22V14h8v32h-8L37 24v22z"/></svg>';
const MARK_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(MARK)}`;

export function LiquidGlassLogo() {
  const ref = useRef(null);

  useEffect(() => {
    const wrap = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let engine;
    let cancelled = false;
    const live = { current: null };
    const stop = () => {
      engine?.dispose();
      engine = null;
      wrap.dataset.ready = 'false';
    };
    const start = async () => {
      if (motion.matches || typeof ResizeObserver === 'undefined') return;
      try {
        const { startEngine, LIGHT, loadLogo } = await import('../../lib/glassLogoEngine');
        if (cancelled || motion.matches) return;
        live.current = {
          settings: { ...LIGHT, background: '#f1eee7', logoColor: '#e0431f',
            originalColors: true, keepPlate: false, logoScale: 0.72,
            hold: 2.4, shadow: 0.35 },
          loop: true, speed: 1,
        };
        engine = startEngine(wrap, live);
        if (!engine) return;
        const data = await loadLogo(MARK);
        if (!cancelled && !motion.matches) engine?.setLogo(data);
      } catch { stop(); }
    };
    const replay = () => engine?.replay();
    const change = () => { stop(); if (!motion.matches) start(); };
    const link = wrap.closest('a');
    wrap.addEventListener('pointerenter', replay);
    link?.addEventListener('focus', replay);
    motion.addEventListener('change', change);
    start();
    return () => {
      cancelled = true;
      stop();
      wrap.removeEventListener('pointerenter', replay);
      link?.removeEventListener('focus', replay);
      motion.removeEventListener('change', change);
    };
  }, []);

  return <span ref={ref} className="liquid-brand" aria-hidden="true">
    <img src={MARK_URL} alt="" width="112" height="60" />
  </span>;
}
