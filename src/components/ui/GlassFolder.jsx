import { useEffect, useId, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * A glass folder: a back panel holding generated artwork, the sheets it
 * contains, and a milk-glass front panel that frosts whatever sits behind it.
 *
 * Adapted from "Glass Folder Cards" on 21st.dev, ported from Tailwind and
 * TypeScript to this project's plain CSS. What changed on the way in:
 *
 *   - It is a **filter toggle**, not a file browser. The folder is one button
 *     (`aria-pressed`); the sheets are decoration and `aria-hidden`. At the
 *     size a folder has in a four-column shelf a sheet's strip is ~20px tall,
 *     too small to be a link — the real links are the cards the folder filters.
 *   - The add key and the menu are gone: nothing here is editable.
 *   - Every colour comes from `tokens.css`, including the artwork, whose
 *     recipe names tokens and is resolved at paint time.
 *   - It fills its grid cell instead of taking a pixel `width`. The stage is
 *     drawn at 340 units and scaled by `--gf-k`, kept in sync by a
 *     `ResizeObserver`; the label is divided by the same factor so it stays a
 *     readable size however small the folder gets.
 *   - There is no self-assembling entrance. Entrances belong to GSAP inside
 *     the section's motion scope, like everything else on the page.
 *
 * Glass rule (see README): the front panel always has the artwork and the
 * sheets behind it, so it is never glass over flat paper.
 *
 * @param {object} props
 * @param {string} props.label      The folder's name, printed on the glass.
 * @param {string} props.numeral    Two-digit index, e.g. "01".
 * @param {{ name: string, meta?: string }[]} props.files  What it holds.
 * @param {boolean} props.open      Whether this folder is the active filter.
 * @param {() => void} props.onToggle
 * @param {{ style: 'marble'|'streak', colors: string[] }} props.art
 *        Artwork recipe; `colors` are token names such as `--coral`.
 * @param {number} [props.seed]     A different arrangement of the same recipe.
 */
export function GlassFolder({ label, numeral, files, open, onToggle, art, seed = 3 }) {
  const uid = useId().replace(/:/g, '');
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  // Scale: one custom property, written straight to the node — no re-render.
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const fit = () => {
      const width = el.clientWidth;
      if (width > 0) el.style.setProperty('--gf-k', (width / W).toFixed(4));
    };
    fit();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pointer: the light on the glass and a slight tilt follow the cursor.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    let raf = 0;
    let px = 0;
    let py = 0;
    const write = () => {
      raf = 0;
      el.style.setProperty('--gf-px', px.toFixed(3));
      el.style.setProperty('--gf-py', py.toFixed(3));
    };
    const move = (event) => {
      if (event.pointerType === 'touch') return;
      const box = el.getBoundingClientRect();
      px = ((event.clientX - box.left) / box.width) * 2 - 1;
      py = ((event.clientY - box.top) / box.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(write);
    };
    const leave = () => {
      px = 0;
      py = 0;
      if (!raf) raf = requestAnimationFrame(write);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Artwork: fetched and painted a screen early, never on page load. Until it
  // lands (or if it never does) the back panel is flat ink, which is fine.
  const artKey = JSON.stringify(art);
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    let live = true;

    const start = async () => {
      try {
        const { paintArt } = await import('../../lib/folderArt');
        const recipe = JSON.parse(artKey);
        const styles = getComputedStyle(el);
        const colors = recipe.colors.map((token) => styles.getPropertyValue(token).trim());
        const source = await paintArt({ ...recipe, colors }, seed, ART_W * ART_DENSITY, ART_H * ART_DENSITY);
        const canvas = canvasRef.current;
        if (!live || !canvas) return;
        canvas.width = source.width;
        canvas.height = source.height;
        canvas.getContext('2d')?.drawImage(source, 0, 0);
        canvas.dataset.ready = '';
      } catch {
        /* No canvas, no chunk: the folder keeps its flat back panel. */
      }
    };

    const approach = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          approach.disconnect();
          start();
        }
      },
      { rootMargin: '600px 0px' },
    );
    approach.observe(el);
    return () => {
      live = false;
      approach.disconnect();
    };
  }, [artKey, seed]);

  const visible = files.slice(0, MAX_VISIBLE);

  return (
    <div className="gf-root" ref={rootRef} data-open={open || undefined}>
      <div className="gf-stage" aria-hidden="true">
        <div className="gf-tilt">
          <div className="gf-back" style={{ clipPath: `path('${BACK_PATH}')` }}>
            <canvas className="gf-art" ref={canvasRef} />
            <div className="gf-back-sheen" />
          </div>
          <svg className="gf-rim gf-back-rim" viewBox={`0 0 ${W} ${H}`}>
            <path d={BACK_PATH} />
          </svg>

          <div className="gf-files">
            {visible.map((file, v) => {
              const jitter = rng(hashString(file.name));
              return (
                <span
                  key={file.name}
                  className="gf-sheet"
                  style={{
                    '--gf-slot': visible.length <= 1 ? 0 : (v / (visible.length - 1)) * 2 - 1,
                    '--gf-depth': visible.length - 1 - v,
                    '--gf-jx': `${((jitter() - 0.5) * 10).toFixed(2)}px`,
                    '--gf-jr': `${((jitter() - 0.5) * 3.2).toFixed(2)}deg`,
                    zIndex: v + 1,
                  }}
                >
                  <span className="gf-sheet-head">
                    <span className="gf-sheet-name">{file.name}</span>
                    {file.meta && <span className="gf-sheet-meta">{file.meta}</span>}
                  </span>
                  <span className="gf-lines">
                    <i style={{ width: '86%' }} />
                    <i style={{ width: '92%' }} />
                    <i style={{ width: '64%' }} />
                    <i style={{ width: '88%' }} />
                  </span>
                </span>
              );
            })}
          </div>

          <div className="gf-front" style={{ clipPath: `path('${FRONT_PATH}')` }}>
            <div className="gf-tint" />
            <div className="gf-spec" />
            <svg className="gf-rim gf-front-rim" viewBox={`0 0 ${W} ${FRONT_H}`}>
              <defs>
                <linearGradient id={`gf-rim-${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopOpacity="1" />
                  <stop offset="0.35" stopOpacity="0.4" />
                  <stop offset="1" stopOpacity="0.14" />
                </linearGradient>
              </defs>
              <path d={FRONT_PATH} stroke={`url(#gf-rim-${uid})`} />
            </svg>
            <div className="gf-label">
              <span className="gf-title">{label}</span>
              <span className="gf-meta">
                {String(files.length).padStart(2, '0')} proyectos
              </span>
            </div>
            <span className="gf-numeral">{numeral}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="gf-hit"
        aria-pressed={open}
        aria-label={`${label}, ${files.length} proyectos`}
        data-cursor={open ? 'CERRAR' : 'ABRIR'}
        onClick={onToggle}
      />
    </div>
  );
}

// Geometry, in the folder's own units. The stage is drawn at 340 × 272 and
// scaled to the cell, so the shapes can be fixed paths.
const W = 340;
const H = 272;
const FRONT_TOP = 74;
const FRONT_H = H - FRONT_TOP;
const ART_W = W + 24;
const ART_H = H + 24;
/** Painted once at this density; the folder never renders wider than 340px. */
const ART_DENSITY = 1.25;
/** A strip per sheet has to stay readable once the folder is open. */
const MAX_VISIBLE = 6;

const BACK_PATH =
  'M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z';
const FRONT_PATH = `M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 ${FRONT_H - 22}A22 22 0 0 1 318 ${FRONT_H}L22 ${FRONT_H}A22 22 0 0 1 0 ${FRONT_H - 22}Z`;

/** A small seedable PRNG (mulberry32), so a sheet's tilt follows its name. */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}
