import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,126,95,0.1) 0%, rgba(255,94,125,0.05) 70%, rgba(26,26,26,0) 100%);
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(254,180,123,0.1) 0%, rgba(255,126,95,0.05) 70%, rgba(26,26,26,0) 100%);
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const GradientSpan = styled.span`
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  color: white;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 126, 95, 0.2);
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--accent-gradient-1);
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 126, 95, 0.1);
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    color: white;
  }
`;

const ScrollDown = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
`;

const ScrollIcon = styled(motion.div)`
  font-size: 1.2rem;
  color: var(--accent-gradient-1);
`;

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hola, soy <GradientSpan>Nicolas Rodriguez</GradientSpan>
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Frontend Developer especializado en crear experiencias web interactivas y atractivas
        </HeroSubtitle>
        
        <HeroButtons
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PrimaryButton 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Proyectos
          </PrimaryButton>
          
          <SecondaryButton 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactame
          </SecondaryButton>
        </HeroButtons>
      </HeroContent>
      
      <ScrollDown
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <ScrollText>Scroll Down</ScrollText>
        <ScrollIcon
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaArrowDown />
        </ScrollIcon>
      </ScrollDown>
    </HeroContainer>
  );
};

export default Hero;
