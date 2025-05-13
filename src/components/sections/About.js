import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaUserTie, FaLightbulb } from 'react-icons/fa';

const AboutContainer = styled.section`
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -200px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,94,125,0.08) 0%, rgba(255,126,95,0.04) 70%, rgba(26,26,26,0) 100%);
    z-index: -1;
    transform: translateY(-50%);
  }
`;

const AboutContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 4rem;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  width: 100%;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutImage = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  height: 500px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, rgba(255,126,95,0.2), rgba(255,94,125,0.2));
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 992px) {
    height: 400px;
  }
`;

const AboutImageBorder = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  z-index: 2;
  pointer-events: none;
`;

const AboutInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AboutTitle = styled(motion.h3)`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  
  span {
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const AboutDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const AboutFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const FeatureIcon = styled.div`
  font-size: 1.5rem;
  color: var(--accent-gradient-1);
  background: rgba(255, 126, 95, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureText = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
`;

const AboutCTA = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  color: white;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 126, 95, 0.2);
  }
`;

const About = () => {
  return (
    <AboutContainer id="about">
      <AboutContent>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Sobre Mí
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Conozca más sobre mi trayectoria, pasión y enfoque en el desarrollo frontend
        </SectionSubtitle>
        
        <AboutGrid>
          <AboutImage
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Nicolas Rodriguez" />
            <AboutImageBorder />
          </AboutImage>
          
          <AboutInfo>
            <AboutTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Creando <span>experiencias digitales</span> memorables
            </AboutTitle>
            
            <AboutDescription
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Soy un desarrollador frontend apasionado con más de 5 años de experiencia creando interfaces de usuario atractivas e interactivas. Mi enfoque combina diseño estético con funcionalidad intuitiva para ofrecer experiencias de usuario excepcionales.
              <br /><br />
              Mi objetivo es transformar ideas complejas en soluciones digitales elegantes y accesibles que no solo cumplan con los requisitos técnicos, sino que también deleiten a los usuarios finales.
            </AboutDescription>
            
            <AboutFeatures>
              <FeatureItem
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <FeatureIcon>
                  <FaLaptopCode />
                </FeatureIcon>
                <FeatureText>
                  <h4>Desarrollo Moderno</h4>
                  <p>Utilizando las últimas tecnologías y frameworks</p>
                </FeatureText>
              </FeatureItem>
              
              <FeatureItem
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <FeatureIcon>
                  <FaUserTie />
                </FeatureIcon>
                <FeatureText>
                  <h4>Enfoque Profesional</h4>
                  <p>Comprometido con la calidad y los plazos</p>
                </FeatureText>
              </FeatureItem>
              
              <FeatureItem
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <FeatureIcon>
                  <FaLightbulb />
                </FeatureIcon>
                <FeatureText>
                  <h4>Soluciones Creativas</h4>
                  <p>Resolviendo problemas con ideas innovadoras</p>
                </FeatureText>
              </FeatureItem>
            </AboutFeatures>
            
            <AboutCTA
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Descargar CV
            </AboutCTA>
          </AboutInfo>
        </AboutGrid>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;
