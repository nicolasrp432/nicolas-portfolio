import { useEffect, useState } from 'react';
import { TbCode, TbCube3dSphere, TbKeyframes, TbMovie, TbRobot } from 'react-icons/tb';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import { LiquidGlass } from './LiquidGlass';

const ICONS = {
  code: TbCode,
  motion: TbKeyframes,
  video: TbMovie,
  '3d': TbCube3dSphere,
  ai: TbRobot,
};

const CYCLE_MS = 2600;

/**
 * The disciplines, as a liquid-glass dock standing on the edge of the
 * portrait — where the jacket meets the paper, so the lens has a silhouette
 * to bend.
 *
 * It is a list, not a set of buttons: selecting a discipline changes nothing
 * but the dock itself, so it does not pretend to be a control. Every name is
 * in the DOM for assistive tech; the highlight that walks through them is
 * decoration, and it stands still under reduced motion.
 *
 * The glass is a fixed size on purpose. The label that changes lives outside
 * it, so the displacement map is built once and never again.
 */
export function DisciplineDock({ items, className = '' }) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (reducedMotion || held || items.length < 2) return undefined;
    const timer = setInterval(() => setActive((i) => (i + 1) % items.length), CYCLE_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, held, items.length]);

  const current = items[active];
  const total = String(items.length).padStart(2, '0');

  return (
    <div
      className={`dock ${className}`.trim()}
      style={{ '--dock-active': active }}
      onPointerLeave={() => setHeld(false)}
    >
      {/* Vertical, like the index rail: the same voice for the same job. */}
      <p className="dock-label" aria-hidden="true">
        <span className="dock-count">
          {String(active + 1).padStart(2, '0')}/{total}
        </span>
        <span className="dock-name" key={current.id}>
          {current.label}
        </span>
      </p>

      <LiquidGlass as="ul" className="dock-glass" aria-label="Disciplinas" bevelDepth={20} scale={72} aberration={7}>
        <li className="dock-thumb" aria-hidden="true" role="presentation" />
        {items.map((item, index) => {
          const Icon = ICONS[item.id] ?? TbCode;
          return (
            <li
              key={item.id}
              className={`dock-item${index === active ? ' is-active' : ''}`}
              data-cursor=""
              onPointerEnter={() => {
                setHeld(true);
                setActive(index);
              }}
            >
              <Icon aria-hidden="true" />
              <span className="visually-hidden">{item.label}</span>
            </li>
          );
        })}
      </LiquidGlass>
    </div>
  );
}
