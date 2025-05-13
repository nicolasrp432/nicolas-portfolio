import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #121212;
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterLogo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  
  @media (max-width: 768px) {
    margin: 1rem 0;
    align-items: center;
  }
`;

const LinkTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const Link = styled.a`
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--accent-gradient-1);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const SocialIcon = styled.a`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin: 0 1rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--accent-gradient-1);
    transform: translateY(-3px);
  }
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  text-align: center;
  font-size: 0.9rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>Nicolas Rodriguez</FooterLogo>
        
        <FooterLinks>
          <LinkColumn>
            <LinkTitle>Navegación</LinkTitle>
            <Link href="/">Inicio</Link>
            <Link href="/about">Sobre Mí</Link>
            <Link href="/projects">Proyectos</Link>
            <Link href="/skills">Habilidades</Link>
          </LinkColumn>
          
          <LinkColumn>
            <LinkTitle>Contacto</LinkTitle>
            <Link href="mailto:contact@nicolasrodriguez.dev">contact@nicolasrodriguez.dev</Link>
            <Link href="tel:+123456789">+12 345 6789</Link>
          </LinkColumn>
        </FooterLinks>
        
        <SocialIcons>
          <SocialIcon href="https://github.com/nicolasrodriguez" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="https://linkedin.com/in/nicolasrodriguez" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialIcon>
          <SocialIcon href="https://twitter.com/nicolasrodriguez" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="mailto:contact@nicolasrodriguez.dev">
            <FaEnvelope />
          </SocialIcon>
        </SocialIcons>
        
        <Copyright>
          &copy; {currentYear} Nicolas Rodriguez. Todos los derechos reservados.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
