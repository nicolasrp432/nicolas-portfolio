import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
`;

const NotFoundTitle = styled(motion.h1)`
  font-size: 8rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const NotFoundSubtitle = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NotFoundText = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
`;

const HomeButton = styled(motion.div)`
  a {
    display: inline-block;
    padding: 1rem 2rem;
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    color: white;
    border-radius: 50px;
    font-weight: 500;
    transition: var(--transition);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(255, 126, 95, 0.2);
    }
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </NotFoundTitle>
      
      <NotFoundSubtitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Página no encontrada
      </NotFoundSubtitle>
      
      <NotFoundText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        La página que estás buscando no existe o ha sido movida a otra ubicación.
      </NotFoundText>
      
      <HomeButton
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/">Volver al Inicio</Link>
      </HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
