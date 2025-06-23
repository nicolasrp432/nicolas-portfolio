import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactContainer = styled.section`
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -200px;
    right: -200px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(254,180,123,0.08) 0%, rgba(255,126,95,0.04) 70%, rgba(26,26,26,0) 100%);
    z-index: 0;
  }
`;

const ContactContent = styled.div`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactTitle = styled(motion.h3)`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  
  span {
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ContactText = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
`;

const ContactItemContent = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }
  
  p, a {
    font-size: 1rem;
    color: var(--text-secondary);
    transition: var(--transition);
  }
  
  a:hover {
    color: var(--accent-gradient-1);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  width: 45px;
  height: 45px;
  background-color: #252525;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
  transition: var(--transition);
  
  &:hover {
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    color: white;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled(motion.form)`
  background-color: #252525;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: #333;
  border: none;
  border-radius: 5px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-gradient-1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background-color: #333;
  border: none;
  border-radius: 5px;
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-gradient-1);
  }
`;

const FormButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 126, 95, 0.2);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to a server
    console.log('Form submitted:', formData);
    alert('¡Mensaje enviado! Gracias por contactarme.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <ContactContainer id="contact">
      <ContactContent>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contacto
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ¿Tienes un proyecto en mente? ¡Hablemos!
        </SectionSubtitle>
        
        <ContactGrid>
          <ContactInfo>
            <ContactTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Conversemos sobre tu <span>proyecto</span>
            </ContactTitle>
            
            <ContactText
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Estoy interesado en oportunidades freelance y colaboraciones en proyectos ambiciosos e innovadores. Si tienes una solicitud o pregunta, no dudes en contactarme.
            </ContactText>
            
            <ContactItems>
              <ContactItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <ContactItemContent>
                  <h4>Email</h4>
                  <a href="mailto:contact@nicolasrodriguez.dev">contact@nicolasrodriguez.dev</a>
                </ContactItemContent>
              </ContactItem>
              
              <ContactItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ContactIcon>
                  <FaPhone />
                </ContactIcon>
                <ContactItemContent>
                  <h4>Teléfono</h4>
                  <a href="tel:+123456789">+12 345 6789</a>
                </ContactItemContent>
              </ContactItem>
              
              <ContactItem
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <ContactItemContent>
                  <h4>Ubicación</h4>
                  <p>Madrid, España</p>
                </ContactItemContent>
              </ContactItem>
            </ContactItems>
            
            <SocialLinks
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <SocialLink href="https://github.com/nicolasrodriguez" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/nicolasrodriguez" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://twitter.com/nicolasrodriguez" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>
          
          <ContactForm
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <FormLabel>Nombre</FormLabel>
              <FormInput 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Asunto</FormLabel>
              <FormInput 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Mensaje</FormLabel>
              <FormTextarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormButton 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enviar Mensaje
            </FormButton>
          </ContactForm>
        </ContactGrid>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;
