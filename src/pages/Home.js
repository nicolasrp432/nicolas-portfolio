import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
};

export default Home;
