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
  background: ${({ $scrolled }) => $scrolled ? 'rgba(15,15,15,0.92)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${({ $scrolled }) => $scrolled ? '1px solid var(--border)' : 'none'};
  padding: ${({ $scrolled }) => $scrolled ? '1rem 0' : '1.5rem 0'};
  transition: var(--transition);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 101;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => $isOpen ? '0' : '-100%'};
    width: 100%;
    height: 100vh;
    background-color: var(--dark-bg);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    transition: var(--transition);
    z-index: 100;
  }
`;

const NavLink = styled(motion.div)`
  margin: 0 1rem;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const StyledLink = styled.a`
  font-family: var(--font-main);
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  position: relative;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: var(--text-primary);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 2px;
    background: var(--accent-primary);
    transition: width 0.2s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: none;
    color: var(--text-primary);
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

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <NavbarContainer $scrolled={scrolled}>
      <NavContent>
        <Logo to="/">
          <span className="gradient-text" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.6rem' }}>N.</span>
          <span style={{ fontFamily: 'var(--font-main)', fontWeight: 400, color: 'var(--text-secondary)', fontSize: '1rem' }}>Rodriguez</span>
        </Logo>

        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <NavLinks $isOpen={isOpen}>
          <NavLink variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.05 }}>
            <StyledLink href="/" onClick={closeMenu}>Inicio</StyledLink>
          </NavLink>
          <NavLink variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <StyledLink href="/#projects" onClick={closeMenu}>Trabajo</StyledLink>
          </NavLink>
          <NavLink variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
            <StyledLink href="/#skills" onClick={closeMenu}>Stack</StyledLink>
          </NavLink>
          <NavLink variants={linkVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <StyledLink href="/#contact" onClick={closeMenu}>Contacto</StyledLink>
          </NavLink>
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
