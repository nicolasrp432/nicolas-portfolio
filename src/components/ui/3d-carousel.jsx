import { useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useReducedMotion } from '../../hooks/useMediaQuery';

const wrap = (value, count) => ((value % count) + count) % count;

/** A draggable cylinder. Repeated faces complete the ring, never the item count. */
export function ThreeDCarousel({ items, renderItem, getLabel, label = 'Galería 3D' }) {
  const [turn, setTurn] = useState(0);
  const [dragAngle, setDragAngle] = useState(0);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const reducedMotion = useReducedMotion();
  if (!items.length) return null;

  const count = items.length;
  const faceCount = count === 1 ? 1 : Math.max(6, Math.ceil(6 / count) * count);
  const angle = 360 / faceCount;
  const activeFace = wrap(turn, faceCount);
  const activeItem = wrap(turn, count);
  const move = (amount) => setTurn((value) => value + amount);
  const finishDrag = (event, cancelled = false) => {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    gesture.current = null;
    setDragAngle(0);
    if (drag.moved && !cancelled) {
      const steps = Math.round(-drag.dx / (drag.width * 0.65));
      move(steps || (drag.dx < 0 ? 1 : -1));
    }
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return <div className="three-d-carousel" role="region" aria-roledescription="carrusel" aria-label={label}
    data-reduced-motion={reducedMotion || undefined}
    onKeyDown={(event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }}>
    <div className="three-d-carousel-stage" data-dragging={dragAngle !== 0 || undefined}
      style={{ '--carousel-radius-factor': faceCount === 1 ? 0 : 1 / (2 * Math.tan(Math.PI / faceCount)) + 0.12 }}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0 || count < 2) return;
        suppressClick.current = false;
        gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0,
          width: event.currentTarget.querySelector('.three-d-carousel-ring').getBoundingClientRect().width, moved: false };
      }}
      onPointerMove={(event) => {
        const drag = gesture.current;
        if (!drag || drag.id !== event.pointerId) return;
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (!drag.moved && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { gesture.current = null; return; }
        if (!drag.moved && Math.abs(dx) < 8) return;
        drag.moved = true;
        drag.dx = dx;
        suppressClick.current = true;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        setDragAngle(dx / (drag.width * 0.65) * angle);
      }}
      onPointerUp={finishDrag}
      onPointerCancel={(event) => finishDrag(event, true)}
      onLostPointerCapture={(event) => finishDrag(event, true)}
      onClickCapture={(event) => {
        if (!suppressClick.current) return;
        event.preventDefault(); event.stopPropagation(); suppressClick.current = false;
      }}
      onDragStart={(event) => event.preventDefault()}>
      <div className="three-d-carousel-floor" aria-hidden="true" />
      <div className="three-d-carousel-ring" style={{ '--carousel-turn': `${-turn * angle + dragAngle}deg` }}>
        {Array.from({ length: faceCount }, (_, face) => {
          const index = face % count;
          const active = face === activeFace;
          return <div key={face} className="three-d-carousel-face" data-active={active || undefined}
            inert={!active ? true : undefined} aria-hidden={!active || undefined}
            role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${count}`}
            style={{ '--face-angle': `${face * angle}deg` }}>
            {renderItem(items[index], index, active)}
          </div>;
        })}
      </div>
    </div>
    <div className="three-d-carousel-controls">
      <button type="button" aria-label="Certificado anterior" disabled={count < 2} onClick={() => move(-1)}><FiArrowLeft aria-hidden="true" /></button>
      <p className="three-d-carousel-status" aria-live="polite" aria-atomic="true">
        <span>{String(activeItem + 1).padStart(2, '0')} <span className="three-d-carousel-total">/ {String(count).padStart(2, '0')}</span></span>
        <span>{getLabel(items[activeItem])}</span>
      </p>
      <button type="button" aria-label="Certificado siguiente" disabled={count < 2} onClick={() => move(1)}><FiArrowRight aria-hidden="true" /></button>
    </div>
  </div>;
}
