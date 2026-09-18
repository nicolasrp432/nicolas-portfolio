import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger, prefersReducedMotion } from './lib/gsap';
import { useHasPointer, useReducedMotion } from './hooks/useMediaQuery';
import { navLinks } from './data/site';

import { Preloader } from './components/chrome/Preloader';
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

const INTRO_SEEN_KEY = 'nr:intro-seen';

/** Shown once per tab, and never to someone who asked for reduced motion. */
function shouldPlayIntro() {
  if (prefersReducedMotion()) return false;
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) !== '1';
  } catch {
    return true;
  }
}

export default function App() {
  const [introPlaying, setIntroPlaying] = useState(shouldPlayIntro);
  const hasPointer = useHasPointer();
  const reducedMotion = useReducedMotion();

  const finishIntro = useCallback(() => {
    setIntroPlaying(false);
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      /* Private mode — the intro simply plays again next visit. */
    }
  }, []);

  // Pinned sections measure themselves against a layout that only settles once
  // the curtain is gone and images have loaded.
  useEffect(() => {
    if (introPlaying) return undefined;
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [introPlaying]);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      {introPlaying && <Preloader onDone={finishIntro} />}
      {hasPointer && !reducedMotion && <Cursor />}
      <GrainOverlay />
      <SectionRail sections={navLinks} />

      <div className="shell">
        <Navbar />

        <main id="contenido">
          <Hero ready={!introPlaying} />
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
