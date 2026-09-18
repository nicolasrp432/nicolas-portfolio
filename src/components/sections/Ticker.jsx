import { Marquee } from '../motion/Marquee';
import { tickerWords } from '../../data/site';

/**
 * The band that separates the hero from the work index. It restates the
 * discipline list in motion, and gives the eye a hard horizontal rule to cross
 * before the page switches from paper to ink.
 */
export function Ticker() {
  return (
    <div className="ticker" aria-label="Áreas de trabajo">
      <Marquee items={tickerWords} speed={30} />
    </div>
  );
}
