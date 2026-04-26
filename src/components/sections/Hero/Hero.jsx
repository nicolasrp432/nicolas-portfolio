import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

// ─── Keyframes ────────────────────────────────────────────────────────────────

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 100dvh;
  background: var(--dark-bg);
`;

const BackgroundGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 25% 35%, rgba(124, 110, 240, 0.05) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 65%, rgba(255, 126, 95, 0.06) 0%, transparent 55%);
`;

const CenterContainer = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  gap: 1.1rem;
`;

// ─── Terminal Card ─────────────────────────────────────────────────────────────

const CardWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.6;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.55);
  max-width: 95vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
`;

const TerminalHeader = styled.div`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface-2);
  flex-shrink: 0;
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: inline-block;
`;

const TerminalLabel = styled.span`
  margin-left: auto;
  color: var(--text-tertiary);
  font-size: 0.75rem;
`;

const TerminalBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
  overflow: hidden;
`;

const TermLine = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  white-space: nowrap;
`;

const Cursor = styled.span`
  animation: ${blink} 1s step-end infinite;
  color: var(--accent-primary);
`;

const CardDim = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.45);
`;

// ─── Title Overlay ─────────────────────────────────────────────────────────────

const TitleRow = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  pointer-events: none;
  white-space: nowrap;
`;

const TitleWord = styled.span`
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(2.4rem, 5.5vw, 4.8rem);
  line-height: 1.1;
  color: var(--text-primary);
  will-change: transform;
  display: block;
`;

const GradientWord = styled(TitleWord)`
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// ─── Hints row ─────────────────────────────────────────────────────────────────

const HintsRow = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  pointer-events: none;
`;

const HintText = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-tertiary);
  letter-spacing: 0.05em;
  will-change: transform;
`;

// ─── Content after expansion ──────────────────────────────────────────────────

const ContentArea = styled.div`
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 0 7rem;
`;

const ContentFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const TextSide = styled.div`
  flex: 1;
  max-width: 650px;
`;

const ImageSide = styled.div`
  flex-shrink: 0;
  width: 100%;
  max-width: 300px;

  @media (min-width: 768px) {
    width: 320px;
    align-self: flex-end;
  }
`;

const PhotoWrapper = styled.div`
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4/5;
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    pointer-events: none;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: var(--transition);

  &:hover {
    transform: scale(1.03);
  }
`;


const AccentLine = styled.div`
  width: 40px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
  margin: 0.75rem 0 1.5rem;
`;

const HeroSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.05rem;
  max-width: 600px;
  line-height: 1.75;
  margin-bottom: 1.75rem;
`;

const ChipsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const Chip = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  background: var(--surface-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
`;

const CTARow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const BtnPrimary = styled.a`
  background: var(--gradient-primary);
  color: #fff;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-md);
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 126, 95, 0.25);
  }
`;

const BtnOutline = styled.a`
  background: transparent;
  border: 1.5px solid var(--border);
  color: var(--text-primary);
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-md);
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: var(--transition);

  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
`;

const ScrollArrow = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-tertiary);
  font-size: 1.1rem;
  z-index: 20;
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { prompt: '$', text: 'quien soy?', delay: 0.3, color: 'var(--text-primary)' },
  { prompt: '>', text: 'nicolas rodriguez', delay: 0.8, color: 'var(--accent-primary)' },
  { prompt: '$', text: 'que hago?', delay: 1.4, color: 'var(--text-primary)' },
  { prompt: '>', text: '{ "frontend": "React + TypeScript",', delay: 1.9, color: 'var(--color-code)' },
  { prompt: ' ', text: '  "ai_tools": ["Claude", "Gemini"],', delay: 2.3, color: 'var(--color-ai)' },
  { prompt: ' ', text: '  "learning": "42 School",', delay: 2.7, color: 'var(--accent-secondary)' },
  { prompt: ' ', text: '  "currently": "building solutions" }', delay: 3.1, color: 'var(--color-code)' },
  { prompt: '$', text: '', delay: 3.6, cursor: true, color: 'var(--accent-primary)' },
];

const STACK_CHIPS = ['React', 'IA', 'Automatización', '42 School'];

// ─── Component ────────────────────────────────────────────────────────────────

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [fullyExpanded, setFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      if (fullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setFullyExpanded(false);
        e.preventDefault();
      } else if (!fullyExpanded) {
        e.preventDefault();
        const next = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
      }
    };

    const onTouchStart = (e) => setTouchStartY(e.touches[0].clientY);

    const onTouchMove = (e) => {
      if (!touchStartY) return;
      const dy = touchStartY - e.touches[0].clientY;
      if (fullyExpanded && dy < -20 && window.scrollY <= 5) {
        setFullyExpanded(false);
        e.preventDefault();
      } else if (!fullyExpanded) {
        e.preventDefault();
        const next = Math.min(Math.max(scrollProgress + dy * (dy < 0 ? 0.008 : 0.005), 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => setTouchStartY(0);
    const onScroll = () => { if (!fullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll);
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [scrollProgress, fullyExpanded, touchStartY]);

  const cardW = 360 + scrollProgress * (isMobile ? 500 : 1100);
  const cardH = 252 + scrollProgress * (isMobile ? 250 : 450);
  const shift = scrollProgress * (isMobile ? 180 : 150);

  return (
    <HeroSection id="home">
      <BackgroundGlow />

      <CenterContainer>
        {/* ── Expanding terminal card ─────────────────────────────── */}
        <CardWrapper style={{ width: cardW, height: cardH }}>
          <TerminalHeader>
            <Dot $color="#ff5f57" />
            <Dot $color="#febc2e" />
            <Dot $color="#28c840" />
            <TerminalLabel>bash — nicolas@portfolio</TerminalLabel>
          </TerminalHeader>

          <TerminalBody>
            {TERMINAL_LINES.map((line, i) => (
              <TermLine
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: line.delay }}
              >
                <span style={{ color: 'var(--text-tertiary)', userSelect: 'none' }}>
                  {line.prompt}
                </span>
                <span style={{ color: line.color }}>
                  {line.text}
                  {line.cursor && <Cursor>█</Cursor>}
                </span>
              </TermLine>
            ))}
          </TerminalBody>

          <CardDim
            initial={{ opacity: 0.45 }}
            animate={{ opacity: 0.45 - scrollProgress * 0.45 }}
            transition={{ duration: 0.1 }}
          />
        </CardWrapper>

        {/* ── Title that splits apart ─────────────────────────────── */}
        <TitleRow>
          <TitleWord style={{ transform: `translateX(-${shift}vw)` }}>
            Construyo
          </TitleWord>
          <GradientWord style={{ transform: `translateX(${shift}vw)` }}>
            soluciones.
          </GradientWord>
        </TitleRow>

        {/* ── Hints that split apart ──────────────────────────────── */}
        <HintsRow>
          <HintText style={{ transform: `translateX(-${shift}vw)` }}>
            nicolas rodriguez
          </HintText>
          <HintText style={{ transform: `translateX(${shift}vw)` }}>
            ↓ scroll para explorar
          </HintText>
        </HintsRow>

        {/* ── Bounce arrow (visible only at start) ────────────────── */}
        {scrollProgress < 0.08 && (
          <ScrollArrow>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <FaArrowDown />
            </motion.div>
          </ScrollArrow>
        )}
      </CenterContainer>

      {/* ── Content revealed after full expansion ───────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      >
        <ContentArea>
          <ContentFlex>
            <TextSide>
              <p className="eyebrow">Desarrollador Frontend</p>
              <AccentLine />
              <HeroSubtitle>
                Soy Nicolás, desarrollador frontend enfocado en construir soluciones digitales claras y funcionales.
                <br /><br />
                Trabajo con React, inteligencia artificial y automatizaciones, combinando tecnología con criterio para crear productos útiles.
                <br /><br />
                Me interesa aprender constantemente, entender cómo funcionan las cosas y aplicar ese conocimiento en lo que construyo.
              </HeroSubtitle>
              <ChipsRow>
                {STACK_CHIPS.map(tag => <Chip key={tag}>{tag}</Chip>)}
              </ChipsRow>
              <CTARow>
                <BtnPrimary href="#projects">Ver proyectos</BtnPrimary>
                <BtnOutline href="#contact">Escribeme</BtnOutline>
              </CTARow>
            </TextSide>

            <ImageSide>
              <PhotoWrapper>
                <Photo
                  src="/fotonico.jpg"
                  alt="Nicolas Rodriguez - Desarrollador Frontend"
                  loading="lazy"
                />
              </PhotoWrapper>
            </ImageSide>
          </ContentFlex>
        </ContentArea>
      </motion.div>
    </HeroSection>
  );
};

export default Hero;
