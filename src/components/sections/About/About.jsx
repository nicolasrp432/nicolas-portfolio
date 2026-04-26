import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

// ─── Counter Hook ─────────────────────────────────────────────────────────────

const useCounter = (target, inView) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || typeof target !== 'number') return;
    let start = 0;
    const duration = 1500;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
};

// ─── Styled Components ────────────────────────────────────────────────────────

const AboutSection = styled.section`
  padding: var(--space-3xl) 0;
  background: var(--dark-bg);
  position: relative;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-2xl);
`;

const AccentLine = styled.div`
  width: 40px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
  margin: 0.75rem auto 0;
`;

const H2 = styled(motion.h2)`
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0.5rem 0 0;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: var(--space-2xl);
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
`;

// ─── Left Column ──────────────────────────────────────────────────────────────

const BodyText = styled(motion.p)`
  font-family: var(--font-main);
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
`;

const TextStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: var(--space-lg);
`;

const ChipsRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: var(--space-lg);
`;

const AreaChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: var(--transition);
  cursor: default;

  &:hover {
    border-color: rgba(255, 126, 95, 0.4);
    color: var(--text-primary);
  }
`;

const BtnOutline = styled.a`
  display: inline-block;
  background: transparent;
  border: 1.5px solid var(--border);
  color: var(--text-primary);
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-md);
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;

  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
`;

// ─── Right Column ─────────────────────────────────────────────────────────────

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
`;

const StatCard = styled(motion.div)`
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StatNumber = styled.span`
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 2.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
`;

const StatLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const CurrentlyBlock = styled(motion.div)`
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
`;

const CurrentlyItem = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  padding-left: 1rem;
  position: relative;
  margin-bottom: 0.4rem;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '▪';
    position: absolute;
    left: 0;
    color: var(--accent-primary);
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const areas = [
  { icon: '💻', label: 'Desarrollo Web' },
  { icon: '🤖', label: 'IA & Automatización' },
  { icon: '🎬', label: 'Contenido & Video' },
  { icon: '📚', label: 'Aprendizaje Constante' },
];

const stats = [
  { display: null, numericTarget: 5, suffix: '+', label: 'años de experiencia' },
  { display: null, numericTarget: 20, suffix: '+', label: 'proyectos entregados' },
  { display: null, numericTarget: 42, suffix: '', label: 'school — cursando' },
  { display: '∞', numericTarget: null, suffix: '', label: 'aprendizaje constante' },
];

const currentlyItems = [
  'Estudiante en 42 School',
  'Explorando agentes de IA',
  'Proyectos freelance activos',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const AnimatedStat = ({ stat, inView }) => {
  const count = useCounter(stat.numericTarget, inView);
  const display = stat.display !== null
    ? stat.display
    : `${count}${stat.suffix}`;

  return (
    <StatCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <StatNumber>{display}</StatNumber>
      <StatLabel>{stat.label}</StatLabel>
    </StatCard>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

const About = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <AboutSection id="about">
      <Container>

        {/* HEADER */}
        <SectionHeader>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            / sobre mí
          </motion.p>
          <H2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Más que código
          </H2>
          <AccentLine />
        </SectionHeader>

        {/* GRID */}
        <AboutGrid>

          {/* LEFT — Texto + Chips + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TextStack>
              <BodyText>
                Soy Nicolás, desarrollador frontend y constructor de soluciones digitales.
                Me interesa entender cómo funcionan las cosas — no solo hacerlas funcionar.
              </BodyText>
              <BodyText>
                Trabajo con React y TypeScript, pero mi stack incluye herramientas de IA (Claude, Gemini),
                automatización y diseño. Actualmente estudiante en 42, una escuela de programación sin profesores
                donde aprendes resolviendo proyectos reales.
              </BodyText>
              <BodyText>
                También creo contenido y edito video, lo que me da una visión más completa de los productos
                que construyo.
              </BodyText>
            </TextStack>

            <ChipsRow
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {areas.map(area => (
                <AreaChip key={area.label}>
                  <span>{area.icon}</span>
                  <span>{area.label}</span>
                </AreaChip>
              ))}
            </ChipsRow>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <BtnOutline href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                Descargar CV
              </BtnOutline>
            </motion.div>
          </motion.div>

          {/* RIGHT — Stats + Actualmente */}
          <div ref={statsRef}>
            <StatsGrid>
              {stats.map(stat => (
                <AnimatedStat key={stat.label} stat={stat} inView={statsInView} />
              ))}
            </StatsGrid>

            <CurrentlyBlock
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p
                className="mono"
                style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginBottom: '0.75rem' }}
              >
                // actualmente
              </p>
              {currentlyItems.map(item => (
                <CurrentlyItem key={item}>{item}</CurrentlyItem>
              ))}
            </CurrentlyBlock>
          </div>

        </AboutGrid>
      </Container>
    </AboutSection>
  );
};

export default About;
