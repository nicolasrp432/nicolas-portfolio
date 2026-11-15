import { useEffect, useId, useRef, useState } from 'react';

import { useLiquidRibbon } from '../../hooks/useLiquidRibbon';

// Adapted from the supplied Tilted Grid: every image bends as sixteen fixed facets.
const SLICES = 16;
const CAMERA = 1.6;
const arc = (bend) => (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
function measure(width, height, tile, aspect, gap, bend) {
  const h = Math.min(tile / 100 * height, .55 * width / aspect);
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  const unit = h / radius * 180 / Math.PI;
  const pitch = (aspect + gap / 100) * unit;
  const limit = bend * 180 / Math.PI + aspect * unit / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil(2 * limit / pitch)));
  const sweep = columns * pitch / 2;
  return { columns, sweep, unit, limit: Math.min(sweep, limit) };
}
export function TiltedGridHero({ images, speed = 5, tileHeight = 56, aspectRatio = 1.5, gap = 8, axis = 50, curve = 65, fade = 10, paused = false, liquid = false, className = '', children }) {
  const ref = useRef(null);
  useLiquidRibbon(ref, liquid);
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [layout, setLayout] = useState(null);
  const [shown, setShown] = useState({});
  const [visible, setVisible] = useState(false);
  const bend = Math.min(85, Math.max(5, curve)) * Math.PI / 180;
  useEffect(() => {
    const el = ref.current;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setLayout(measure(width, height, tileHeight, aspectRatio, gap, bend));
    };
    update();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    ro?.observe(el);
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => { ro?.disconnect(); io.disconnect(); };
  }, [tileHeight, aspectRatio, gap, bend]);
  const { columns, sweep, unit, limit } = layout ?? measure(1200, 400, tileHeight, aspectRatio, gap, bend);
  const u = (n) => `calc(${n.toFixed(4)} * min(${tileHeight}cqh, ${(55 / aspectRatio).toFixed(4)}cqw))`;
  const radius = `${(100 * arc(bend)).toFixed(3)}cqw`;
  const turn = (deg) => `translateZ(${radius}) rotateY(${deg.toFixed(4)}deg) translateZ(-${radius})`;
  const hide = (sweep - limit) / (2 * sweep || 1) * 100;
  const duration = columns * Math.max(.5, speed);
  const share = aspectRatio / SLICES;
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;
  return <div ref={ref} className={`tilted-grid-hero ${className}`} data-interactive={liquid || undefined} data-paused={paused || !visible || undefined}>
    <style>{`@keyframes tgh-${id}{from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}0%,${hide}%,${100 - hide}%,100%{visibility:hidden}${hide + .001}%,${100 - hide - .001}%{visibility:visible}}`}</style>
    <div aria-hidden="true" className="tilted-grid-band" style={{ opacity: layout ? 1 : 0, perspective: `${(100 * arc(bend) * CAMERA).toFixed(3)}cqw`, perspectiveOrigin: `50% ${axis}%`, maskImage: mask, WebkitMaskImage: mask }}>
      {images.length > 0 && Array.from({ length: columns }, (_, t) => {
        const first = columns - 1 - t;
        const img = images[(shown[t] ?? first) % images.length];
        return <div key={`${columns}-${t}`} className="tilted-grid-tile" data-src={img.src} style={{ '--tgh-duration': `${duration}s`, left: `calc(50% - ${u(aspectRatio / 2)})`, top: `calc(${axis}% - ${u(.5)})`, width: u(aspectRatio), height: u(1), animation: `tgh-${id} ${duration}s linear ${-t * Math.max(.5, speed)}s infinite` }}
          onAnimationIteration={(event) => setShown((previous) => ({ ...previous, [t]: Math.round(event.elapsedTime / duration) * columns + first }))}>
          {Array.from({ length: SLICES }, (_, k) => <div key={k} className="tilted-grid-slice" data-slice={k} style={{ left: u((aspectRatio - share) / 2), width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`, height: u(1), transform: turn((aspectRatio / 2 - (k + .5) * share) * unit) }}>
            <img src={img.src} alt="" draggable="false" loading="lazy" style={{ left: u(-k * share), width: u(aspectRatio), height: u(1), objectPosition: img.position || 'center', objectFit: img.fit || 'cover' }} />
          </div>)}
        </div>;
      })}
    </div>
    {children}
  </div>;
}
