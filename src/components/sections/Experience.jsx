import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ExperienceContainer = styled.section`
  padding: 8rem 0;
  background-color: #1c1c1c;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -200px;
    right: -200px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,94,125,0.08) 0%, rgba(255,126,95,0.04) 70%, rgba(26,26,26,0) 100%);
    z-index: 0;
  }
`;

const ExperienceContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    width: 50px;
    height: 4px;
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    border-radius: 2px;
    transform: translateX(-50%);
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
`;

const TabsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid #333;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  color: ${({ active }) => active ? 'var(--accent-gradient-1)' : 'var(--text-secondary)'};
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 3px;
    background: ${({ active }) => active ? 'linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2))' : 'transparent'};
    transition: var(--transition);
  }
  
  &:hover {
    color: var(--accent-gradient-1);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
  }
`;

const TabIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.2rem;
  vertical-align: middle;
`;

const TimelineContainer = styled(motion.div)`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    height: 100%;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent-gradient-1), var(--accent-gradient-2));
    
    @media (min-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (min-width: 768px) {
    width: 50%;
    margin-left: ${({ position }) => position === 'right' ? '50%' : '0'};
    padding-left: ${({ position }) => position === 'right' ? '3rem' : '0'};
    padding-right: ${({ position }) => position === 'left' ? '3rem' : '0'};
    text-align: ${({ position }) => position === 'left' ? 'right' : 'left'};
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  top: 0;
  left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  z-index: 2;
  
  @media (min-width: 768px) {
    left: ${({ position }) => position === 'right' ? '-20px' : 'auto'};
    right: ${({ position }) => position === 'left' ? '-20px' : 'auto'};
  }
`;

const TimelineContent = styled.div`
  background-color: #252525;
  border-radius: 10px;
  padding: 1.5rem;
  margin-left: 60px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    margin-left: 0;
  }
`;

const TimelineDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-gradient-1);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    justify-content: ${({ position }) => position === 'left' ? 'flex-end' : 'flex-start'};
  }
`;

const TimelineTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const TimelineSubtitle = styled.h4`
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (min-width: 768px) {
    justify-content: ${({ position }) => position === 'left' ? 'flex-end' : 'flex-start'};
  }
`;

const TimelineDescription = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const TimelineTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (min-width: 768px) {
    justify-content: ${({ position }) => position === 'left' ? 'flex-end' : 'flex-start'};
  }
`;

const TimelineTag = styled.span`
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  background-color: #333;
  border-radius: 50px;
  color: var(--text-secondary);
`;

const Experience = () => {
  const [activeTab, setActiveTab] = useState('experience');
  
  const experienceData = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      location: 'Madrid, España',
      date: 'Enero 2022 - Presente',
      description: 'Lidero el desarrollo de interfaces de usuario para aplicaciones web de alto rendimiento. Implemento arquitecturas escalables y optimizo el rendimiento de aplicaciones existentes.',
      tags: ['React', 'TypeScript', 'Next.js', 'Redux'],
      position: 'right',
      icon: <FaBriefcase />
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Solutions',
      location: 'Barcelona, España',
      date: 'Marzo 2019 - Diciembre 2021',
      description: 'Desarrollé y mantuve múltiples sitios web y aplicaciones para clientes de diversos sectores. Colaboré en la implementación de nuevas características y mejoras de UX/UI.',
      tags: ['React', 'JavaScript', 'SASS', 'REST API'],
      position: 'left',
      icon: <FaBriefcase />
    },
    {
      id: 3,
      title: 'Web Developer',
      company: 'Creative Agency',
      location: 'Valencia, España',
      date: 'Junio 2017 - Febrero 2019',
      description: 'Trabajé en el desarrollo de sitios web responsivos para clientes de la agencia. Implementé diseños desde Figma y colaboré con el equipo de diseño para mejorar la experiencia de usuario.',
      tags: ['HTML/CSS', 'JavaScript', 'WordPress', 'jQuery'],
      position: 'right',
      icon: <FaBriefcase />
    },
  ];
  
  const educationData = [
    {
      id: 1,
      title: 'Máster en Desarrollo Web',
      institution: 'Universidad Tecnológica',
      location: 'Madrid, España',
      date: '2016 - 2017',
      description: 'Especialización en tecnologías web modernas, arquitectura de aplicaciones y experiencia de usuario. Proyecto final: Plataforma de e-learning con React y Node.js.',
      tags: ['Frontend', 'Backend', 'UX/UI', 'Arquitectura Web'],
      position: 'right',
      icon: <FaGraduationCap />
    },
    {
      id: 2,
      title: 'Grado en Ingeniería Informática',
      institution: 'Universidad Politécnica',
      location: 'Valencia, España',
      date: '2012 - 2016',
      description: 'Formación integral en ciencias de la computación, algoritmos, estructuras de datos y desarrollo de software. Especialización en desarrollo web y aplicaciones.',
      tags: ['Programación', 'Algoritmos', 'Bases de Datos', 'Desarrollo Web'],
      position: 'left',
      icon: <FaGraduationCap />
    },
  ];
  
  const certificationData = [
    {
      id: 1,
      title: 'AWS Certified Developer',
      institution: 'Amazon Web Services',
      location: 'Online',
      date: 'Diciembre 2022',
      description: 'Certificación que valida la experiencia en desarrollo, implementación y depuración de aplicaciones basadas en la nube utilizando AWS.',
      tags: ['Cloud', 'AWS', 'Serverless', 'DevOps'],
      position: 'right',
      icon: <FaGraduationCap />
    },
    {
      id: 2,
      title: 'Professional React Developer',
      institution: 'React Training',
      location: 'Online',
      date: 'Marzo 2021',
      description: 'Certificación avanzada en desarrollo con React, incluyendo patrones de diseño, optimización de rendimiento y arquitectura de aplicaciones complejas.',
      tags: ['React', 'Redux', 'Performance', 'Testing'],
      position: 'left',
      icon: <FaGraduationCap />
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      institution: 'Design Academy',
      location: 'Online',
      date: 'Septiembre 2020',
      description: 'Formación en principios de diseño de interfaces, experiencia de usuario, prototipado y testing con usuarios reales.',
      tags: ['UI', 'UX', 'Figma', 'Prototyping'],
      position: 'right',
      icon: <FaGraduationCap />
    },
  ];
  
  const renderData = () => {
    let data;
    
    switch(activeTab) {
      case 'experience':
        data = experienceData;
        break;
      case 'education':
        data = educationData;
        break;
      case 'certifications':
        data = certificationData;
        break;
      default:
        data = experienceData;
    }
    
    return (
      <TimelineContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {data.map((item) => (
          <TimelineItem 
            key={item.id}
            position={item.position}
            initial={{ opacity: 0, x: item.position === 'left' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * item.id }}
          >
            <TimelineDot position={item.position}>
              {item.icon}
            </TimelineDot>
            <TimelineContent>
              <TimelineDate position={item.position}>
                <FaCalendarAlt />
                {item.date}
              </TimelineDate>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineSubtitle position={item.position}>
                {item.company || item.institution}
                <FaMapMarkerAlt />
                {item.location}
              </TimelineSubtitle>
              <TimelineDescription>{item.description}</TimelineDescription>
              <TimelineTags position={item.position}>
                {item.tags.map((tag, index) => (
                  <TimelineTag key={index}>{tag}</TimelineTag>
                ))}
              </TimelineTags>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    );
  };
  
  return (
    <ExperienceContainer id="experience">
      <ExperienceContent>
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
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Mi trayectoria profesional y formación académica
        </SectionSubtitle>
        
        <TabsContainer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tab 
            active={activeTab === 'experience'} 
            onClick={() => setActiveTab('experience')}
          >
            <TabIcon><FaBriefcase /></TabIcon>
            Experiencia
          </Tab>
          <Tab 
            active={activeTab === 'education'} 
            onClick={() => setActiveTab('education')}
          >
            <TabIcon><FaGraduationCap /></TabIcon>
            Educación
          </Tab>
          <Tab 
            active={activeTab === 'certifications'} 
            onClick={() => setActiveTab('certifications')}
          >
            <TabIcon><FaGraduationCap /></TabIcon>
            Certificaciones
          </Tab>
        </TabsContainer>
        
        {renderData()}
      </ExperienceContent>
    </ExperienceContainer>
  );
};

export default Experience;
