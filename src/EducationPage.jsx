import { useEffect } from 'react';
import { gsap, ScrollTrigger, MOTION_OK } from './lib/gsap';
import { useGsapScope } from './hooks/useGsapScope';
import { useHasPointer, useReducedMotion } from './hooks/useMediaQuery';
import { schools, educationProjects } from './data/education';
import { toProjectCard } from './data/projects';

import { Cursor } from './components/chrome/Cursor';
import { GrainOverlay } from './components/chrome/GrainOverlay';
import { Navbar } from './components/chrome/Navbar';
import { Footer } from './components/chrome/Footer';

import { SplitHeadline } from './components/motion/SplitHeadline';
import { Reveal } from './components/motion/Reveal';
import { ArrowLink } from './components/ui/ArrowLink';
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
      <header className="school-head">
        <h2>{school.name}</h2>
        <p className="eyebrow">{school.note}</p>
        <span className="school-count" aria-hidden="true">
          {String(projects.length).padStart(2, '0')}
        </span>
      </header>

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

        <main id="contenido" ref={scope}>
          <header className="section education-intro" id="educacion">
            <p className="eyebrow">Educación · trabajo de escuela</p>
            <SplitHeadline lines={HEADING} className="education-title" />
            <Reveal as="p" delay={0.1} className="education-standfirst">
              Ejercicios, teoría y currículo. No son encargos ni entregables para nadie: son el
              proceso, y lo comparto porque el proceso también cuenta. Aquí van los repositorios de
              la escuela 42 y de mi formación en frontend, según los voy cerrando.
            </Reveal>
            <Reveal as="div" delay={0.2}>
              <ArrowLink href="/" external={false}>
                Volver al portfolio
              </ArrowLink>
            </Reveal>
          </header>

          {schools.map((school) => {
            const projects = cards.filter((card) => card.school === school.id);
            if (projects.length === 0) return null;

            const element = (
              <School key={school.id} school={school} projects={projects} offset={tone} />
            );
            tone += projects.filter((project) => project.featured).length;
            return element;
          })}

          <Certificates />
        </main>

        <Footer homeHref="/" topHref="#educacion" />
        <WhatsAppButton />
      </div>
    </>
  );
}
