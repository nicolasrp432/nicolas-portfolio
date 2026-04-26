import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────

const CARD = 68;
const MAX_SCROLL = 2500;

const SKILLS = [
  { name: 'HTML5',       icon: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS3',        icon: 'https://cdn.simpleicons.org/css3/1572B6' },
  { name: 'JavaScript',  icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript',  icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'React',       icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js',     icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'Styled',      icon: 'https://cdn.simpleicons.org/styledcomponents/DB7093' },
  { name: 'Framer',      icon: 'https://cdn.simpleicons.org/framer/0055FF' },
  { name: 'Vite',        icon: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'Claude',      icon: 'https://cdn.simpleicons.org/anthropic/white' },
  { name: 'Gemini',      icon: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
  { name: 'n8n',         icon: 'https://cdn.simpleicons.org/n8n/FF6D5B' },
  { name: 'Git',         icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'VS Code',     icon: 'https://cdn.simpleicons.org/visualstudiocode/007ACC' },
  { name: 'Docker',      icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Figma',       icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'Linux',       icon: 'https://cdn.simpleicons.org/linux/FCC624' },
  { name: 'Premiere',    icon: 'https://cdn.simpleicons.org/adobepremierepro/9999FF' },
  { name: 'After FX',    icon: 'https://cdn.simpleicons.org/adobeaftereffects/9999FF' },
  { name: 'Photoshop',   icon: 'https://cdn.simpleicons.org/adobephotoshop/31A8FF' },
];



const TOTAL = SKILLS.length;
const lerp = (a, b, t) => a * (1 - t) + b * t;

// ─── Styled Components ────────────────────────────────────────────────────────

const SkillsSection = styled.section`
  padding: var(--space-3xl) 0;
  background: var(--dark-bg);
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  max-width: none;
  margin: 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-2xl);
  padding: 0 5%;
`;

const H2 = styled(motion.h2)`
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0.5rem 0 0;
`;

const Stage = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  background: var(--surface-1);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  cursor: default;
`;

const InnerStage = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FrontFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: border-color 0.2s;
`;

const BackFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: var(--surface-3);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const ScrollHint = styled(motion.p)`
  text-align: center;
  margin-top: var(--space-lg);
  color: var(--text-tertiary);
  font-size: 0.75rem;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
`;

const CenterText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  z-index: 1;
  user-select: none;
  width: min(280px, 55%);
  transition: opacity 0.4s ease;
`;

const BigTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CenterSubtitle = styled.p`
  font-family: var(--font-mono);
  font-size: clamp(0.62rem, 1.2vw, 0.75rem);
  color: var(--text-tertiary);
  letter-spacing: 0.08em;
  margin: 0;
  line-height: 1.5;
`;

// ─── FlipCard ─────────────────────────────────────────────────────────────────

function FlipCard({ skill, target }) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: 'spring', stiffness: 40, damping: 15 }}
      style={{
        position: 'absolute',
        width: CARD,
        height: CARD,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        cursor: 'pointer',
      }}
    >
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <FrontFace>
          <img
            src={skill.icon}
            alt={skill.name}
            width={36}
            height={36}
            style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.08))' }}
          />
        </FrontFace>
        <BackFace>
          <span style={{
            fontSize: '0.6rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-code)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}>
            {skill.name}
          </span>
        </BackFace>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Skills = () => {
  const [introPhase, setIntroPhase] = useState('scatter');
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [textVisible, setTextVisible] = useState(false);
  const stageRef = useRef(null);

  // Measure stage dimensions
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => observer.disconnect();
  }, []);

  // Virtual scroll (captured inside the stage)
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const handleWheel = e => {
      e.preventDefault();
      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [virtualScroll]);

  // Morph: circle → arc (scroll 0–600)
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // Scroll-driven arc rotation (scroll 600–2500)
  const scrollRotate = useTransform(virtualScroll, [600, 2500], [0, 360]);
  const smoothRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const handle = e => {
      const rect = el.getBoundingClientRect();
      const norm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(norm * 60);
    };
    el.addEventListener('mousemove', handle);
    return () => el.removeEventListener('mousemove', handle);
  }, [mouseX]);

  // Derived values for render loop
  const [morphVal, setMorphVal] = useState(0);
  const [rotateVal, setRotateVal] = useState(0);
  const [parallaxVal, setParallaxVal] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on('change', setMorphVal);
    const u2 = smoothRotate.on('change', setRotateVal);
    const u3 = smoothMouseX.on('change', setParallaxVal);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothRotate, smoothMouseX]);

  // Intro sequence: scatter → line → circle
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase('line'), 400);
    const t2 = setTimeout(() => setIntroPhase('circle'), 1800);
    const t3 = setTimeout(() => setTextVisible(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Stable random scatter positions
  const scatter = useMemo(() => SKILLS.map(() => ({
    x: (Math.random() - 0.5) * 1200,
    y: (Math.random() - 0.5) * 700,
    rotation: (Math.random() - 0.5) * 180,
    scale: 0.6,
    opacity: 0,
  })), []);

  return (
    <SkillsSection id="skills">
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
            / stack
          </motion.p>
          <H2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Con qué construyo
          </H2>
        </SectionHeader>

        {/* STAGE */}
        <Stage ref={stageRef}>
          <InnerStage>
            {/* CENTER TEXT — visible in circle phase, fades as cards morph to arc */}
            <CenterText style={{ opacity: textVisible ? Math.max(0, 1 - morphVal * 1.5) : 0 }}>
              <BigTitle>Mi Stack</BigTitle>
              <CenterSubtitle>// hover sobre las cartas para explorar</CenterSubtitle>
            </CenterText>

            {SKILLS.map((skill, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (introPhase === 'scatter') {
                target = scatter[i];

              } else if (introPhase === 'line') {
                const spacing = 76;
                const totalW = TOTAL * spacing;
                target = {
                  x: i * spacing - totalW / 2,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  opacity: 1,
                };

              } else {
                // Circle → Arc morph
                const isMobile = containerSize.width < 768;
                const minDim = Math.min(containerSize.width, containerSize.height);

                // A. Circle position
                const circleR = Math.min(minDim * 0.32, 210);
                const cAngle = (i / TOTAL) * 360;
                const cRad = (cAngle * Math.PI) / 180;
                const circlePos = {
                  x: Math.cos(cRad) * circleR,
                  y: Math.sin(cRad) * circleR,
                  rotation: cAngle + 90,
                };

                // B. Arc position
                const baseR = Math.min(containerSize.width, containerSize.height * 1.5);
                const arcR = baseR * (isMobile ? 1.4 : 1.0);
                const apexY = containerSize.height * 0.28;
                const arcCenterY = apexY + arcR;
                const spread = isMobile ? 100 : 130;
                const startAngle = -90 - spread / 2;
                const step = spread / (TOTAL - 1);
                const scrollProgress = Math.min(Math.max(rotateVal / 360, 0), 1);
                const boundedRot = -scrollProgress * spread * 0.8;
                const arcAngle = startAngle + i * step + boundedRot;
                const arcRad = (arcAngle * Math.PI) / 180;
                const arcPos = {
                  x: Math.cos(arcRad) * arcR + parallaxVal,
                  y: Math.sin(arcRad) * arcR + arcCenterY,
                  rotation: arcAngle + 90,
                  scale: isMobile ? 1.3 : 1.6,
                };

                // C. Interpolate
                target = {
                  x: lerp(circlePos.x, arcPos.x, morphVal),
                  y: lerp(circlePos.y, arcPos.y, morphVal),
                  rotation: lerp(circlePos.rotation, arcPos.rotation, morphVal),
                  scale: lerp(1, arcPos.scale, morphVal),
                  opacity: 1,
                };
              }

              return <FlipCard key={skill.name} skill={skill} target={target} />;
            })}
          </InnerStage>
        </Stage>

        {/* HINT */}
        <ScrollHint
          animate={{ opacity: morphVal > 0.6 ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          // hover & scroll inside to explore
        </ScrollHint>

      </Container>
    </SkillsSection>
  );
};

export default Skills;