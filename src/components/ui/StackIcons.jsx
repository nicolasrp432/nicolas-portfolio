import { useRef } from 'react';
import {
  SiClaude, SiFigma, SiGithub, SiJavascript, SiOpenai, SiReact, SiThreedotjs, SiVite,
} from 'react-icons/si';
import { RiGeminiFill } from 'react-icons/ri';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

const STACK = [
  { Icon: SiReact, label: 'React' },
  { Icon: SiJavascript, label: 'JavaScript' },
  { Icon: SiVite, label: 'Vite' },
  { Icon: SiThreedotjs, label: 'Three.js' },
  { Icon: SiOpenai, label: 'ChatGPT' },
  { Icon: SiClaude, label: 'Claude' },
  { Icon: RiGeminiFill, label: 'Gemini' },
  { Icon: SiFigma, label: 'Figma' },
  { Icon: SiGithub, label: 'GitHub' },
];

/**
 * The stack strip: bare marks, no container and no caption. The tools are
 * recognisable by their logos, and a row of naked glyphs sits better against
 * the paper than a row of boxes — the label is carried for screen readers
 * only.
 *
 * Animated in three registers:
 *
 * 1. Arrival — the marks deal in from below with a counter-rotation, once,
 *    when the row reaches the reading line.
 * 2. Drift — each then floats on its own loop. The durations are spread
 *    across 2.8s–4.9s so the row never syncs into a single wave, which is what
 *    makes a floating row read as mechanical rather than alive.
 * 3. Response — the pointer pops one out of its drift and back.
 *
 * The drift and hover tweens are created after the context has closed (inside
 * `onComplete` and inside event listeners), so `ctx.revert()` cannot see them.
 * They are tracked by hand and torn down in the cleanup this function returns.
 */
export function StackIcons() {
  const root = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tiles = gsap.utils.toArray('.stack-icon', element);
        const drifts = [];
        const listeners = [];

        gsap.fromTo(
          tiles,
          { opacity: 0, y: 26, rotate: -8, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.7)',
            stagger: 0.06,
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
            onComplete: () => {
              tiles.forEach((tile, index) => {
                drifts.push(
                  gsap.to(tile, {
                    y: -7 - (index % 3) * 2,
                    duration: 2.8 + (index % 5) * 0.53,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: index * 0.14,
                  }),
                );
              });
            },
          },
        );

        tiles.forEach((tile) => {
          const enter = () =>
            gsap.to(tile, { scale: 1.25, rotate: -8, duration: 0.35, ease: 'back.out(3)', overwrite: 'auto' });
          const leave = () =>
            gsap.to(tile, { scale: 1, rotate: 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });

          tile.addEventListener('pointerenter', enter);
          tile.addEventListener('pointerleave', leave);
          listeners.push(() => {
            tile.removeEventListener('pointerenter', enter);
            tile.removeEventListener('pointerleave', leave);
          });
        });

        return () => {
          drifts.forEach((drift) => drift.kill());
          listeners.forEach((off) => off());
          gsap.killTweensOf(tiles);
        };
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <ul className="stack-icons" ref={root} aria-label="Tecnologías principales">
      {STACK.map(({ Icon, label }) => (
        <li className="stack-icon" key={label} data-cursor={label.toUpperCase()}>
          <Icon aria-hidden="true" />
          <span className="visually-hidden">{label}</span>
        </li>
      ))}
    </ul>
  );
}
