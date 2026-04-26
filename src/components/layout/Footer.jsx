import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// ─── Styled Components ────────────────────────────────────────────────────────

const FooterContainer = styled.footer`
  background: var(--dark-bg);
  border-top: 1px solid var(--border);
  padding: var(--space-xl) 0 var(--space-lg);
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
`;

const LogoRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

const Tagline = styled.p`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-tertiary);
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--text-secondary);
  transition: var(--transition);

  &:hover {
    background: var(--gradient-primary);
    border-color: transparent;
    color: white;
  }
`;

const Copyright = styled.p`
  font-family: var(--font-main);
  font-size: 0.8rem;
  color: var(--text-tertiary);
`;

const StackCredit = styled.p`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-tertiary);
  opacity: 0.5;
`;

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>

        <LogoRow>
          <span
            className="gradient-text"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem' }}
          >
            N.
          </span>
          <span
            style={{ fontFamily: 'var(--font-main)', fontWeight: 400, color: 'var(--text-secondary)', fontSize: '0.95rem' }}
          >
            Rodriguez
          </span>
        </LogoRow>

        <Tagline>Construyendo soluciones digitales.</Tagline>

        <SocialRow>
          <SocialLink
            href="https://github.com/nicolasrp432"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </SocialLink>
          <SocialLink
            href="https://linkedin.com/in/nicolasrodriguez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </SocialLink>
        </SocialRow>

        <Copyright>© {currentYear} Nicolas Rodriguez</Copyright>

        <StackCredit>Construido con React + Vite</StackCredit>

      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
