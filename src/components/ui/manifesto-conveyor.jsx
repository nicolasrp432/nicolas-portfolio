import { useEffect, useId, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiPause, FiPlay } from 'react-icons/fi';
import { useReducedMotion } from '../../hooks/useMediaQuery';

const wrap = (n, length) => ((n % length) + length) % length;
// Stadium loop and perspective projection adapted from the supplied conveyor menu.
function along(u, straight, radius) {
  const length = 2 * straight + 2 * Math.PI * radius;
  let t = wrap(u, length);
  if (t < straight) return { x: straight / 2 - t, z: radius };
  t -= straight;
  if (t < Math.PI * radius) return { x: -straight / 2 - radius * Math.sin(t / radius), z: radius * Math.cos(t / radius) };
  t -= Math.PI * radius;
  if (t < straight) return { x: -straight / 2 + t, z: -radius };
  t -= straight;
  return { x: straight / 2 + radius * Math.sin(t / radius), z: -radius * Math.cos(t / radius) };
}

export function ManifestoConveyor({ items, paused, onPausedChange }) {
  const root = useRef(null);
  const plates = useRef([]);
  const phase = useRef(0);
  const target = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const reduced = useReducedMotion();
  const detailId = useId();
  const live = useRef({});
  live.current = { paused, hover, reduced };

  useEffect(() => {
    const el = root.current;
    let width = Math.max(1, el.clientWidth);
    let frame = 0;
    let visible = false;
    let last = 0;
    const draw = (now) => {
      frame = 0;
      const dt = Math.min((now - (last || now)) / 1000, .05);
      last = now;
      if (target.current !== null) {
        const delta = target.current - phase.current;
        phase.current += reduced ? delta : delta * Math.min(1, dt * 7);
        if (Math.abs(delta) < .0005) { phase.current = target.current; target.current = null; }
      } else if (!live.current.paused && !live.current.hover && !reduced && !drag.current) phase.current += dt * .018;
      const d = Math.min(165, width * .25);
      const radius = width * .14;
      const straight = width * .50;
      const length = 2 * straight + 2 * Math.PI * radius;
      plates.current.forEach((button, index) => {
        if (!button) return;
        const p = along((phase.current - index / items.length) * length + straight / 2, straight, radius);
        const depth = (p.z + radius) / (2 * radius);
        const scale = .66 + depth * .34;
        const x = width / 2 + p.x * scale - d / 2;
        const y = 30 + depth * 110;
        button.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
        button.style.width = `${d}px`;
        button.style.zIndex = `${Math.round(depth * 100) + 1}`;
        button.style.setProperty('--piece-depth', depth.toFixed(3));
      });
      if (visible) frame = requestAnimationFrame(draw);
    };
    const start = () => { if (!frame) { last = 0; frame = requestAnimationFrame(draw); } };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => { width = Math.max(1, el.clientWidth); start(); }) : null;
    ro?.observe(el);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; } });
    io.observe(el);
    start();
    return () => { cancelAnimationFrame(frame); ro?.disconnect(); io.disconnect(); };
  }, [items.length, reduced]);

  const select = (index) => {
    setActive(index);
    onPausedChange(true);
    const fraction = index / items.length;
    target.current = phase.current + wrap(fraction - phase.current + .5, 1) - .5;
  };
  const change = (step) => select(wrap(active + step, items.length));
  return <div className="manifesto-conveyor">
    <div ref={root} className="manifesto-conveyor-stage" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHover(false); }}
      onKeyDown={(event) => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); change(event.key === 'ArrowRight' ? 1 : -1); } }}
      onPointerDown={(event) => { if (!event.isPrimary || event.button !== 0) return; suppressClick.current = false; drag.current = { x: event.clientX, y: event.clientY, phase: phase.current, moved: false }; }}
      onPointerMove={(event) => {
        const g = drag.current;
        if (!g) return;
        const dx = event.clientX - g.x;
        if (!g.moved && Math.abs(event.clientY - g.y) > Math.abs(dx) && Math.abs(event.clientY - g.y) > 8) { drag.current = null; return; }
        if (!g.moved && Math.abs(dx) < 8) return;
        g.moved = true; suppressClick.current = true; target.current = null;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        phase.current = g.phase - dx / Math.max(root.current.clientWidth, 1);
      }}
      onPointerUp={(event) => { const moved = drag.current?.moved; drag.current = null; if (moved) select(wrap(Math.round(phase.current * items.length), items.length)); if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      onPointerCancel={() => { drag.current = null; }}
      onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
      onDragStart={(event) => event.preventDefault()}>
      <div className="manifesto-belt" aria-hidden="true"><span>Ideas en movimiento</span></div>
      {items.map((item, index) => <button key={item.id} ref={(el) => { plates.current[index] = el; }} type="button" className="manifesto-piece"
        aria-label={item.title} aria-pressed={active === index} aria-controls={detailId} onClick={() => select(index)}>
        <span className="manifesto-piece-glass"><img src={item.image} className="manifesto-symbol" alt="" width="512" height="512" loading="lazy" decoding="async" draggable="false" /></span>
        <span className="manifesto-piece-label">{item.label}</span>
      </button>)}
    </div>
    <div className="manifesto-conveyor-controls">
      <button type="button" aria-label="Idea anterior" onClick={() => change(-1)}><FiArrowLeft aria-hidden="true" /></button>
      <button type="button" onClick={() => onPausedChange(!paused)} aria-label={paused ? 'Reanudar movimiento del manifiesto' : 'Pausar movimiento del manifiesto'}>{paused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}<span>{paused ? 'Reanudar' : 'Pausar'}</span></button>
      <button type="button" aria-label="Idea siguiente" onClick={() => change(1)}><FiArrowRight aria-hidden="true" /></button>
    </div>
    <div className="manifesto-idea" id={detailId} aria-live="polite" aria-atomic="true">
      <span className="eyebrow">{String(active + 1).padStart(2, '0')} / Mi manera de crear</span>
      <h3>{items[active].title}</h3><p>{items[active].text}</p>
    </div>
  </div>;
}
