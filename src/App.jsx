import { useEffect } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { useHasPointer, useReducedMotion } from './hooks/useMediaQuery';
import { navLinks } from './data/site';

import { Cursor } from './components/chrome/Cursor';
import { GrainOverlay } from './components/chrome/GrainOverlay';
import { SectionRail } from './components/chrome/SectionRail';
import { Navbar } from './components/chrome/Navbar';
import { Footer } from './components/chrome/Footer';

import { Hero } from './components/sections/Hero';
import { Ticker } from './components/sections/Ticker';
import { Projects } from './components/sections/Projects';
import { Profile } from './components/sections/Profile';
import { Toolbox } from './components/sections/Toolbox';
import { Roadmap } from './components/sections/Roadmap';
import { Contact } from './components/sections/Contact';

export default function App() {
  const hasPointer = useHasPointer();
  const reducedMotion = useReducedMotion();

  // The page paints immediately, so ScrollTrigger's first measurement happens
  // against a layout whose images have not arrived yet. Re-measure once the
  // window load event confirms they have, or the pinned toolbox and every
  // scrubbed section start from stale offsets.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const frame = requestAnimationFrame(refresh);

    if (document.readyState === 'complete') {
      return () => cancelAnimationFrame(frame);
    }

    window.addEventListener('load', refresh);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      {hasPointer && !reducedMotion && <Cursor />}
      <GrainOverlay />
      <SectionRail sections={navLinks} />

      <div className="shell">
        <Navbar />

        <main id="contenido">
          <Hero />
          <Ticker />
          <Projects />
          <Profile />
          <Toolbox />
          <Roadmap />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
