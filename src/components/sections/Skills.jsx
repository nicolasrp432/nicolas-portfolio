import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, 
  FaSass, FaFigma, FaNpm, FaDocker
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiRedux, SiTailwindcss, 
  SiGraphql, SiJest, SiWebpack, SiFirebase
} from 'react-icons/si';

const SkillsContainer = styled.section`
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -200px;
    left: -200px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(254,180,123,0.08) 0%, rgba(255,126,95,0.04) 70%, rgba(26,26,26,0) 100%);
    z-index: 0;
  }
`;

const SkillsContent = styled.div`
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
  margin: 0 auto 4rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const SkillsCategory = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryTitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 3px;
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    border-radius: 2px;
  }
`;

const SkillsItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ color }) => color || 'var(--text-primary)'};
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SkillName = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const ProgressBars = styled.div`
  margin-top: 3rem;
`;

const ProgressItem = styled(motion.div)`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const ProgressTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
`;

const ProgressValue = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #333;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  border-radius: 4px;
  width: ${({ value }) => `${value}%`};
`;

const Skills = () => {
  const technicalSkills = [
    { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'React', icon: <FaReact />, color: '#61DAFB' },
    { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#FFFFFF' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
    { name: 'SASS', icon: <FaSass />, color: '#CC6699' },
    { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'GraphQL', icon: <SiGraphql />, color: '#E10098' },
    { name: 'Jest', icon: <SiJest />, color: '#C21325' },
  ];
  
  const toolsSkills = [
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
    { name: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
    { name: 'npm', icon: <FaNpm />, color: '#CB3837' },
    { name: 'Webpack', icon: <SiWebpack />, color: '#8DD6F9' },
    { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
  ];
  
  const expertiseAreas = [
    { title: 'Frontend Development', value: 95 },
    { title: 'Responsive Design', value: 90 },
    { title: 'UI/UX Implementation', value: 85 },
    { title: 'Performance Optimization', value: 80 },
    { title: 'Backend Integration', value: 75 },
  ];
  
  return (
    <SkillsContainer id="skills">
      <SkillsContent>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Mis Habilidades
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Tecnologías y herramientas que domino para crear experiencias web excepcionales
        </SectionSubtitle>
        
        <SkillsGrid>
          <SkillsCategory>
            <CategoryTitle
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Tecnologías
            </CategoryTitle>
            
            <SkillsItems>
              {technicalSkills.map((skill, index) => (
                <SkillItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <SkillIcon color={skill.color}>
                    {skill.icon}
                  </SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                </SkillItem>
              ))}
            </SkillsItems>
            
            <CategoryTitle
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ marginTop: '3rem' }}
            >
              Herramientas
            </CategoryTitle>
            
            <SkillsItems>
              {toolsSkills.map((skill, index) => (
                <SkillItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index + 0.3 }}
                >
                  <SkillIcon color={skill.color}>
                    {skill.icon}
                  </SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                </SkillItem>
              ))}
            </SkillsItems>
          </SkillsCategory>
          
          <SkillsCategory>
            <CategoryTitle
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Áreas de Especialización
            </CategoryTitle>
            
            <ProgressBars>
              {expertiseAreas.map((area, index) => (
                <ProgressItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <ProgressHeader>
                    <ProgressTitle>{area.title}</ProgressTitle>
                    <ProgressValue>{area.value}%</ProgressValue>
                  </ProgressHeader>
                  <ProgressBarContainer>
                    <ProgressBarFill
                      value={area.value}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 * index }}
                    />
                  </ProgressBarContainer>
                </ProgressItem>
              ))}
            </ProgressBars>
            
            <CategoryTitle
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ marginTop: '3rem' }}
            >
              Soft Skills
            </CategoryTitle>
            
            <ProgressBars>
              <ProgressItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ProgressHeader>
                  <ProgressTitle>Trabajo en Equipo</ProgressTitle>
                  <ProgressValue>95%</ProgressValue>
                </ProgressHeader>
                <ProgressBarContainer>
                  <ProgressBarFill
                    value={95}
                    initial={{ width: 0 }}
                    whileInView={{ width: '95%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </ProgressBarContainer>
              </ProgressItem>
              
              <ProgressItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ProgressHeader>
                  <ProgressTitle>Comunicación</ProgressTitle>
                  <ProgressValue>90%</ProgressValue>
                </ProgressHeader>
                <ProgressBarContainer>
                  <ProgressBarFill
                    value={90}
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </ProgressBarContainer>
              </ProgressItem>
              
              <ProgressItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ProgressHeader>
                  <ProgressTitle>Resolución de Problemas</ProgressTitle>
                  <ProgressValue>92%</ProgressValue>
                </ProgressHeader>
                <ProgressBarContainer>
                  <ProgressBarFill
                    value={92}
                    initial={{ width: 0 }}
                    whileInView={{ width: '92%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                </ProgressBarContainer>
              </ProgressItem>
              
              <ProgressItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ProgressHeader>
                  <ProgressTitle>Adaptabilidad</ProgressTitle>
                  <ProgressValue>88%</ProgressValue>
                </ProgressHeader>
                <ProgressBarContainer>
                  <ProgressBarFill
                    value={88}
                    initial={{ width: 0 }}
                    whileInView={{ width: '88%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </ProgressBarContainer>
              </ProgressItem>
            </ProgressBars>
          </SkillsCategory>
        </SkillsGrid>
      </SkillsContent>
    </SkillsContainer>
  );
};

export default Skills;
