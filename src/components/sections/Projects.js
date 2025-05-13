import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaSass } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss } from 'react-icons/si';

const ProjectsContainer = styled.section`
  padding: 8rem 0;
  background-color: #1c1c1c;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -200px;
    right: -200px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,126,95,0.08) 0%, rgba(255,94,125,0.04) 70%, rgba(26,26,26,0) 100%);
    z-index: 0;
  }
`;

const ProjectsContent = styled.div`
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
  margin: 0 auto 3rem;
`;

const ProjectsFilter = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.5rem;
  background: ${({ active }) => active ? 'linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2))' : '#252525'};
  color: ${({ active }) => active ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: ${({ active }) => active ? 'linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2))' : '#333'};
    transform: translateY(-3px);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: #252525;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    
    .project-image::before {
      opacity: 0.7;
    }
    
    .project-links {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProjectImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(26, 26, 26, 0.1), rgba(26, 26, 26, 0.8));
    z-index: 1;
    opacity: 0.3;
    transition: var(--transition);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
`;

const ProjectLinks = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 20px);
  display: flex;
  gap: 1rem;
  z-index: 2;
  opacity: 0;
  transition: var(--transition);
`;

const ProjectLink = styled.a`
  width: 45px;
  height: 45px;
  background-color: rgba(37, 37, 37, 0.9);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: var(--transition);
  
  &:hover {
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    transform: translateY(-3px);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: auto;
`;

const TechItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  background-color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
`;

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projectsData = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      description: 'Panel de administración para tienda online con análisis de datos y gestión de productos.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      github: 'https://github.com',
      live: 'https://example.com',
      tech: ['React', 'TypeScript', 'Tailwind'],
      category: 'web',
    },
    {
      id: 2,
      title: 'Task Manager App',
      description: 'Aplicación de gestión de tareas con funcionalidades de arrastrar y soltar, recordatorios y etiquetas.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      github: 'https://github.com',
      live: 'https://example.com',
      tech: ['React', 'Node.js', 'SASS'],
      category: 'app',
    },
    {
      id: 3,
      title: 'Fitness Tracker',
      description: 'Plataforma para seguimiento de rutinas de ejercicio, progreso y nutrición con visualizaciones de datos.',
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      github: 'https://github.com',
      live: 'https://example.com',
      tech: ['Next.js', 'TypeScript', 'SASS'],
      category: 'web',
    },
    {
      id: 4,
      title: 'Weather App',
      description: 'Aplicación del clima con pronóstico de 7 días, alertas meteorológicas y visualización de mapas.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
      github: 'https://github.com',
      live: 'https://example.com',
      tech: ['React', 'Node.js', 'Tailwind'],
      category: 'app',
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Sitio web de portafolio personal con animaciones fluidas y diseño responsivo.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      github: 'https://github.com',
      live: 'https://example.com',
      tech: ['React', 'SASS'],
      category: 'web',
    },
    {
      id: 6,
      title: 'Recipe Finder',
      description: 'Buscador de recetas con filtros por ingredientes, tiempo de preparación y dificultad.',
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      github: 'https://github.com',
      live: 'https://example.com',
      tech: ['React', 'Node.js'],
      category: 'app',
    },
  ];
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  const getTechIcon = (tech) => {
    switch(tech) {
      case 'React':
        return <FaReact />;
      case 'Node.js':
        return <FaNodeJs />;
      case 'TypeScript':
        return <SiTypescript />;
      case 'Next.js':
        return <SiNextdotjs />;
      case 'SASS':
        return <FaSass />;
      case 'Tailwind':
        return <SiTailwindcss />;
      default:
        return null;
    }
  };
  
  return (
    <ProjectsContainer id="projects">
      <ProjectsContent>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Mis Proyectos
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Una selección de mis trabajos más recientes y destacados
        </SectionSubtitle>
        
        <ProjectsFilter
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            Todos
          </FilterButton>
          <FilterButton 
            active={filter === 'web'} 
            onClick={() => setFilter('web')}
          >
            Sitios Web
          </FilterButton>
          <FilterButton 
            active={filter === 'app'} 
            onClick={() => setFilter('app')}
          >
            Aplicaciones
          </FilterButton>
        </ProjectsFilter>
        
        <ProjectsGrid
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * project.id }}
            >
              <ProjectImage className="project-image">
                <img src={project.image} alt={project.title} />
                <ProjectLinks className="project-links">
                  <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </ProjectLink>
                  <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                  </ProjectLink>
                </ProjectLinks>
              </ProjectImage>
              
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTech>
                  {project.tech.map((tech, index) => (
                    <TechItem key={index}>
                      {getTechIcon(tech)}
                      {tech}
                    </TechItem>
                  ))}
                </ProjectTech>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContent>
    </ProjectsContainer>
  );
};

export default Projects;
