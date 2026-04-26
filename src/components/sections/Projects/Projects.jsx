import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

/* ─── Header Area ─────────────────────────────────────────────────────────── */

const ProjectsSection = styled.section`
  background: var(--surface-2);
  position: relative;
  padding-bottom: var(--space-3xl);
`;

const TopArea = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-3xl) 0 var(--space-xl);
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-xl);
`;

const H2 = styled(motion.h2)`
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0.5rem 0 0.75rem;
`;

const HeaderSubtitle = styled(motion.p)`
  color: var(--text-secondary);
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
  font-size: 1rem;
`;

/* ─── Card Stack ──────────────────────────────────────────────────────────── */

const CardStack = styled.div`
  width: 90%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const CardRevealWrapper = styled(motion.div)`
  width: 100%;
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 520px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  isolation: isolate;

  @media (max-width: 768px) {
    height: 420px;
  }

  @media (max-width: 480px) {
    height: 340px;
    border-radius: 12px;
  }
`;

const CardImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${({ $src }) => ($src ? `url(${$src})` : 'none')};
  background-size: cover;
  background-position: center top;
  background-color: var(--surface-3);
  ${({ $src }) =>
    !$src &&
    `background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%);`}
  transition: transform 0.55s ease;

  /* Scale up slightly on card hover */
  ${ProjectCard}:hover & {
    transform: scale(1.04);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.92) 0%,
    rgba(0, 0, 0, 0.4) 45%,
    rgba(0, 0, 0, 0.08) 100%
  );
  z-index: 2;
  transition: background 0.35s ease;

  ${ProjectCard}:hover & {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.96) 0%,
      rgba(0, 0, 0, 0.6) 55%,
      rgba(0, 0, 0, 0.15) 100%
    );
  }
`;

/* ─── Info Panel ──────────────────────────────────────────────────────────── */

const InfoPanel = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 1.75rem 1.75rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  @media (max-width: 480px) {
    padding: 1.2rem 1.25rem 1.4rem;
  }
`;

const InfoTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const CategoryChip = styled.span`
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 0.18rem 0.55rem;
  border-radius: var(--radius-sm);
  border: 1px solid currentColor;
  opacity: 0.85;
  color: ${({ $cat }) =>
    $cat === 'ai'
      ? 'var(--color-ai, #a78bfa)'
      : $cat === 'web'
        ? 'var(--color-code, #60a5fa)'
        : $cat === 'content'
          ? 'var(--color-content, #34d399)'
          : 'var(--text-secondary)'};
`;

const LinkRow = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const IconLink = styled.a`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.82rem;
  transition: var(--transition);
  text-decoration: none;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    background: rgba(255, 126, 95, 0.12);
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
`;

const CardClient = styled.p`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-tertiary);
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.15rem;
`;

const TechChip = styled.span`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  padding: 0.18rem 0.45rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: var(--gradient-primary);
  color: white;
  font-size: 0.65rem;
  padding: 0.18rem 0.55rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  z-index: 4;
`;

/* ─── NDA Note ────────────────────────────────────────────────────────────── */

const NdaNote = styled.p`
  text-align: center;
  padding: var(--space-xl) 0 0;
  color: var(--text-tertiary);
  font-size: 0.75rem;
`;

/* ─── Framer-motion variants ──────────────────────────────────────────────── */

const infoPanelVariants = {
  rest: { y: '100%', opacity: 0 },
  hover: {
    y: '0%',
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  mobilePeek: {
    y: '62%',
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 28 },
  },
};

/* ─── Data ────────────────────────────────────────────────────────────────── */

const projectsData = [
  {
    id: 1,
    title: 'El Costurero',
    client: 'Lida Rodriguez',
    problem:
      'App web para negocio de costura y confección de ropa sin presencia digital. App completa con carrito, catálogo y despliegue en producción.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    category: 'web',
    featured: true,
    github: 'https://github.com/nicolasrp432/Costurero',
    live: 'https://costurero.vercel.app/',
    image: '/costurero.png',
  },
  {
    id: 2,
    title: 'Manipedi las arenas',
    client: 'Manipedi las arenas',
    problem: 'Pagina web para centro de estetica manicura y pedicura',
    tech: ['React', 'TypeScript'],
    category: 'web',
    featured: false,
    github: "https://github.com/nicolasrp432/aura-glass-studio",
    live: "https://manipedibellezaintegral.es",
    image: "/maniepedi.png",
  },
  {
    id: 3,
    title: 'Ainara',
    client: 'Ainara Unamunzaga',
    problem:
      'Pagina web de marca personal de coaching y acompañamiento psicologico con landing page y sistema de reservas',
    tech: ['Next.js', 'TypeScript', 'Tailwind', "Supabase"],
    category: 'web',
    featured: true,
    github: null,
    live: "https://ainaracoaching.com/",
    image: "/ainara.png",
  },
  {
    id: 4,
    title: 'Unamunzaga obras y reformas',
    client: 'Xavi Unamunzaga',
    problem:
      'Pagina web para negocio de reformas y obras sin presencia digital. Pagina completa con carrito, catálogo y despliegue en producción.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    category: 'web',
    featured: false,
    github: null,
    live: "https://unamunzaga-web.vercel.app/",
    image: "/unamunzaga.png",
  },
];

/* ─── ProjectCardItem ─────────────────────────────────────────────────────── */

const ProjectCardItem = ({ project, index, isMobile }) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <CardRevealWrapper
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
    >
      <ProjectCard
        initial="rest"
        whileHover={isMobile ? undefined : 'hover'}
        animate={
          isMobile ? (mobileExpanded ? 'hover' : 'mobilePeek') : 'rest'
        }
        onClick={isMobile ? () => setMobileExpanded((v) => !v) : undefined}
      >
        {/* Background image / placeholder */}
        <CardImage $src={project.image} />

        {!project.image && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              zIndex: 1,
              letterSpacing: '0.06em',
            }}
          >
            // imagen pendiente
          </div>
        )}

        {/* Featured badge */}
        {project.featured && <FeaturedBadge>destacado</FeaturedBadge>}

        {/* Gradient overlay */}
        <CardOverlay />

        {/* Sliding info panel */}
        <InfoPanel variants={infoPanelVariants}>
          <InfoTopRow>
            <CategoryChip $cat={project.category}>
              {project.category === 'ai' ? 'IA & Auto' : project.category}
            </CategoryChip>
            <LinkRow>
              {project.github && (
                <IconLink
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub />
                </IconLink>
              )}
              {project.live && (
                <IconLink
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver en vivo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaExternalLinkAlt />
                </IconLink>
              )}
            </LinkRow>
          </InfoTopRow>

          <CardTitle>{project.title}</CardTitle>
          <CardClient>{project.client}</CardClient>
          <CardDescription>{project.problem}</CardDescription>

          <TechRow>
            {project.tech.map((t) => (
              <TechChip key={t}>{t}</TechChip>
            ))}
          </TechRow>
        </InfoPanel>
      </ProjectCard>
    </CardRevealWrapper>
  );
};

/* ─── Component ───────────────────────────────────────────────────────────── */

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <ProjectsSection id="projects">
      {/* Header */}
      <TopArea>
        <SectionHeader>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            / trabajo
          </motion.p>
          <H2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Soluciones construidas
          </H2>
          <HeaderSubtitle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Proyectos reales para clientes reales. Desplázate para explorar.
          </HeaderSubtitle>
        </SectionHeader>
      </TopArea>

      {/* Card stack */}
      <CardStack>
        {projectsData.map((project, i) => (
          <ProjectCardItem
            key={project.id}
            project={project}
            index={i}
            isMobile={isMobile}
          />
        ))}
      </CardStack>

      <NdaNote className="mono">
        // Proyectos de clientes bajo NDA disponibles bajo solicitud
      </NdaNote>
    </ProjectsSection>
  );
};

export default Projects;
