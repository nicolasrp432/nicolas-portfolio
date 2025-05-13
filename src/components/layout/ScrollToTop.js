import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 99;
  box-shadow: 0 5px 15px rgba(255, 126, 95, 0.3);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(255, 126, 95, 0.4);
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  // Set the top scroll to 0
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <ScrollButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </ScrollButton>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
