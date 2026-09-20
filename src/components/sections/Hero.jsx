import { FiArrowDownRight, FiCode } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { GITHUB_USER, heroFacts } from '../../data/site';
import { SplitHeadline } from '../motion/SplitHeadline';
import { Magnetic } from '../motion/Magnetic';
import { ArrowLink } from '../ui/ArrowLink';

const HEADLINE = [
  [{ text: 'Construyo ideas' }],
  [{ text: 'que se sienten ' }, { text: 'claras.', accent: true }],
];

/**
 * The opening spread.
 *
 * With the intro curtain gone this timeline is the page's entrance: it starts
 * on mount, before the first paint, so the `from` states are written to the DOM
 * in the same frame and nothing flashes at full opacity first.
 *
 * The portrait is the untouched cut-out PNG, drawn with `object-fit: contain`
 * against an aspect-ratio box — no crop box, no fixed pixel height, so the
 * framing the image ships with is the framing that renders.
 */
export function Hero() {
  const scope = useGsapScope(
    (root) => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo('.hero-kicker', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(
          '.hero-headline .split-char',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: { each: 0.015 } },
          '-=0.45',
        )
        .fromTo('.hero-intro', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7')
        .fromTo('.hero-actions > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, '-=0.55')
        .fromTo(
          '.hero-portrait',
          { clipPath: 'inset(100% 0 0 0)', scale: 1.06 },
          { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.2 },
          '-=1',
        )
        .fromTo('.hero-orbit', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, stagger: 0.1 }, '-=0.9')
        .fromTo(
          '.hero-chip',
          { opacity: 0, scale: 0.8, rotate: 0 },
          { opacity: 1, scale: 1, rotate: (i) => (i === 0 ? -5 : 5), duration: 0.6, stagger: 0.1 },
          '-=0.7',
        )
        .fromTo('.hero-facts > *', { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.08 }, '-=0.4');

      // Ambient: the rings keep turning, at opposite speeds.
      gsap.to('.hero-orbit-a', { rotate: 360, duration: 60, ease: 'none', repeat: -1 });
      gsap.to('.hero-orbit-b', { rotate: -360, duration: 90, ease: 'none', repeat: -1 });

      // Scrubbed depth: the portrait lags the rings as the page moves away.
      // `root` is the <section> itself — a '.hero' selector would resolve
      // against its descendants and match nothing.
      const onHeroScroll = { trigger: root, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero-visual-inner', { yPercent: 10, ease: 'none', scrollTrigger: onHeroScroll });
      gsap.to('.hero-copy', {
        yPercent: -8,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: onHeroScroll,
      });

      return () => tl.kill();
    },
    [],
    MOTION_OK,
  );

  return (
    <section className="hero" id="inicio" ref={scope}>
      <p className="hero-kicker">
        <span className="hero-pulse" aria-hidden="true" />
        Frontend × productos digitales × IA
      </p>

      <div className="hero-grid">
        <div className="hero-copy">
          <SplitHeadline lines={HEADLINE} className="hero-headline" autoAnimate={false} />

          <p className="hero-intro">
            Soy Nicolás, desarrollador frontend y constructor de soluciones digitales. Convierto
            problemas en productos útiles, visuales y bien pensados.
          </p>

          <div className="hero-actions">
            <Magnetic>
              <a className="button-slab" href="#proyectos" data-cursor="VER">
                Explorar proyectos
                <FiArrowDownRight aria-hidden="true" />
              </a>
            </Magnetic>
            <ArrowLink
              href={`https://github.com/${GITHUB_USER}`}
              label="Perfil de GitHub (se abre en una pestaña nueva)"
            >
              github/{GITHUB_USER}
            </ArrowLink>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-inner">
            <span className="hero-orbit hero-orbit-a" aria-hidden="true" />
            <span className="hero-orbit hero-orbit-b" aria-hidden="true" />

            <picture className="hero-portrait">
              <source srcSet="/nicolasrp-640.webp" type="image/webp" media="(max-width: 700px)" />
              <source srcSet="/nicolasrp-1122.webp" type="image/webp" />
              <img
                src="/nicolasrp-Photoroom.png"
                alt="Retrato de Nicolás Rodríguez"
                width="1122"
                height="1402"
                fetchPriority="high"
                decoding="async"
              />
            </picture>

            <span className="hero-chip chip-code" aria-hidden="true">
              <FiCode />
              <span>
                build
                <strong>with intent</strong>
              </span>
            </span>
            <span className="hero-chip chip-ai" aria-hidden="true">
              <RiRobot2Line />
              <span>
                AI
                <strong>as a system</strong>
              </span>
            </span>

          </div>

          {/* Outside `.hero-visual-inner` on purpose: that box is now exactly
              the portrait's width, so a caption inside it would sit on top of
              the image instead of beside it. */}
          <span className="hero-caption" aria-hidden="true">
            Curiosidad
            <br />
            en movimiento ↗
          </span>
        </div>
      </div>

      <ul className="hero-facts">
        {heroFacts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </section>
  );
}
