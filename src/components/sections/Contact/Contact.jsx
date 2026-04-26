import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaCheckCircle } from 'react-icons/fa';

// ─── Styled Components ────────────────────────────────────────────────────────

const ContactSection = styled.section`
  padding: var(--space-3xl) 0;
  background: var(--surface-2);
  position: relative;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-2xl);
`;

const H2 = styled(motion.h2)`
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0.5rem 0 0.75rem;
`;

const HeaderSubtitle = styled(motion.p)`
  color: var(--text-secondary);
  max-width: 480px;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.7;
`;

// ─── Grid ─────────────────────────────────────────────────────────────────────

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2xl);
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
`;

// ─── Left Column ──────────────────────────────────────────────────────────────

const ContactTitle = styled(motion.h3)`
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem;
`;

const ContactText = styled(motion.p)`
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: var(--surface-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--accent-primary);
  flex-shrink: 0;
`;

const ContactItemContent = styled.div`
  h4 {
    font-size: 0.8rem;
    font-family: var(--font-mono);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.2rem;
  }

  a, p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    transition: var(--transition);
  }

  a:hover {
    color: var(--accent-primary);
  }
`;

const AvailabilityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const GreenDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-code);
  display: inline-block;
  flex-shrink: 0;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  width: 42px;
  height: 42px;
  background: var(--surface-3);
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

// ─── Form ─────────────────────────────────────────────────────────────────────

const ContactForm = styled(motion.form)`
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const FormLabel = styled.label`
  display: block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const inputBase = `
  width: 100%;
  padding: 0.85rem 1rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-main);
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(255, 126, 95, 0.1);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
`;

const FormInput = styled.input`${inputBase}`;

const FormTextarea = styled.textarea`
  ${inputBase}
  min-height: 140px;
  resize: vertical;
`;

const BtnPrimary = styled.button`
  width: 100%;
  background: var(--gradient-primary);
  color: white;
  padding: 0.85rem 1.75rem;
  border-radius: var(--radius-md);
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 126, 95, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: var(--space-xl);
  text-align: center;
`;

// ─── Component ────────────────────────────────────────────────────────────────

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <ContactSection id="contact">
      <Container>

        {/* HEADER */}
        <SectionHeader>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            / contacto
          </motion.p>
          <H2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ¿Tienes algo que construir?
          </H2>
          <HeaderSubtitle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Cuéntame tu proyecto. Si puedo ayudarte, lo hacemos.
          </HeaderSubtitle>
        </SectionHeader>

        <ContactGrid>

          {/* LEFT — Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactTitle>Hablemos directamente</ContactTitle>

            <ContactText>
              Estoy disponible para proyectos freelance, colaboraciones y consultoría.
              Prefiero hablar claro desde el inicio.
            </ContactText>

            <ContactItems>
              <ContactItem
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ContactIcon><FaEnvelope /></ContactIcon>
                <ContactItemContent>
                  <h4>Email</h4>
                  <a href="mailto:nicolasrp432@gmail.com">nicolasrp432@gmail.com</a>
                </ContactItemContent>
              </ContactItem>

              <ContactItem
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ContactIcon><FaMapMarkerAlt /></ContactIcon>
                <ContactItemContent>
                  <h4>Ubicación</h4>
                  <p>Madrid, España</p>
                </ContactItemContent>
              </ContactItem>
            </ContactItems>

            <AvailabilityBadge>
              <GreenDot />
              <span
                className="mono"
                style={{ color: 'var(--color-code)', fontSize: '0.8rem' }}
              >
                Disponible para proyectos
              </span>
            </AvailabilityBadge>

            <SocialLinks
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
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
            </SocialLinks>
          </motion.div>

          {/* RIGHT — Form */}
          <ContactForm
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessBox
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <FaCheckCircle style={{ fontSize: '2rem', color: 'var(--color-code)' }} />
                  <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
                    Mensaje enviado.
                  </p>
                  <p
                    className="mono"
                    style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}
                  >
                    // Respondo en menos de 24h
                  </p>
                </SuccessBox>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <FormGroup>
                    <FormLabel htmlFor="name">Nombre</FormLabel>
                    <FormInput
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormInput
                      id="email"
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="subject">Asunto</FormLabel>
                    <FormInput
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="¿De qué se trata?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="message">Mensaje</FormLabel>
                    <FormTextarea
                      id="message"
                      name="message"
                      placeholder="Cuéntame tu proyecto..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <BtnPrimary type="submit">Enviar →</BtnPrimary>
                </motion.div>
              )}
            </AnimatePresence>
          </ContactForm>

        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;
