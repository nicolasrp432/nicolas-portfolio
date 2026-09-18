import { Reveal } from '../motion/Reveal';
import { SplitHeadline } from '../motion/SplitHeadline';

/**
 * The shared two-column section opener: eyebrow plus split headline on the
 * left, a single paragraph of standfirst on the right, baseline-aligned.
 *
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {Array<Array<{text: string, accent?: boolean}>>} props.lines
 * @param {string} [props.standfirst]
 */
export function SectionHeading({ eyebrow, lines, standfirst, compact = false }) {
  return (
    <div className={`section-heading${compact ? ' is-compact' : ''}`}>
      <div>
        <Reveal as="span" variant="rise" className="eyebrow">
          {eyebrow}
        </Reveal>
        <SplitHeadline as="h2" lines={lines} className="section-title" />
      </div>
      {standfirst && (
        <Reveal as="p" delay={0.1} className="section-standfirst">
          {standfirst}
        </Reveal>
      )}
    </div>
  );
}
