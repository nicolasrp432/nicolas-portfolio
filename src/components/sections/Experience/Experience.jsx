import { useState, Suspense, Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Gallery Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#ff7e5f',
          background: 'rgba(0,0,0,0.8)',
          zIndex: 10,
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <h3>Error al cargar la galería 3D</h3>
            <p>{this.state.error?.message || "Error desconocido"}</p>
            <button onClick={() => window.location.reload()} style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#ff7e5f',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer'
            }}>
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaMouse } from 'react-icons/fa';
import InfiniteGallery from '../../ui/InfiniteGallery';

// ─── Gallery images (tech / coding themed) ───────────────────────────────────

const GALLERY_IMAGES = [
  { src: '/fotonico.jpg', alt: 'code' },
  { src: '/fotonico.jpg', alt: 'code' },
  { src: '/fotonico.jpg', alt: 'code' },
  { src: '/fotonico.jpg', alt: 'code' },
  { src: '/fotonico.jpg', alt: 'code' },
  { src: '/fotonico.jpg', alt: 'code' },
  { src: '/fotonico.jpg', alt: 'code' },
  { src: '/fotonico.jpg', alt: 'code' },
  { src: '/fotonico.jpg', alt: 'code' },
  { src: '/fotonico.jpg', alt: 'code' },
];

// ─── Styled components ────────────────────────────────────────────────────────

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  background: var(--dark-bg);
  overflow: hidden;
`;

const GalleryBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.55;
`;

const EdgeVignette = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(to bottom,  var(--dark-bg) 0%,  transparent 18%),
    linear-gradient(to top,     var(--dark-bg) 0%,  transparent 18%),
    linear-gradient(to right,   var(--dark-bg) 0%,  transparent 12%),
    linear-gradient(to left,    var(--dark-bg) 0%,  transparent 12%);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 0 6rem;

  @media (max-width: 768px) {
    padding: 5rem 0 4rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
  text-align: center;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    width: 50px;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: 2px;
    transform: translateX(-50%);
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
  max-width: 600px;
  margin: 0 auto 1.5rem;
`;

const SectionIntro = styled.div`
  max-width: 560px;
  margin: 0 auto 2.5rem;
  text-align: center;
`;

const AnimatedIntro = styled(motion.p)`
  font-family: var(--font-main);
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.75;
  font-style: italic;
  opacity: 0.85;
`;

const TitleWrap = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Tabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.35rem;
    margin-bottom: 2rem;
  }
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  min-height: 44px;
  background: ${({ $active }) => $active ? 'rgba(255,126,95,0.15)' : 'rgba(21,21,21,0.7)'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(255,126,95,0.5)' : 'rgba(42,42,42,0.8)'};
  border-radius: var(--radius-md);
  color: ${({ $active }) => $active ? 'var(--accent-primary)' : 'var(--text-secondary)'};
  font-family: var(--font-mono);
  font-size: 0.82rem;
  cursor: pointer;
  transition: var(--transition);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &:hover {
    border-color: rgba(255,126,95,0.4);
    color: var(--accent-primary);
    background: rgba(255,126,95,0.1);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const Card = styled(motion.div)`
  background: rgba(15, 15, 15, 0.82);
  border: 1px solid rgba(42, 42, 42, 0.85);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  &:hover {
    border-color: rgba(255, 126, 95, 0.35);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
    transform: translateY(-4px);
  }
`;

const CardIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: rgba(255, 126, 95, 0.12);
  border: 1px solid rgba(255, 126, 95, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
  font-size: 1rem;
  flex-shrink: 0;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
`;

const CardHeaderText = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.2rem;
  line-height: 1.3;
`;

const CardOrg = styled.p`
  font-size: 0.85rem;
  color: var(--accent-secondary);
  font-weight: 500;
  margin: 0;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-tertiary);

  svg { color: var(--accent-primary); flex-shrink: 0; }
`;

const CardDesc = styled.p`
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.65;
  flex: 1;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
`;

const Tag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 0.2rem 0.6rem;
  background: rgba(37, 37, 37, 0.9);
  border: 1px solid rgba(42, 42, 42, 0.8);
  border-radius: var(--radius-sm);
  color: var(--text-tertiary);
`;

const GalleryHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    org: 'Tech Innovations Inc.',
    location: 'Madrid, España',
    date: 'Enero 2022 – Presente',
    description: 'Lidero el desarrollo de interfaces para aplicaciones web de alto rendimiento. Arquitecturas escalables, optimización y code reviews.',
    tags: ['React', 'TypeScript', 'Next.js', 'Redux'],
    icon: <FaBriefcase />,
  },
  {
    id: 2,
    title: 'Frontend Developer',
    org: 'Digital Solutions',
    location: 'Barcelona, España',
    date: 'Mar 2019 – Dic 2021',
    description: 'Desarrollé y mantuve múltiples sitios y apps para clientes de distintos sectores. Implementé mejoras de UX/UI y nuevas características.',
    tags: ['React', 'JavaScript', 'SASS', 'REST API'],
    icon: <FaBriefcase />,
  },
  {
    id: 3,
    title: 'Web Developer',
    org: 'Creative Agency',
    location: 'Valencia, España',
    date: 'Jun 2017 – Feb 2019',
    description: 'Desarrollo de sitios responsivos desde Figma. Colaboración directa con el equipo de diseño para mejorar la experiencia de usuario.',
    tags: ['HTML/CSS', 'JavaScript', 'WordPress', 'jQuery'],
    icon: <FaBriefcase />,
  },
];

const EDUCATION = [
  {
    id: 0,
    title: '42 School',
    org: 'Red Global de Escuelas 42',
    location: 'Cursando',
    date: '2024 – Presente',
    description: 'Modelo peer-to-peer sin profesores. Formación en C, Unix y algoritmos. Aprendo resolviendo, colaborando y fallando hacia adelante.',
    tags: ['C', 'Unix', 'Algoritmos', 'Peer Learning'],
    icon: <FaGraduationCap />,
  },
  {
    id: 1,
    title: 'Máster en Desarrollo Web',
    org: 'Universidad Tecnológica',
    location: 'Madrid, España',
    date: '2016 – 2017',
    description: 'Tecnologías web modernas, arquitectura de aplicaciones y UX. Proyecto final: plataforma de e-learning con React y Node.js.',
    tags: ['Frontend', 'Backend', 'UX/UI', 'Arquitectura'],
    icon: <FaGraduationCap />,
  },
  {
    id: 2,
    title: 'Grado en Ing. Informática',
    org: 'Universidad Politécnica',
    location: 'Valencia, España',
    date: '2012 – 2016',
    description: 'Ciencias de la computación, algoritmos, estructuras de datos y desarrollo de software. Especialización en desarrollo web.',
    tags: ['Programación', 'Algoritmos', 'BD', 'Software'],
    icon: <FaGraduationCap />,
  },
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: 'AWS Certified Developer',
    org: 'Amazon Web Services',
    location: 'Online',
    date: 'Diciembre 2022',
    description: 'Desarrollo, implementación y depuración de aplicaciones en la nube. Serverless, Lambda, y servicios managed de AWS.',
    tags: ['Cloud', 'AWS', 'Serverless', 'DevOps'],
    icon: <FaGraduationCap />,
  },
  {
    id: 2,
    title: 'Professional React Developer',
    org: 'React Training',
    location: 'Online',
    date: 'Marzo 2021',
    description: 'Patrones avanzados de React, optimización de rendimiento y arquitectura de aplicaciones complejas con Redux.',
    tags: ['React', 'Redux', 'Performance', 'Testing'],
    icon: <FaGraduationCap />,
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    org: 'Design Academy',
    location: 'Online',
    date: 'Septiembre 2020',
    description: 'Principios de diseño de interfaces, experiencia de usuario, prototipado con Figma y testing con usuarios reales.',
    tags: ['UI', 'UX', 'Figma', 'Prototyping'],
    icon: <FaGraduationCap />,
  },
];

const TAB_CONFIG = [
  { key: 'experience', label: 'Experiencia', icon: <FaBriefcase />, data: EXPERIENCE },
  { key: 'education', label: 'Educación', icon: <FaGraduationCap />, data: EDUCATION },
  { key: 'certifications', label: 'Formación Extra', icon: <FaGraduationCap />, data: CERTIFICATIONS },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.1 } }),
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

const Experience = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const activeData = TAB_CONFIG.find((t) => t.key === activeTab)?.data ?? EXPERIENCE;

  return (
    <Section id="experience">
      {/* 3D gallery — background layer */}
      <GalleryBg>
        <ErrorBoundary>
          <Suspense fallback={
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--text-tertiary)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)'
            }}>
              Cargando galería 3D...
            </div>
          }>
            <InfiniteGallery
              images={GALLERY_IMAGES}
              speed={0.9}
              visibleCount={10}
            />
          </Suspense>
        </ErrorBoundary>
      </GalleryBg>


      {/* Edge vignette so content stays readable */}
      <EdgeVignette />

      <Content>
        <TitleWrap>
          <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            / experiencia
          </p>

          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experiencia & Educación
          </SectionTitle>

          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Mi trayectoria profesional y formación académica
          </SectionSubtitle>

          <SectionIntro>
            <AnimatedIntro
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              De la teoría a la práctica. Aquí está el camino construido.
            </AnimatedIntro>
          </SectionIntro>
        </TitleWrap>

        <Tabs
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {TAB_CONFIG.map(({ key, label, icon }) => (
            <Tab key={key} $active={activeTab === key} onClick={() => setActiveTab(key)}>
              {icon} {label}
            </Tab>
          ))}
        </Tabs>

        <AnimatePresence mode="wait">
          <CardGrid key={activeTab}>
            {activeData.map((item, i) => (
              <Card
                key={item.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <CardHeader>
                  <CardIcon>{item.icon}</CardIcon>
                  <CardHeaderText>
                    <CardTitle>{item.title}</CardTitle>
                    <CardOrg>{item.org}</CardOrg>
                  </CardHeaderText>
                </CardHeader>

                <MetaRow>
                  <MetaItem><FaCalendarAlt /> {item.date}</MetaItem>
                  <MetaItem><FaMapMarkerAlt /> {item.location}</MetaItem>
                </MetaRow>

                <CardDesc>{item.description}</CardDesc>

                <TagRow>
                  {item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </TagRow>
              </Card>
            ))}
          </CardGrid>
        </AnimatePresence>

        <GalleryHint>
          <FaMouse />
          Pasa el cursor sobre la galería y usa la rueda del ratón para explorar
        </GalleryHint>
      </Content>
    </Section>
  );
};

export default Experience;
