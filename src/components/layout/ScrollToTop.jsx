import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--gradient-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 99;
  box-shadow: 0 4px 12px rgba(255, 126, 95, 0.2);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(255, 126, 95, 0.35);
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {isVisible && (
        <ScrollButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </ScrollButton>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
