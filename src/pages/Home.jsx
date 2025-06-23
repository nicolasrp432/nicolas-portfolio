import React from 'react';
import Hero from '../components/sections/Hero.jsx';
import About from '../components/sections/About.jsx';
import Projects from '../components/sections/Projects.jsx';
import Skills from '../components/sections/Skills.jsx';
import Experience from '../components/sections/Experience.jsx';
import Contact from '../components/sections/Contact.jsx';

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
