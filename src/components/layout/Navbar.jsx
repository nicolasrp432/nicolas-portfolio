import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: ${({ scrolled }) => scrolled ? 'rgba(26, 26, 26, 0.95)' : 'transparent'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  transition: var(--transition);
  padding: ${({ scrolled }) => scrolled ? '1rem 0' : '1.5rem 0'};
  box-shadow: ${({ scrolled }) => scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 101;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
    width: 100%;
    height: 100vh;
    background-color: var(--dark-bg);
    flex-direction: column;
    justify-content: center;
    transition: var(--transition);
    z-index: 100;
  }
`;

const NavLink = styled(motion.div)`
  margin: 0 1.5rem;
  
  @media (max-width: 768px) {
    margin: 1.5rem 0;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    transition: var(--transition);
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 101;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <NavbarContainer scrolled={scrolled}>
      <NavContent>
        <Logo to="/">Nicolas Rodriguez</Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <NavLinks isOpen={isOpen}>
          <motion.div
            variants={navVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}
          >
            <NavLink variants={linkVariants}>
              <StyledLink to="/" onClick={closeMenu}>Inicio</StyledLink>
            </NavLink>
            <NavLink variants={linkVariants}>
              <StyledLink to="/about" onClick={closeMenu}>Sobre Mí</StyledLink>
            </NavLink>
            <NavLink variants={linkVariants}>
              <StyledLink to="/projects" onClick={closeMenu}>Proyectos</StyledLink>
            </NavLink>
            <NavLink variants={linkVariants}>
              <StyledLink to="/skills" onClick={closeMenu}>Habilidades</StyledLink>
            </NavLink>
            <NavLink variants={linkVariants}>
              <StyledLink to="/experience" onClick={closeMenu}>Experiencia</StyledLink>
            </NavLink>
            <NavLink variants={linkVariants}>
              <StyledLink to="/contact" onClick={closeMenu}>Contacto</StyledLink>
            </NavLink>
          </motion.div>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
