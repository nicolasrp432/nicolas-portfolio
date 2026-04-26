# PROMPTS PARA AGENTE — PORTFOLIO NICOLAS RODRIGUEZ v2.0
> Claude Code + antigravity + skills + 21st.dev MCP
> SIEMPRE leer PORTFOLIO_STYLE_GUIDE.md antes de ejecutar cualquier prompt.
> Un prompt = una unidad. No mezclar. No saltarse orden.

---

## ACTIVACIÓN INICIAL (una vez al comienzo de la sesión)

```
/ui-ux-pro-max
/frontend-developer
/caveman
```

---

## CÓMO USA EL AGENTE EL MCP DE 21ST.DEV

Cuando un prompt diga `[21ST]`, el agente debe:
1. Usar el MCP de 21st.dev para obtener el código del componente
2. Adaptarlo al sistema de diseño del style guide (colores, fuentes, variables CSS)
3. Convertir cualquier Tailwind a styled-components
4. Reemplazar valores hardcoded por variables CSS del sistema

---

## PROMPT 01 — SETUP BASE Y SISTEMA DE DISEÑO

```
/ui-ux-pro-max
/frontend-developer
/caveman

Lee PORTFOLIO_STYLE_GUIDE.md COMPLETO. Luego ejecuta.

TAREA: Actualizar sistema de diseño base. Solo archivos de estilos/config. NO tocar JSX de componentes.

ARCHIVOS A MODIFICAR:

### src/styles/GlobalStyles.jsx
Reemplazar TODO el bloque :root con este exacto:

:root {
  --dark-bg: #0f0f0f;
  --surface-1: #151515;
  --surface-2: #1e1e1e;
  --surface-3: #252525;
  --border: #2a2a2a;
  --text-primary: #f0f0f0;
  --text-secondary: #888888;
  --text-tertiary: #555555;
  --text-accent: #ff7e5f;
  --accent-primary: #ff7e5f;
  --accent-secondary: #feb47b;
  --accent-pink: #ff5e7d;
  --gradient-primary: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
  --color-ai: #7c6ef0;
  --color-code: #4ec9b0;
  --color-design: #ff7e5f;
  --color-content: #ffd166;
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 5rem;
  --space-3xl: 8rem;
  --font-main: 'Inter', sans-serif;
  --font-heading: 'Syne', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --transition: all 0.2s ease-in-out;
  --transition-slow: all 0.5s ease-in-out;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
}

Actualizar body: font-family → var(--font-main), background → var(--dark-bg), color → var(--text-primary)

Añadir utility classes globales al final del GlobalStyles:
.mono { font-family: var(--font-mono); }
.heading { font-family: var(--font-heading); }
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-tertiary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

### src/styles/theme.jsx
Actualizar el objeto theme:
- colors: añadir surface1/2/3, border, textAccent, textTertiary, aiPurple:#7c6ef0, codeTeal:#4ec9b0, contentYellow:#ffd166
- fonts: heading→'Syne', main→'Inter', mono→'JetBrains Mono' (campo nuevo)
- radii: { sm:'4px', md:'6px', lg:'8px', xl:'12px' }
- transitions: { fast:'0.15s', standard:'0.2s ease-in-out', slow:'0.5s' }
- spacing: { xs:'0.5rem', sm:'1rem', md:'1.5rem', lg:'2rem', xl:'3rem', '2xl':'5rem', '3xl':'8rem' }

### index.html
- title: "Nicolas Rodriguez — Soluciones Digitales"
- description: "Desarrollador frontend y constructor de soluciones digitales. React, IA, automatización."

### src/main.jsx
Cambiar el Google Fonts href por:
https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap

REGLAS:
- NO tocar ningún .jsx de componentes
- Mantener compatibilidad styled-components v6
- Sin romper imports existentes
```

---

## PROMPT 02 — NAVBAR REDESIGN

```
/ui-ux-pro-max
/caveman

Lee PORTFOLIO_STYLE_GUIDE.md sección 05 (Navbar). Luego ejecuta.

ARCHIVO: src/components/layout/Navbar.jsx

LOGO — nuevo markup:
Logo = styled(Link) con display: flex, align-items: center, gap: 0.3rem
Dos spans internos:
  <span className="gradient-text" style={{fontFamily:'var(--font-heading)',fontWeight:800}}>N.</span>
  <span style={{fontFamily:'var(--font-main)',fontWeight:400,color:'var(--text-secondary)'}}>Rodriguez</span>

LINKS:
- Reducir a 4: "Inicio" / "Trabajo" / "Stack" / "Contacto"
- Rutas como anchors: href="/#projects", href="/#skills", href="/#contact", href="/"
- Font: Inter 500, 0.8rem, uppercase, letter-spacing: 0.08em
- Color default: var(--text-secondary)
- Hover: color var(--text-primary)
- Underline hover: ::after, width 0→100%, height 2px, background var(--accent-primary), transition 0.2s

SCROLL BEHAVIOR:
Sin scroll → transparente, sin border, sin blur
>50px → background rgba(15,15,15,0.92), backdrop-filter: blur(20px), border-bottom: 1px solid var(--border)
Padding: 1.5rem → 1rem

MOBILE MENU:
Fondo: var(--dark-bg)
Links mobile: font-family Syne, 1.8rem, centered
Botón hamburguesa: color var(--text-primary)

LIMPIAR:
- Eliminar el motion.div wrapper de todos los links (causa bugs en resize)
- Links individuales mantienen su motion propio si se quiere
MANTENER: lógica useState isOpen, useEffect scroll, closeMenu, toggleMenu
```

---

## PROMPT 03 — HERO SECTION con 21ST.DEV

```
/ui-ux-pro-max
/frontend-developer
/caveman

Lee PORTFOLIO_STYLE_GUIDE.md secciones 05 y 06. Luego ejecuta.

ARCHIVO: src/components/sections/Hero.jsx

[21ST] COMPONENTE PRINCIPAL — Scroll Expansion Hero:
Usar MCP 21st.dev para obtener: https://21st.dev/community/components/arunachalam0606/scroll-expansion-hero/default
CONCEPTO: el TerminalWidget (ver abajo) empieza contenido y se expande dramáticamente al scrollear.
ADAPTACIÓN REQUERIDA:
  - Reemplazar el media element (video/imagen) por el TerminalWidget component
  - Convertir Tailwind → styled-components
  - Colores: var(--dark-bg), var(--surface-1), var(--border)
  - El texto overlay del hero debe mantener el H1 y subtítulo descritos abajo

[21ST] EFECTO ALTERNATIVO — Container Scroll Animation:
Si el anterior no adapta bien, usar: https://21st.dev/community/components/aceternity/container-scroll-animation/default
CONCEPTO: contenedor (el TerminalWidget) arranca inclinado en 3D y se endereza al scrollear.
ADAPTACIÓN:
  - Header text = "Construyo soluciones. Entiendo el porqué."
  - El contenedor animado = TerminalWidget
  - Quitar cualquier imagen de MacBook o device frame
  - Aplicar colores del sistema

FALLBACK si ningún MCP resulta limpio:
Layout: section height 100vh, grid 60/40, desktop.

COLUMNA IZQUIERDA (texto):
```jsx
<p className="eyebrow">Nicolas Rodriguez</p>
<div style={{width:40,height:3,background:'var(--gradient-primary)',borderRadius:2,margin:'0.75rem 0'}} />
<h1 style={{fontFamily:'var(--font-heading)',fontWeight:800,fontSize:'clamp(2.8rem,6vw,5rem)',lineHeight:1.15}}>
  Construyo soluciones.<br/>
  <span className="gradient-text">Entiendo el porqué.</span>
</h1>
<p style={{color:'var(--text-secondary)',fontSize:'1.05rem',maxWidth:480,lineHeight:1.75,margin:'1.5rem 0'}}>
  Desarrollo web, automatización e IA. No solo hago que las cosas funcionen — entiendo cómo y por qué lo hacen.
</p>

// Stack chips
<div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'2rem'}}>
  {['React','IA','Automatización','42 School'].map(tag=>(
    <span key={tag} className="mono" style={{
      padding:'0.3rem 0.75rem',background:'var(--surface-3)',
      border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',
      fontSize:'0.75rem',color:'var(--text-secondary)'
    }}>{tag}</span>
  ))}
</div>

// CTAs
<div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
  <BtnPrimary as="a" href="#projects">Ver proyectos</BtnPrimary>
  <BtnOutline as="a" href="#contact">Escribeme</BtnOutline>
</div>
```

BtnPrimary styled:
```css
background: var(--gradient-primary)
color: white
padding: 0.75rem 1.75rem
border-radius: var(--radius-md)
font-family: var(--font-main)
font-weight: 600
font-size: 0.9rem
border: none
cursor: pointer
transition: var(--transition)
text-decoration: none
display: inline-block
&:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,126,95,0.25); }
```

BtnOutline styled:
```css
background: transparent
border: 1.5px solid var(--border)
color: var(--text-primary)
/* mismos padding/radius/font */
&:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
```

COLUMNA DERECHA — TerminalWidget:
Crear src/components/ui/TerminalWidget.jsx (o función interna si el archivo no se complica)

```jsx
const terminalLines = [
  { prompt:'$', text:'whoami', delay:0.3, color:'var(--text-primary)' },
  { prompt:'>', text:'nicolas rodriguez', delay:0.8, color:'var(--accent-primary)' },
  { prompt:'$', text:'cat stack.json', delay:1.4, color:'var(--text-primary)' },
  { prompt:'>', text:'{ "frontend": "React + TypeScript",', delay:1.9, color:'var(--color-code)' },
  { prompt:' ', text:'  "ai_tools": ["Claude", "Gemini"],', delay:2.3, color:'var(--color-ai)' },
  { prompt:' ', text:'  "learning": "42 School",', delay:2.7, color:'var(--accent-secondary)' },
  { prompt:' ', text:'  "currently": "building solutions" }', delay:3.1, color:'var(--color-code)' },
  { prompt:'$', text:'█', delay:3.6, cursor:true, color:'var(--accent-primary)' },
]
```

Contenedor terminal styled:
```css
background: var(--surface-1)
border: 1px solid var(--border)
border-radius: var(--radius-lg)
overflow: hidden
font-family: var(--font-mono)
font-size: 0.85rem
line-height: 1.6
```

Header (dots):
```jsx
<div style={{padding:'0.75rem 1rem',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:'0.5rem'}}>
  <span style={{width:12,height:12,borderRadius:'50%',background:'#ff5f57',display:'inline-block'}} />
  <span style={{width:12,height:12,borderRadius:'50%',background:'#febc2e',display:'inline-block'}} />
  <span style={{width:12,height:12,borderRadius:'50%',background:'#28c840',display:'inline-block'}} />
  <span className="mono" style={{marginLeft:'auto',color:'var(--text-tertiary)',fontSize:'0.75rem'}}>bash</span>
</div>
```

Body: padding 1.25rem, cada línea = motion.div con initial opacity:0, animate opacity:1, transition delay del objeto
Cursor █: CSS animation blink 1s step-end infinite (solo si cursor:true)

Cada línea renderizada:
```jsx
<motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:line.delay}}>
  <span style={{color:'var(--text-tertiary)'}}>{line.prompt} </span>
  <span style={{color: line.color || 'var(--text-primary)'}}>{line.text}</span>
</motion.div>
```

SCROLL INDICATOR:
position absolute, bottom 2rem, left 50%, translateX(-50%)
Solo FaArrowDown en var(--text-tertiary), sin texto
animate: y [0,8,0], repeat Infinity, 1.5s

ELIMINAR: scrollToProjects(), los dos radial-gradient ::before/::after del HeroContainer
```

---

## PROMPT 04 — ABOUT SECTION REDESIGN

```
/ui-ux-pro-max
/frontend-developer
/caveman

Lee PORTFOLIO_STYLE_GUIDE.md sección 05 (About). Luego ejecuta.

ARCHIVO: src/components/sections/About.jsx

[21ST] ANIMATED COUNTERS:
Usar MCP 21st.dev, buscar: "animated number counter" o "count up stats"
NECESITO: counters que animen de 0 al valor objetivo cuando entran en viewport con useInView
ADAPTACIÓN: aplicar Syne 700, 2.5rem, gradient-text para los números
SI MCP NO DEVUELVE: implementar con framer-motion y useInView:
```jsx
// Hook simple de counter
const useCounter = (target, inView) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
};
```

ESTRUCTURA GENERAL — Grid 2 columnas desktop (55/45):

CABECERA (antes del grid, centrada):
```jsx
<p className="eyebrow" style={{textAlign:'center'}}>/ sobre mí</p>
<h2 style={{fontFamily:'var(--font-heading)',textAlign:'center'}}>Más que código</h2>
<div style={{width:40,height:3,background:'var(--gradient-primary)',borderRadius:2,margin:'0.75rem auto 3rem'}} />
```

COLUMNA IZQUIERDA (55%):
3 párrafos Inter 1rem, var(--text-secondary), lineHeight 1.8, gap 1.25rem entre párrafos:
  P1: "Soy Nicolás, desarrollador frontend y constructor de soluciones digitales. Me interesa entender cómo funcionan las cosas — no solo hacerlas funcionar."
  P2: "Trabajo con React y TypeScript, pero mi stack incluye herramientas de IA (Claude, Gemini), automatización y diseño. Actualmente estudiante en 42, una escuela de programación sin profesores donde aprendes resolviendo proyectos reales."
  P3: "También creo contenido y edito video, lo que me da una visión más completa de los productos que construyo."

Chips de área (fila, debajo del texto):
```javascript
const areas = [
  { icon:'💻', label:'Desarrollo Web' },
  { icon:'🤖', label:'IA & Automatización' },
  { icon:'🎬', label:'Contenido & Video' },
  { icon:'📚', label:'Aprendizaje Constante' },
]
```
Chip style: border 1px solid var(--border), radius var(--radius-md), padding 0.6rem 1rem
display flex gap 0.5rem alignItems center, fontSize 0.85rem
hover: border-color rgba(255,126,95,0.4), transition var(--transition)

BtnOutline debajo de chips: "Descargar CV" href="/cv.pdf"

COLUMNA DERECHA (45%):
Stats grid 2x2:
```javascript
const stats = [
  { num:'5+', label:'años de experiencia' },
  { num:'20+', label:'proyectos entregados' },
  { num:'42', label:'school — cursando' },
  { num:'∞', label:'aprendizaje constante' },
]
```
Número: Syne 700, 2.5rem, gradient-text
Label: JetBrains Mono, 0.75rem, var(--text-tertiary), uppercase, letterSpacing 0.1em

Bloque "Actualmente":
```css
background: var(--surface-2)
border: 1px solid var(--border)
border-radius: var(--radius-lg)
padding: 1.25rem
margin-top: 1.5rem
```
```jsx
<p className="mono" style={{color:'var(--text-tertiary)',fontSize:'0.75rem',marginBottom:'0.75rem'}}>// actualmente</p>
{['Estudiante en 42 School','Explorando agentes de IA','Proyectos freelance activos'].map(item=>(
  <p key={item} style={{color:'var(--text-secondary)',fontSize:'0.9rem',paddingLeft:'1rem',position:'relative',marginBottom:'0.4rem'}}>
    <span style={{position:'absolute',left:0,color:'var(--accent-primary)'}}>▪</span>
    {item}
  </p>
))}
```

ELIMINAR: foto Unsplash, AboutImage, AboutImageBorder, FaLaptopCode/FaUserTie/FaLightbulb features, SectionSubtitle genérico
```

---

## PROMPT 05 — PROJECTS SECTION REDESIGN

```
/ui-ux-pro-max
/frontend-developer
/caveman

Lee PORTFOLIO_STYLE_GUIDE.md sección 05 (Projects). Luego ejecuta.

ARCHIVO: src/components/sections/Projects.jsx

[21ST] CARD CON BORDER GLOW:
Usar MCP 21st.dev, buscar: "card border glow hover" o "spotlight card dark"
NECESITO: card oscura donde el border se ilumina suavemente en hover (efecto glow sutil coral)
ADAPTACIÓN: --surface-1 background, border-color hover rgba(255,126,95,0.4), sin Tailwind
SI MCP NO DEVUELVE limpio: usar styled-component con box-shadow: 0 0 0 1px rgba(255,126,95,0.4) en hover

[21ST] MAGNETIC LINKS (opcional, solo si resulta limpio):
Buscar: "magnetic button" — para los iconos de GitHub y link externo de cada card
Si no resulta: hover scale(1.1) simple

CABECERA:
```jsx
<p className="eyebrow" style={{textAlign:'center'}}>/ trabajo</p>
<h2 style={{fontFamily:'var(--font-heading)',textAlign:'center'}}>Soluciones construidas</h2>
<p style={{color:'var(--text-secondary)',textAlign:'center',maxWidth:480,margin:'0 auto'}}>
  Proyectos reales para clientes reales.
</p>
```

FILTROS nuevas categorías: ['Todos','Web','IA & Auto','Contenido'] → values: 'all','web','ai','content'
FilterButton active: background var(--gradient-primary), color white, border-radius var(--radius-md), border: none
FilterButton inactivo: background var(--surface-2), border: 1px solid var(--border), color var(--text-secondary)

DATOS — reemplazar los 6 fake:
```javascript
const projectsData = [
  {
    id:1,title:"Tu proyecto aquí",client:"Cliente / Contexto",
    problem:"¿Qué problema resolviste?",solution:"¿Cómo lo resolviste?",
    tech:["React","TypeScript"],category:"web",featured:true,github:null,live:null,image:null
  },
  {
    id:2,title:"Proyecto IA / Automatización",client:"Cliente / Contexto",
    problem:"Descripción del problema",solution:"Automatización con Claude API + n8n",
    tech:["Claude API","n8n","Python"],category:"ai",featured:true,github:null,live:null,image:null
  },
  {
    id:3,title:"Proyecto de contenido",client:"Cliente / Contexto",
    problem:"Descripción",solution:"Solución implementada",
    tech:["Premiere Pro","After Effects"],category:"content",featured:false,github:null,live:null,image:null
  },
]
```

CARD styled:
```css
background: var(--surface-1)
border: 1px solid var(--border)
border-radius: var(--radius-lg)
padding: var(--space-xl)
transition: border-color 0.2s ease, transform 0.2s ease
display: flex; flex-direction: column; gap: 1rem
&:hover { border-color: rgba(255,126,95,0.4); transform: translateY(-4px); }
```

Image placeholder cuando image===null:
```css
height: 180px
background: linear-gradient(135deg, var(--surface-2), var(--surface-3))
border-radius: var(--radius-md)
display: flex; align-items: center; justify-content: center
font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-tertiary)
```
Texto: "// imagen pendiente"

Badge "Destacado" si featured===true:
```css
position: absolute; top: 1rem; right: 1rem
background: var(--gradient-primary)
color: white; font-size: 0.7rem; padding: 0.2rem 0.6rem
border-radius: var(--radius-sm); font-family: var(--font-mono)
```

Card content:
  - Chip categoría: color según categoría (ai→var(--color-ai), web→var(--color-code), content→var(--color-content))
  - Título: Inter 600, 1.1rem
  - Cliente: JetBrains Mono 0.75rem, text-tertiary
  - problem + solution: Inter 0.9rem, text-secondary, 3 líneas max
  - Stack chips: sistema del style guide
  - Links: solo si github/live !== null

Nota NDA al pie:
```jsx
<p className="mono" style={{color:'var(--text-tertiary)',fontSize:'0.75rem',textAlign:'center',marginTop:'var(--space-xl)'}}>
  // Proyectos de clientes bajo NDA disponibles bajo solicitud
</p>
```

GRID: repeat(auto-fill, minmax(320px,1fr)), gap var(--space-lg)
ELIMINAR: imágenes Unsplash, getTechIcon con react-icons, datos fake anteriores
```

---

## PROMPT 06 — SKILLS/STACK REDESIGN

```
/ui-ux-pro-max
/caveman

Lee PORTFOLIO_STYLE_GUIDE.md sección 05 (Skills). Luego ejecuta.

ARCHIVO: src/components/sections/Skills.jsx

[21ST] MARQUEE ANIMADO (opcional):
Usar MCP 21st.dev, buscar: "marquee tech logos" o "infinite scroll marquee"
Si resulta limpio: usarlo para mostrar logos del stack frontend (HTML, CSS, JS, React, TS, etc.)
Posición: entre la cabecera de sección y las 4 categorías cards
Velocidad: lenta, dirección izquierda, pausa en hover
Adaptar: sin Tailwind, usar variables CSS del sistema
Si no resulta: omitir el marquee, ir directo a las cards

CABECERA:
```jsx
<p className="eyebrow" style={{textAlign:'center'}}>/ stack</p>
<h2 style={{fontFamily:'var(--font-heading)',textAlign:'center'}}>Con qué construyo</h2>
```

ELIMINAR COMPLETAMENTE: progress bars, porcentajes, ProgressItem/ProgressBarContainer/ProgressBarFill, soft skills section

DATOS de categorías:
```javascript
const stackCategories = [
  {
    id:'frontend',title:'Frontend',color:'var(--color-code)',icon:'⬡',
    skills:['HTML5','CSS3','JavaScript','TypeScript','React','Next.js','Styled Components','Framer Motion','Vite']
  },
  {
    id:'ai',title:'IA & Automatización',color:'var(--color-ai)',icon:'◈',
    skills:['Claude API','Gemini','n8n','Make','Agentes IA','Prompt Engineering','RAG']
  },
  {
    id:'tools',title:'Dev Tools',color:'var(--color-code)',icon:'⚙',
    skills:['Git','VS Code','Docker','Figma','npm','Linux','REST APIs']
  },
  {
    id:'content',title:'Contenido & Diseño',color:'var(--color-content)',icon:'◐',
    skills:['Premiere Pro','After Effects','Canva','Photoshop','Motion Graphics']
  }
]
```

CARD de categoría:
```css
background: var(--surface-1)
border: 1px solid var(--border)
border-radius: var(--radius-lg)
padding: var(--space-lg) var(--space-xl)
display: flex; flex-direction: column; gap: 1.25rem
```

Header de categoría:
```jsx
<div style={{display:'flex',alignItems:'center',gap:'0.75rem',borderBottom:'1px solid var(--border)',paddingBottom:'1rem'}}>
  <span style={{color:category.color,fontFamily:'var(--font-mono)',fontSize:'1.2rem'}}>{category.icon}</span>
  <h3 style={{fontFamily:'var(--font-main)',fontWeight:600,fontSize:'1rem',color:category.color}}>{category.title}</h3>
</div>
```

Skills chips (flex-wrap, gap 0.5rem):
```css
font-family: var(--font-mono); font-size: 0.75rem
padding: 0.3rem 0.75rem
background: var(--surface-3)
border: 1px solid var(--border)
border-radius: var(--radius-sm)
color: var(--text-secondary)
cursor: default
transition: var(--transition)
/* hover: border-color = category.color con 50% opacidad */
```

Grid de categorías: 2x2 desktop (grid-template-columns: repeat(2,1fr)), 1 col mobile

Nota al pie:
```jsx
<p className="mono" style={{color:'var(--text-tertiary)',fontSize:'0.75rem',textAlign:'center',marginTop:'var(--space-xl)'}}>
  // Stack en constante evolución. Siempre aprendiendo.
</p>
```
```

---

## PROMPT 07 — EXPERIENCE SECTION CLEANUP

```
/caveman
/frontend-developer

Lee PORTFOLIO_STYLE_GUIDE.md. Luego ejecuta.

ARCHIVO: src/components/sections/Experience.jsx
Ajustes quirúrgicos. NO reescribir estructura.

ESTILOS (cambios puntuales):
1. ExperienceContainer background: #1c1c1c → var(--surface-2)
2. Timeline line: width 2px → 1px
3. TimelineDot: 40px → 36px, mismos colores
4. TimelineContent: background #252525 → var(--surface-1), añadir border: 1px solid var(--border)
5. TimelineDate: fontFamily var(--font-mono), fontSize 0.8rem
6. TimelineTag: chip style exacto (mono 0.75rem, surface-3, border 1px solid var(--border), radius-sm)
7. SectionTitle: añadir fontFamily var(--font-heading)
8. Tab activo: color var(--accent-primary)

CONTENIDO — insertar al INICIO de educationData:
```javascript
{
  id:0,
  title:'42 School',
  institution:'Red Global de Escuelas 42',
  location:'Cursando',
  date:'2024 - Presente',
  description:'Modelo peer-to-peer sin profesores ni clases. Formación en C, Unix, algoritmos y proyectos reales. Aprendo resolviendo, colaborando y fallando hacia adelante.',
  tags:['C','Unix','Algoritmos','Peer Learning'],
  position:'right',
  icon: <FaGraduationCap />
}
```

UI:
- Tab "Certificaciones" → renombrar a "Formación Extra"
- Añadir eyebrow antes de SectionTitle:
  ```jsx
  <p className="eyebrow" style={{textAlign:'center',marginBottom:'0.75rem'}}>/ experiencia</p>
  ```

MOBILE (max-width 768px):
TimelineItem: width 100%, marginLeft 0, padding 0, text-align left siempre
TimelineDot: left 0, right auto siempre
TimelineContent: margin-left 50px

MANTENER INTACTO: lógica tabs, useState, renderData, todos los datos de experiencia laboral
```

---

## PROMPT 08 — CONTACT SECTION REDESIGN

```
/ui-ux-pro-max
/caveman

Lee PORTFOLIO_STYLE_GUIDE.md sección 05 (Contact). Luego ejecuta.

ARCHIVO: src/components/sections/Contact.jsx

[21ST] FORM INPUTS ANIMADOS:
Usar MCP 21st.dev, buscar: "animated input focus" o "dark form input glow"
NECESITO: inputs donde el border se ilumina con glow sutil en focus
ADAPTACIÓN: usar var(--accent-primary) como color del glow, box-shadow 0 0 0 3px rgba(255,126,95,0.1)
SI MCP NO DEVUELVE: implementar en styled-components como se describe abajo

CABECERA:
```jsx
<p className="eyebrow" style={{textAlign:'center'}}>/ contacto</p>
<h2 style={{fontFamily:'var(--font-heading)',textAlign:'center'}}>¿Tienes algo que construir?</h2>
<p style={{color:'var(--text-secondary)',textAlign:'center',maxWidth:480,margin:'0 auto 3rem'}}>
  Cuéntame tu proyecto. Si puedo ayudarte, lo hacemos.
</p>
```

COLUMNA IZQUIERDA:
- ContactTitle: "Hablemos directamente"
- ContactText: "Estoy disponible para proyectos freelance, colaboraciones y consultoría. Prefiero hablar claro desde el inicio."
- ELIMINAR el item de teléfono de ContactItems
- Badge disponibilidad (añadir ANTES de SocialLinks):
```jsx
<div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1.5rem'}}>
  <span style={{width:8,height:8,borderRadius:'50%',background:'var(--color-code)',display:'inline-block'}} />
  <span className="mono" style={{color:'var(--color-code)',fontSize:'0.8rem'}}>Disponible para proyectos</span>
</div>
```
- Social links: mantener GitHub + LinkedIn, ELIMINAR Twitter
- SocialLink border-radius: var(--radius-md) (6px, no circular)

FORMULARIO:
ContactForm background: var(--surface-1)
FormLabel: fontFamily var(--font-mono), 0.75rem, var(--text-tertiary), uppercase, letterSpacing 0.05em
FormInput/FormTextarea:
  background: var(--surface-2)
  border: 1px solid var(--border)
  border-radius: var(--radius-md)
  focus: border-color var(--accent-primary), outline none, box-shadow 0 0 0 3px rgba(255,126,95,0.1)
FormButton: usar BtnPrimary del sistema, texto "Enviar →", width 100%

ESTADO DE ÉXITO — reemplazar alert():
```javascript
const [submitted, setSubmitted] = useState(false);
const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
  setFormData({ name:'', email:'', subject:'', message:'' });
  setTimeout(() => setSubmitted(false), 5000);
};
```

Cuando submitted===true, dentro del form (AnimatePresence):
```jsx
<motion.div
  initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
  style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem',padding:'var(--space-xl)',textAlign:'center'}}
>
  <FaCheckCircle style={{fontSize:'2rem',color:'var(--color-code)'}} />
  <p style={{color:'var(--text-primary)'}}>Mensaje enviado.</p>
  <p className="mono" style={{color:'var(--text-tertiary)',fontSize:'0.8rem'}}>// Respondo en menos de 24h</p>
</motion.div>
```

AÑADIR import: FaCheckCircle desde react-icons/fa
```

---

## PROMPT 09 — FOOTER + SCROLLTOTOP CLEANUP

```
/caveman

ARCHIVOS: src/components/layout/Footer.jsx y ScrollToTop.jsx

FOOTER — layout centrado de una sola columna:
Eliminar: columnas de navegación, teléfono, Twitter

Estructura vertical centrada (gap 1.25rem entre elementos):
1. Logo: "N." (Syne 700, gradient-text) + " Rodriguez" (Inter 400, text-secondary) — inline flex
2. Tagline: "Construyendo soluciones digitales." — JetBrains Mono 0.8rem, text-tertiary
3. Social: solo FaGithub + FaLinkedin
   40px×40px, background var(--surface-2), border 1px solid var(--border)
   border-radius: var(--radius-md), hover: background var(--gradient-primary), border transparent, color white
4. Copyright: "© 2025 Nicolas Rodriguez" — Inter 0.8rem, text-tertiary
5. Stack credit: "Construido con React + Vite" — JetBrains Mono 0.75rem, text-tertiary, opacity 0.5

FooterContainer:
  border-top: 1px solid var(--border) (reemplazar ::before gradient)
  padding: var(--space-xl) 0 var(--space-lg)
  background: var(--dark-bg)

SCROLLTOTOP:
  44px×44px, border-radius: var(--radius-md)
  box-shadow: 0 4px 12px rgba(255,126,95,0.2)
  hover: translateY(-2px), shadow más pronunciada
  MANTENER: AnimatePresence + framer logic intacta
```

---

## PROMPT 10 — POLISH FINAL + INTEGRACIÓN

```
/ui-ux-pro-max
/frontend-developer
/caveman

Lee PORTFOLIO_STYLE_GUIDE.md completo. Prompt de cierre.

CHECKLIST — revisar archivo por archivo y corregir lo que falle:

GlobalStyles: [ ] todas las variables CSS, [ ] utility classes .mono .heading .gradient-text .eyebrow
Navbar: [ ] logo dos spans, [ ] 4 links, [ ] scroll behavior, [ ] mobile OK
Hero: [ ] H1 correcto, [ ] terminal widget, [ ] CTAs radius 6px, [ ] sin stock photos
About: [ ] sin Unsplash, [ ] stats 4 cards, [ ] bloque actualmente, [ ] 4 chips de área
Projects: [ ] renombrado "Trabajo", [ ] sin Unsplash, [ ] filtros nuevos, [ ] nota NDA
Skills: [ ] renombrado "Con qué construyo", [ ] sin progress bars, [ ] 4 categorías, [ ] categoría IA
Experience: [ ] 42 School en educationData[0], [ ] fondos variables CSS, [ ] tab "Formación Extra"
Contact: [ ] sin alert(), [ ] badge disponible, [ ] sin Twitter, [ ] sin teléfono, [ ] input glow focus
Footer: [ ] sin columnas nav, [ ] solo 2 socials, [ ] radius 6px

CORRECCIONES GLOBALES:
- border-radius: 50px → var(--radius-md)
- #1a1a1a hardcoded → var(--dark-bg)
- #252525 hardcoded → var(--surface-3)
- font-family: 'Poppins' → var(--font-main)
- alert() → UI state

RESPONSIVE:
375px: hero columna única (terminal debajo), nav colapsada
768px: grids → 1 columna
1280px: layouts 2 columnas funcionando

COMMIT:
git add .
git commit -m "feat: portfolio redesign — nicolas rodriguez identity system v1.0"
```

---

## NOTAS OPERATIVAS

```
REGLAS DURAS:
1. Leer PORTFOLIO_STYLE_GUIDE.md antes de cada prompt
2. NO inventar colores fuera del sistema
3. NO usar border-radius > 12px en botones o cards
4. NO usar progress bars de porcentajes
5. NO importar librerías nuevas sin confirmar primero
6. Código: inglés. Contenido visible: español.

PARA 21ST.DEV MCP:
- Convertir Tailwind → styled-components siempre
- Verificar compatibilidad: React 19 + Framer Motion 12 + styled-components 6
- Si componente usa hooks incompatibles: usar fallback descrito en el prompt

PARA /caveman:
- Usar en respuestas internas del agente
- NO usar en código generado
- NO usar en contenido visible de la app

ORDEN: 01→02→03→04→05→06→07→08→09→10
No saltarse. No combinar prompts con riesgo de conflicto.
```
