import React from 'react';
import styled from 'styled-components';
import Hero from '../components/sections/Hero/Hero.jsx';
import About from '../components/sections/About/About.jsx';
import Projects from '../components/sections/Projects/Projects.jsx';
import Skills from '../components/sections/Skills/Skills.jsx';
import Experience from '../components/sections/Experience/Experience.jsx';
import Contact from '../components/sections/Contact/Contact.jsx';

const SectionDivider = styled.div`
  width: 100%;
  height: 100px;
  background: linear-gradient(
    to bottom,
    ${({ $from }) => $from},
    ${({ $to }) => $to}
  );
  pointer-events: none;
`;

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <SectionDivider $from="var(--dark-bg)" $to="var(--surface-2)" />
      <Projects />
      <SectionDivider $from="var(--surface-2)" $to="var(--dark-bg)" />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
};

export default Home;
