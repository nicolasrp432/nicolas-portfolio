import React from 'react';
import Hero from '../components/sections/Hero/Hero.jsx';
import About from '../components/sections/About/About.jsx';
import Projects from '../components/sections/Projects/Projects.jsx';
import Skills from '../components/sections/Skills/Skills.jsx';
import Experience from '../components/sections/Experience/Experience.jsx';
import Contact from '../components/sections/Contact/Contact.jsx';

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
