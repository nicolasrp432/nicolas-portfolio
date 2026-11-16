import { useInitialAnchor } from './hooks/useInitialAnchor';
import { useEffect } from 'react';
import { gsap, ScrollTrigger, MOTION_OK } from './lib/gsap';
import { useGsapScope } from './hooks/useGsapScope';
import { useHasPointer, useReducedMotion } from './hooks/useMediaQuery';
import { schools, educationProjects, certificates } from './data/education';
import { toProjectCard } from './data/projects';

import { Cursor } from './components/chrome/Cursor';
import { GrainOverlay } from './components/chrome/GrainOverlay';
import { Navbar } from './components/chrome/Navbar';
import { Footer } from './components/chrome/Footer';

import { SplitHeadline } from './components/motion/SplitHeadline';
import { Reveal } from './components/motion/Reveal';
import { ArrowLink } from './components/ui/ArrowLink';
import { GlassPanel } from './components/ui/GlassPanel';
import { GlassLinkCard } from './components/ui/GlassLinkCard';
import { ProjectCard } from './components/ui/ProjectCard';
import { ProjectRow } from './components/ui/ProjectRow';
import { Certificates } from './components/sections/Certificates';
import { WhatsAppButton } from './components/ui/WhatsAppButton';

import { GITHUB_USER } from './data/site';

const HEADING = [[{ text: 'Lo que aprendo' }], [{ text: 'mientras lo ' }, { text: 'construyo.', accent: true }]];

/** One school's work, in the same two registers the home page uses. */
function School({ school, projects, offset }) {
  const featured = projects.filter((project) => project.featured);
  const indexed = projects.filter((project) => !project.featured);

  return (
    <section className="section school" id={`escuela-${school.id}`}>
      <GlassPanel as="header" className="school-head">
        <h2>{school.name}</h2>
        <p className="eyebrow">{school.note}</p>
        <span className="school-count" aria-hidden="true">
          {String(projects.length).padStart(2, '0')}
        </span>
      </GlassPanel>

      {featured.length > 0 && (
        <ul className="project-grid">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} tone={offset + index} />
          ))}
        </ul>
      )}

      {indexed.length > 0 && (
        <ol className="project-index">
          {indexed.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ol>
      )}
    </section>
  );
}

/**
 * The education page, served as its own document at `/educacion/`.
 *
 * A separate HTML entry rather than a client route: the site has no router,
 * ships static, and every navigation on it is a hash anchor. A real second
 * document keeps those anchors unambiguous, gives this page its own indexable
 * metadata, and leaves the home page's JavaScript budget alone.
 */
export default function EducationPage() {
  useInitialAnchor();
  const hasPointer = useHasPointer();
  const reducedMotion = useReducedMotion();

  const cards = educationProjects.map((project, index) => toProjectCard(project, index));

  const scope = useGsapScope(() => {
    gsap.utils.toArray('.school-head').forEach((head) => {
      gsap.fromTo(
        head,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: head, start: 'top 88%', once: true },
        },
      );
    });

    gsap.utils.toArray('.project-card').forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        },
      );
    });

    gsap.utils.toArray('.project-index').forEach((list) => {
      gsap.fromTo(
        list.querySelectorAll('.project-row'),
        { opacity: 0, x: -18 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'expo.out',
          scrollTrigger: { trigger: list, start: 'top 90%', once: true },
        },
      );
    });
    // Entrada y levitación de elementos visuales del hero de educación
    gsap.fromTo(
      '.education-portrait-cutout',
      { opacity: 0, y: 36, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'expo.out', delay: 0.15 },
    );
    gsap.fromTo(
      '.education-3d-item img',
      { opacity: 0, y: 24, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out', delay: 0.35 },
    );

    gsap.to('.item-terminal img', {
      y: -12,
      rotate: 3,
      duration: 3.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
    gsap.to('.item-cap img', {
      y: -14,
      rotate: -4,
      duration: 4.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.5,
    });
  }, [], MOTION_OK);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const frame = requestAnimationFrame(refresh);
    if (document.readyState === 'complete') return () => cancelAnimationFrame(frame);

    window.addEventListener('load', refresh);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', refresh);
    };
  }, []);

  let tone = 0;

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      {hasPointer && !reducedMotion && <Cursor />}
      <GrainOverlay />

      <div className="shell">
        <Navbar currentPage="educacion" />

        <main id="contenido" className="education-page" ref={scope}>
          <header className="section education-intro" id="educacion">
            <div className="education-intro-copy">
              <p className="eyebrow">Archivo de aprendizaje · 2025—2026</p>
              <SplitHeadline lines={HEADING} className="education-title" />
              <Reveal as="p" delay={0.1} className="education-standfirst">
                Mi criterio también se entrena. Del primer puntero en C a una interfaz en React:
                un archivo abierto de ejercicios, decisiones y descubrimientos que llevo a lo que construyo.
              </Reveal>
              <Reveal as="div" delay={0.2}>
                <ArrowLink href="/" external={false}>
                  Volver al portfolio
                </ArrowLink>
              </Reveal>
            </div>

            <div className="education-intro-visual" aria-hidden="true">
              <div className="education-stage">
                <span className="education-orbit" aria-hidden="true" />

                <div className="education-portrait-wrap">
                  <img
                    src="/img/portraits/portrait-cenital-960.webp"
                    srcSet="/img/portraits/portrait-cenital-480.webp 480w, /img/portraits/portrait-cenital-960.webp 960w"
                    sizes="(max-width: 900px) 280px, 480px"
                    decoding="async"
                    alt="Nicolás Rodríguez programando y estudiando con su portátil"
                    width="620"
                    height="775"
                    className="education-portrait-cutout"
                    loading="eager"
                  />
                </div>

                {/* Iconos 3D flotantes con fondo 100% transparente */}
                <span className="education-3d-item item-terminal" aria-hidden="true">
                  <img
                    src="/img/hero-glass/optimized/web.webp"
                    alt=""
                    width="240"
                    height="298"
                    loading="eager"
                  />
                </span>

                <span className="education-3d-item item-cap" aria-hidden="true">
                  <img
                    src="/img/hero-glass/optimized/3d.webp"
                    alt=""
                    width="260"
                    height="243"
                    loading="eager"
                  />
                </span>

                <GlassPanel as="span" className="education-chip chip-school">
                  <span className="live-dot" />
                  <span>
                    42 <strong>Telefónica</strong>
                  </span>
                </GlassPanel>

                <GlassPanel as="span" className="education-chip chip-track">
                  <span>
                    Frontend <strong>React & C</strong>
                  </span>
                </GlassPanel>
              </div>
            </div>
          </header>

          <Certificates />

          <nav className="education-paths" aria-label="Explorar mi formación">
            {schools.map((school, index) => <GlassLinkCard key={school.id}
              href={`#escuela-${school.id}`} eyebrow={`0${index + 1} / Itinerario`}
              title={school.name} description={school.note}
              meta={`${cards.filter(card => card.school === school.id).length} proyectos documentados`}
              image={index === 0 ? '/img/hero-glass/optimized/3d.webp' : '/img/hero-glass/optimized/web.webp'} />)}
            <GlassLinkCard href="#certificaciones" eyebrow="03 / Evidencias" title="Credenciales"
              description="Formación y experiencias que puedes explorar y consultar."
              meta={`${certificates.length} documentos disponibles`} image="/img/hero-glass/optimized/strategy-chess.webp" />
          </nav>

          {schools.map((school) => {
            const projects = cards.filter((card) => card.school === school.id);
            if (projects.length === 0) return null;

            const element = (
              <School key={school.id} school={school} projects={projects} offset={tone} />
            );
            tone += projects.filter((project) => project.featured).length;
            return element;
          })}

        </main>

        <Footer homeHref="/" topHref="#educacion" />
        <WhatsAppButton />
      </div>
    </>
  );
}
