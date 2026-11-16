import { FiArrowDownRight } from 'react-icons/fi';
import { site } from '../../data/site';
import { heroIdentity, heroObjects } from '../../data/hero';
import { Magnetic } from '../motion/Magnetic';
import { ArrowLink } from '../ui/ArrowLink';
import { LiquidGlassLogo } from '../ui/liquid-glass-logo-reveal';
import { PerspectiveTunnelHero } from '../ui/perspective-tunnel-hero';
import { useIsDesktop } from '../../hooks/useMediaQuery';

export function Hero() {
  const isDesktop = useIsDesktop();
  return (
    <section className="hero-scroll-track" id="inicio">
      <div className="hero hero-tunnel">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-mastline">
        <span>00 / Universo creativo</span>
        <span className="hero-availability"><span className="hero-pulse" aria-hidden="true" />{site.availability}</span>
      </div>
      <div className="hero-tunnel-stage">
        <div className="hero-logo-intro">{isDesktop && <LiquidGlassLogo />}</div>
        <div className="hero-portrait-depth">
          <img src="/img/portraits/portrait-elevado-960.webp" srcSet="/img/portraits/portrait-elevado-480.webp 480w, /img/portraits/portrait-elevado-960.webp 960w" sizes="(max-width: 900px) 280px, 480px" decoding="async" alt="Nicolás Rodríguez, desarrollador y creativo digital" width="1122" height="1402" fetchPriority="high" />
        </div>
        <div className="hero-tunnel-copy">
          <p className="hero-kicker">{site.name} <span aria-hidden="true">↗</span></p>
          <p className="hero-role">{heroIdentity.eyebrow}</p>
          <h1 className="hero-headline" aria-label="De la idea a un producto, una experiencia, una marca.">
            <span className="hero-hook-intro" aria-hidden="true">De la idea a</span>
            <span className="hero-hook-words" aria-hidden="true">
              <span className="hero-hook-word">un producto.</span>
              <span className="hero-hook-word">una experiencia.</span>
              <span className="hero-hook-word">una marca.</span>
            </span>
          </h1>
          <p className="hero-intro">{heroIdentity.intro}</p>
          <div className="hero-actions">
            <Magnetic>
              <a className="button-slab" href="#proyectos" data-cursor="VER">
                Explorar proyectos <FiArrowDownRight aria-hidden="true" />
              </a>
            </Magnetic>
            <ArrowLink href="#contacto" external={false}>Hablemos de tu idea</ArrowLink>
          </div>
        </div>
        <PerspectiveTunnelHero items={heroObjects} />
      </div>
      <span className="hero-depth-progress hero-depth-progress--quiet" aria-hidden="true"><i /></span>
      </div>
    </section>
  );
}
