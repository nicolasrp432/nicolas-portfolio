import { useEffect, useState } from 'react';
import { FiArrowDownRight, FiArrowUpRight, FiCode, FiGithub, FiMenu, FiX } from 'react-icons/fi';
import { SiClaude, SiFigma, SiGithub, SiReact, SiVite } from 'react-icons/si';
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

const projectPalettes = [
  ['#ff6a45', '#191816', '#e7ff57'],
  ['#a8c7ff', '#222952', '#f1eee7'],
  ['#d6b8ff', '#351b48', '#ffdd55'],
  ['#70dfb3', '#15362d', '#ff8e6f'],
  ['#ffb9ca', '#4a1827', '#bff4ff'],
  ['#f5c761', '#312711', '#ef6d4e'],
];

function ProjectArtwork({ project, index }) {
  const [accent, dark, highlight] = projectPalettes[index % projectPalettes.length];
  const title = project.name.replaceAll('-', ' ');
  const label = project.language || project.topics?.[0] || 'Digital product';

  return (
    <svg className="project-artwork" viewBox="0 0 800 500" role="img" aria-label={`Ilustración personalizada para ${title}`}>
      <rect width="800" height="500" fill={accent} />
      <circle cx={index % 2 ? 690 : 110} cy="86" r="170" fill={highlight} opacity=".75" />
      <path d="M-40 420 C180 270 315 570 530 355 S850 330 890 190" fill="none" stroke={dark} strokeWidth="2" opacity=".45" />
      <path d="M-20 455 C170 305 360 595 580 390 S850 375 900 235" fill="none" stroke={dark} strokeWidth="16" opacity=".12" />
      <g transform={index % 2 ? 'translate(88 92) rotate(-3 310 170)' : 'translate(90 90) rotate(3 310 170)'}>
        <rect width="620" height="330" rx="12" fill={dark} />
        <rect x="18" y="18" width="584" height="294" rx="4" fill="#f7f3ec" />
        <circle cx="38" cy="37" r="5" fill={accent} /><circle cx="54" cy="37" r="5" fill={highlight} /><circle cx="70" cy="37" r="5" fill={dark} opacity=".3" />
        <rect x="38" y="70" width="240" height="12" rx="6" fill={dark} opacity=".14" />
        <rect x="38" y="99" width="350" height="86" rx="5" fill={accent} />
        <rect x="410" y="99" width="155" height="86" rx="5" fill={highlight} />
        <rect x="38" y="204" width="165" height="78" rx="5" fill={dark} opacity=".92" />
        <rect x="220" y="204" width="345" height="78" rx="5" fill={dark} opacity=".08" />
        <path d="M244 259l38-26 40 13 48-25 52 16 47-22 68 27" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" />
      </g>
      <g fill={dark}>
        <text x="42" y="52" fontFamily="DM Mono, monospace" fontSize="13" fontWeight="500" letterSpacing="2">NR / 0{index + 1}</text>
        <text x="42" y="465" fontFamily="Manrope, sans-serif" fontSize="25" fontWeight="700">{title.toUpperCase().slice(0, 30)}</text>
        <text x="758" y="465" textAnchor="end" fontFamily="DM Mono, monospace" fontSize="13" fontWeight="500" letterSpacing="2">{label.toUpperCase().slice(0, 24)}</text>
      </g>
    </svg>
  );
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
        <a className="wordmark" href="#inicio" onClick={closeMenu} aria-label="Ir al inicio">NR<span>·</span></a>
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
            <div className="hero-copy">
              <h1>Construyo ideas que<br />se sienten <em>claras.</em></h1>
              <p className="hero-intro">Soy Nicolás, desarrollador frontend y constructor de soluciones digitales. Convierto problemas en productos útiles, visuales y bien pensados.</p>
              <div className="hero-actions"><a className="primary-button" href="#proyectos">Explorar proyectos <FiArrowDownRight /></a><ArrowLink href={`https://github.com/${GITHUB_USER}`}>github/{GITHUB_USER}</ArrowLink></div>
            </div>
            <div className="hero-visual" aria-label="Retrato de Nicolás">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="portrait-frame"><img src="/nicolas.png" alt="Nicolás, desarrollador frontend" /></div>
              <div className="floating-card card-code"><FiCode /><span>build<br/><strong>with intent</strong></span></div>
              <div className="floating-card card-ai"><RiRobot2Line /><span>AI<br/><strong>as a system</strong></span></div>
              <span className="visual-caption">Curiosidad<br/>en movimiento ↗</span>
            </div>
          </div>
          <div className="hero-footer"><span>Disponible para colaborar</span><span>Frontend · Automatización · IA</span><span>Aprendiendo siempre</span></div>
        </section>

        <section className="projects section" id="proyectos">
          <div className="section-heading"><div><span className="eyebrow">Trabajo reciente</span><h2>Proyectos reales,<br/><em>no placeholders.</em></h2></div><p>Una selección viva de mis repositorios originales, ordenada por actividad reciente. Cada tarjeta se sincroniza con GitHub y muestra el despliegue cuando existe.</p></div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.id ?? project.name}>
                <a className="project-image" href={project.homepage || project.html_url} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.name}`}>
                  <ProjectArtwork project={project} index={index} />
                  <span className="project-index">0{index + 1}</span><span className="project-open"><FiArrowUpRight /></span>
                </a>
                <div className="project-body">
                  <div className="project-title-row"><h3>{project.name.replaceAll('-', ' ')}</h3>{project.homepage && <span className="live-pill"><i /> LIVE</span>}</div>
                  <p>{project.description || 'Producto digital en evolución: explora el repositorio para conocer su proceso y decisiones técnicas.'}</p>
                  <div className="project-meta"><div className="tags">{[project.language, ...(project.topics || [])].filter(Boolean).slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.html_url} target="_blank" rel="noreferrer"><FiGithub /> Código</a>{project.homepage && <a href={project.homepage} target="_blank" rel="noreferrer">Visitar <FiArrowUpRight /></a>}</div></div>
                </div>
              </article>
            ))}
          </div>
          <ArrowLink className="all-projects" href={`https://github.com/${GITHUB_USER}?tab=repositories`}>Ver todos los repositorios</ArrowLink>
        </section>

        <section className="profile section" id="perfil">
          <div className="profile-aside"><span className="eyebrow">Manifiesto personal</span><div className="big-asterisk">✳</div><p>“No me interesa solo hacer cosas que funcionen, sino entender por qué funcionan.”</p></div>
          <div className="profile-content"><h2>Entre el código y<br/>la <em>curiosidad.</em></h2><div className="profile-copy"><p className="lead">Me interesa entender cómo funcionan las cosas, cómo se construyen y cómo se pueden mejorar.</p><p>Trabajo principalmente con React, pero mi práctica cruza automatización, aplicaciones, contenido digital y soluciones apoyadas en inteligencia artificial.</p><p>La experiencia en edición de vídeo y diseño me ayuda a mirar cada producto como un sistema completo, no solo como una interfaz. Fuera del código, la lectura, el ajedrez y el aprendizaje constante entrenan mi manera de pensar.</p></div><div className="principles">{principles.map(([title, text], index) => <div className="principle" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div>
        </section>

        <section className="tools section" id="herramientas">
          <div className="section-heading compact"><div><span className="eyebrow">Mi caja de herramientas</span><h2>El stack cambia.<br/><em>El criterio queda.</em></h2></div><div className="tool-icons" aria-hidden="true"><SiReact/><SiVite/><SiClaude/><RiGeminiFill/><SiFigma/><SiGithub/></div></div>
          <div className="tool-table">{toolGroups.map((group) => <div className="tool-row" key={group.number}><span>{group.number}</span><h3>{group.label}</h3><div>{group.tools.map((tool) => <span className="tool-chip" key={tool}>{tool}</span>)}</div></div>)}</div>
        </section>

        <section className="roadmap section" id="ruta">
          <div className="roadmap-intro"><span className="eyebrow">Plan visual · Próximas iteraciones</span><h2>Un portfolio que<br/>también <em>evoluciona.</em></h2><p>La nueva base ya prioriza trabajo real, narrativa y una identidad propia. Estos son los siguientes pasos de diseño para mantenerlo vivo.</p></div>
          <ol className="roadmap-list"><li><span>Ahora</span><strong>Casos de estudio</strong><p>Documentar reto, proceso, decisiones y resultado de los proyectos clave.</p></li><li><span>Siguiente</span><strong>Laboratorio visual</strong><p>Experimentos breves con IA, motion, automatización y prototipos.</p></li><li><span>Después</span><strong>Prueba de impacto</strong><p>Añadir métricas, aprendizajes y testimonios con contexto verificable.</p></li></ol>
        </section>

        <section className="closing"><p>¿Tienes una idea, un problema o algo por mejorar?</p><h2>Hagámoslo<br/><em>real.</em></h2><ArrowLink className="closing-link" href={`https://github.com/${GITHUB_USER}`}>Conversemos en GitHub</ArrowLink><div className="closing-orb"><span>NR</span></div></section>
      </main>
      <footer><a className="wordmark" href="#inicio">NR<span>·</span></a><p>Diseñado y construido con curiosidad por Nicolás.</p><span>© {new Date().getFullYear()}</span></footer>
    </div>
  );
}
export default App;
