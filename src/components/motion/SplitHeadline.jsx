import { createElement, useMemo, useRef } from 'react';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

/**
 * A headline split into per-line masks and per-character spans, which roll up
 * from behind the mask on scroll. Written by hand rather than with GSAP's
 * SplitText plugin, which requires a paid Club membership.
 *
 * Accessibility: the characters are `aria-hidden` and the real sentence is
 * exposed once via `aria-label`, so a screen reader reads "Construyo ideas que
 * se sienten claras." instead of spelling out forty separate letters.
 *
 * @param {object} props
 * @param {Array<Array<{text: string, accent?: boolean}>>} props.lines
 *        Each inner array is one visual line; `accent` renders the serif cut.
 * @param {string}  [props.as='h1']
 * @param {boolean} [props.autoAnimate=true]
 *        Off when a parent timeline (the hero intro) drives `.split-char` itself.
 */
export function SplitHeadline({
  lines,
  as = 'h1',
  className = '',
  autoAnimate = true,
  start = 'top 88%',
  ...rest
}) {
  const ref = useRef(null);

  const label = useMemo(
    () => lines.map((line) => line.map((part) => part.text).join('')).join(' '),
    [lines],
  );

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || !autoAnimate) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          element.querySelectorAll('.split-char'),
          { yPercent: 108 },
          {
            yPercent: 0,
            duration: 1,
            ease: 'expo.out',
            // Small per-character offset: enough to read as a wave, short
            // enough that a long headline still lands in about a second.
            stagger: { each: 0.016, from: 'start' },
            scrollTrigger: { trigger: element, start, once: true },
          },
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [autoAnimate, start, label]);

  let charIndex = 0;

  const content = lines.map((line, lineIndex) => (
    <span className="split-line" key={`line-${lineIndex}`}>
      <span className="split-line-inner">
        {line.map((part, partIndex) => {
          const Tag = part.accent ? 'em' : 'span';
          return createElement(
            Tag,
            { key: `part-${lineIndex}-${partIndex}`, className: 'split-part' },
            // Array.from keeps accented and multi-byte characters intact.
            Array.from(part.text).map((char, i) => (
              <span
                className="split-char"
                key={`char-${lineIndex}-${partIndex}-${i}`}
                style={{ '--char-index': charIndex++ }}
              >
                {char === ' ' ? ' ' : char}
              </span>
            )),
          );
        })}
      </span>
    </span>
  ));

  return createElement(
    as,
    { ref, className: `split-headline ${className}`.trim(), 'aria-label': label, ...rest },
    <span aria-hidden="true">{content}</span>,
  );
}
