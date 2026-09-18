import { useEffect, useRef, useState } from 'react';
import { FiArrowDownRight, FiArrowUpRight, FiCode, FiGithub, FiMenu, FiX } from 'react-icons/fi';
import { SiClaude, SiFigma, SiGithub, SiJavascript, SiOpenai, SiReact, SiVite } from 'react-icons/si';
import { RiGeminiFill, RiRobot2Line } from 'react-icons/ri';
import './App.css';

const GITHUB_USER = 'nicolasrp432';
const fallbackProjects = [{ id: 'portfolio', name: 'nicolas-portfolio', description: 'Portfolio personal construido con React: identidad, proyectos y proceso en una experiencia rápida y responsive.', html_url: `https://github.com/${GITHUB_USER}/nicolas-portfolio`, homepage: '', language: 'React', topics: ['react', 'vite', 'portfolio'] }];
const toolGroups = [
  { number: '01', label: 'Construyo', tools: ['React', 'JavaScript', 'HTML & CSS', 'Vite', 'Git & GitHub'] },
  { number: '02', label: 'Pienso y diseño', tools: ['Figma', 'Diseño UI', 'Sistemas visuales', 'Edición de vídeo', 'Contenido digital'] },
  { number: '03', label: 'Amplifico con IA', tools: ['Claude', 'Gemini', 'ChatGPT', 'Higgsfield', 'Hermes', 'Agentes de IA'] },
];
const principles = [
  ['Claridad antes que ruido', 'Interfaces con jerarquía, intención y el mínimo de fricción posible.'],
  ['Tecnología con propósito', 'La herramienta correcta importa menos que el problema real que ayuda a resolver.'],
  ['Aprender construyendo', 'Investigo, pruebo y convierto lo aprendido en productos que se pueden usar.'],
];

function BrandMark({ compact = false }) {
  return <span className={compact ? 'brand-mark compact' : 'brand-mark'} aria-hidden="true"><i>&lt;</i><strong>N</strong><i>/&gt;</i></span>;
}

function Reveal({ children, className = '', delay = 0, as: Component = 'div' }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px -8%', threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <Component ref={elementRef} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}s` }}>{children}</Component>;
}

function ArrowLink({ href, children, className = '', label }) {
  return <a className={`arrow-link ${className}`} href={href} target="_blank" rel="noreferrer" aria-label={label}><span>{children}</span><FiArrowUpRight aria-hidden="true" /></a>;
}

function App() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=12`, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((repos) => {
        const originalWork = repos.filter((repo) => !repo.fork && repo.name !== GITHUB_USER).slice(0, 6);
        if (originalWork.length) setProjects(originalWork);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <a className="wordmark" href="#inicio" onClick={closeMenu} aria-label="Ir al inicio"><BrandMark /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir navegación">{menuOpen ? <FiX /> : <FiMenu />}</button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navegación principal">
          <a href="#proyectos" onClick={closeMenu}>Proyectos</a><a href="#perfil" onClick={closeMenu}>Perfil</a><a href="#herramientas" onClick={closeMenu}>Herramientas</a><a href="#ruta" onClick={closeMenu}>Ruta visual</a>
        </nav>
        <ArrowLink className="nav-cta" href={`https://github.com/${GITHUB_USER}`} label="Ver perfil de GitHub">GitHub</ArrowLink>
      </header>
      <main>
        <section className="hero" id="inicio">
          <div className="hero-kicker"><span /> Frontend × productos digitales × IA</div>
          <div className="hero-grid">
            <div className="hero-copy hero-enter">
              <h1>Construyo ideas que<br />se sienten <em>claras.</em></h1>
              <p className="hero-intro">Soy Nicolás, desarrollador frontend y constructor de soluciones digitales. Convierto problemas en productos útiles, visuales y bien pensados.</p>
              <div className="hero-actions"><a className="primary-button" href="#proyectos">Explorar proyectos <FiArrowDownRight /></a><ArrowLink href={`https://github.com/${GITHUB_USER}`}>github/{GITHUB_USER}</ArrowLink></div>
            </div>
            <div className="hero-visual hero-enter hero-enter-late" aria-label="Retrato de Nicolás">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="portrait-frame"><img src="/nicolas-hero.svg" alt="Nicolás trabajando con su portátil" width="1122" height="1272" fetchPriority="high" decoding="async" /></div>
              <div className="floating-card card-code"><FiCode /><span>build<br/><strong>with intent</strong></span></div>
              <div className="floating-card card-ai"><RiRobot2Line /><span>AI<br/><strong>as a system</strong></span></div>
              <span className="visual-caption">Curiosidad<br/>en movimiento ↗</span>
            </div>
          </div>
          <div className="hero-footer"><span>Disponible para colaborar</span><span>Frontend · Automatización · IA</span><span>Aprendiendo siempre</span></div>
        </section>

        <section className="projects section" id="proyectos">
          <Reveal className="section-heading"><div><span className="eyebrow">Trabajo reciente</span><h2>Proyectos reales,<br/><em>ideas con propósito.</em></h2></div><p>Una selección viva de productos que he diseñado y desarrollado. Cada pieza une una necesidad concreta, decisiones visuales y una implementación lista para evolucionar.</p></Reveal>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal as="article" className="project-card" key={project.id ?? project.name} delay={(index % 2) * .12}>
                <a className="project-image" href={project.homepage || project.html_url} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.name}`}>
                  <div className={`project-art art-${index % 4}`} aria-hidden="true"><span className="art-browser"><i/><i/><i/></span><strong>{project.name.replaceAll('-', ' ')}</strong><small>{project.language || 'Digital product'} · 0{index + 1}</small><span className="art-shape" /></div>
                  <span className="project-index">0{index + 1}</span><span className="project-open"><FiArrowUpRight /></span>
                </a>
                <div className="project-body">
                  <div className="project-title-row"><h3>{project.name.replaceAll('-', ' ')}</h3>{project.homepage && <span className="live-pill"><i /> LIVE</span>}</div>
                  <p>{project.description || 'Una solución digital enfocada en una experiencia clara, una interfaz cuidada y una base técnica preparada para seguir creciendo.'}</p>
                  <div className="project-meta"><div className="tags">{[project.language, ...(project.topics || [])].filter(Boolean).slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.html_url} target="_blank" rel="noreferrer"><FiGithub /> Código</a>{project.homepage && <a href={project.homepage} target="_blank" rel="noreferrer">Visitar <FiArrowUpRight /></a>}</div></div>
                </div>
              </Reveal>
            ))}
          </div>
          <ArrowLink className="all-projects" href={`https://github.com/${GITHUB_USER}?tab=repositories`}>Ver todos los repositorios</ArrowLink>
        </section>

        <section className="profile section" id="perfil">
          <div className="profile-aside"><span className="eyebrow">Manifiesto personal</span><div className="big-asterisk">✳</div><p>“No me interesa solo hacer cosas que funcionen, sino entender por qué funcionan.”</p></div>
          <div className="profile-content"><h2>Entre el código y<br/>la <em>curiosidad.</em></h2><div className="profile-copy"><p className="lead">Me interesa entender cómo funcionan las cosas, cómo se construyen y cómo se pueden mejorar.</p><p>Trabajo principalmente con React, pero mi práctica cruza automatización, aplicaciones, contenido digital y soluciones apoyadas en inteligencia artificial.</p><p>La experiencia en edición de vídeo y diseño me ayuda a mirar cada producto como un sistema completo, no solo como una interfaz. Fuera del código, la lectura, el ajedrez y el aprendizaje constante entrenan mi manera de pensar.</p></div><div className="principles">{principles.map(([title, text], index) => <div className="principle" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div>
        </section>

        <section className="tools section" id="herramientas">
          <div className="section-heading compact"><div><span className="eyebrow">Mi caja de herramientas</span><h2>El stack cambia.<br/><em>El criterio queda.</em></h2></div><div className="tool-icons" aria-label="Tecnologías principales"><SiReact title="React"/><SiJavascript title="JavaScript"/><SiVite title="Vite"/><SiOpenai title="ChatGPT"/><SiClaude title="Claude"/><RiGeminiFill title="Gemini"/><SiFigma title="Figma"/><SiGithub title="GitHub"/></div></div>
          <div className="tool-table">{toolGroups.map((group) => <div className="tool-row" key={group.number}><span>{group.number}</span><h3>{group.label}</h3><div>{group.tools.map((tool) => <span className="tool-chip" key={tool}>{tool}</span>)}</div></div>)}</div>
        </section>

        <section className="roadmap section" id="ruta">
          <div className="roadmap-intro"><span className="eyebrow">Plan visual · Próximas iteraciones</span><h2>Un portfolio que<br/>también <em>evoluciona.</em></h2><p>La nueva base ya prioriza trabajo real, narrativa y una identidad propia. Estos son los siguientes pasos de diseño para mantenerlo vivo.</p></div>
          <ol className="roadmap-list"><li><span>Ahora</span><strong>Casos de estudio</strong><p>Documentar reto, proceso, decisiones y resultado de los proyectos clave.</p></li><li><span>Siguiente</span><strong>Laboratorio visual</strong><p>Experimentos breves con IA, motion, automatización y prototipos.</p></li><li><span>Después</span><strong>Prueba de impacto</strong><p>Añadir métricas, aprendizajes y testimonios con contexto verificable.</p></li></ol>
        </section>

        <section className="closing"><p>¿Tienes una idea, un problema o algo por mejorar?</p><h2>Hagámoslo<br/><em>real.</em></h2><ArrowLink className="closing-link" href={`https://github.com/${GITHUB_USER}`}>Conversemos en GitHub</ArrowLink></section>
      </main>
      <footer><a className="wordmark" href="#inicio" aria-label="Volver al inicio"><BrandMark compact /></a><p>Diseñado y construido con curiosidad por Nicolás.</p><span>© {new Date().getFullYear()}</span></footer>
    </div>
  );
}
export default App;
