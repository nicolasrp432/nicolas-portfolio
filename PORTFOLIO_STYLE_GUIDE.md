# NICOLAS RODRIGUEZ — PORTFOLIO STYLE GUIDE v1.0
> Este documento es el norte magnético del proyecto. No se modifica entre iteraciones.
> El agente debe leerlo COMPLETO antes de escribir una sola línea de código.

---

## 01. IDENTIDAD CENTRAL

**Quién es Nicolas:**
> "Construyo soluciones digitales usando tecnología, criterio y aprendizaje constante."

No es "un frontend developer". Es alguien que:
- Entiende cómo funcionan las cosas y por qué funcionan
- Cruza código + IA + diseño + contenido como un solo flujo de trabajo
- Usa React, pero también automatización, agentes de IA, edición de video
- Estudia en 42 (peer-to-peer, sin profesores, aprendizaje por proyectos reales)
- Es autodidacta que aprecia entender los fundamentos, no solo usar herramientas
- Trabaja con Claude, Gemini, agentes y sistemas IA como parte de su stack diario

**Tono de voz:** Directo. Curioso. Sin pretensión. Concreto.
- ✅ "Construí X para resolver Y"
- ✅ "Uso IA como herramienta, no como magia"
- ❌ "Desarrollador apasionado especializado en crear experiencias"
- ❌ "Comprometido con la excelencia"

---

## 02. PALETA DE COLORES

### Colores base (NO cambiar)
```
--dark-bg:          #0f0f0f   /* Más profundo que el actual #1a1a1a */
--surface-1:        #151515   /* Cards, navbars */
--surface-2:        #1e1e1e   /* Fondos de secciones alternas */
--surface-3:        #252525   /* Input fields, tags */
--border:           #2a2a2a   /* Bordes sutiles */
```

### Acento principal (mantener los colores actuales, ajustar uso)
```
--accent-primary:   #ff7e5f   /* Coral — acción principal */
--accent-secondary: #feb47b   /* Naranja suave — gradiente */
--accent-pink:      #ff5e7d   /* Rosa coral — highlight ocasional */
```

### Gradiente signature
```
background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
```

### Texto
```
--text-primary:     #f0f0f0   /* Títulos principales */
--text-secondary:   #888888   /* Texto de apoyo */
--text-tertiary:    #555555   /* Metadata, etiquetas */
--text-accent:      #ff7e5f   /* Links, highlights */
```

### Colores funcionales (IA/Tech stack)
```
--color-ai:         #7c6ef0   /* Morado — IA tools */
--color-code:       #4ec9b0   /* Teal — código/dev */
--color-design:     #ff7e5f   /* Coral — diseño (ya existente) */
--color-content:    #ffd166   /* Amarillo — contenido/video */
```

---

## 03. TIPOGRAFÍA

### Fuentes (añadir al main.jsx)
```
Inter — cuerpo y UI (reemplaza Poppins para body)
JetBrains Mono — código, técnico, etiquetas especiales  
Syne — títulos grandes, hero (reemplaza Montserrat)
```

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap
```

### Escala tipográfica
```
--font-hero:    clamp(3rem, 7vw, 6rem)      /* Solo para el H1 del hero */
--font-h2:      clamp(1.8rem, 3.5vw, 2.8rem)
--font-h3:      clamp(1.2rem, 2vw, 1.6rem)
--font-body:    1rem / 1.7
--font-small:   0.85rem
--font-mono:    0.9rem                       /* JetBrains Mono */
```

### Regla tipográfica
- `font-family: Syne` → Solo H1, H2, nombres de secciones
- `font-family: Inter` → Todo el cuerpo, navegación, botones
- `font-family: JetBrains Mono` → Tags de tech stack, snippets, año, números de métricas

---

## 04. ESPACIADO Y LAYOUT

### Sistema de espaciado (múltiplos de 8)
```
--space-xs:   0.5rem   /* 8px */
--space-sm:   1rem     /* 16px */
--space-md:   1.5rem   /* 24px */
--space-lg:   2rem     /* 32px */
--space-xl:   3rem     /* 48px */
--space-2xl:  5rem     /* 80px */
--space-3xl:  8rem     /* 128px */
```

### Grid principal
```
max-width: 1280px
width: 90%
margin: 0 auto
```

### Secciones
- Padding vertical secciones: `var(--space-3xl) 0`
- Gap entre elementos de grid: `var(--space-xl)`

---

## 05. COMPONENTES CLAVE — REGLAS DE DISEÑO

### Navbar
- Fija, transparente → se vuelve `--surface-1` con backdrop-blur al scrollear
- Logo: "N." en Syne bold + gradiente, seguido de "Rodriguez" en Inter regular
- Links: Inter 500, uppercase, letter-spacing: 0.05em, tamaño 0.8rem
- Sin border-bottom al inicio, con border sutil al scroll

### Hero Section
- Layout: Dos columnas en desktop, columna única en mobile
- Columna izquierda (60%): Texto, CTAs
- Columna derecha (40%): Elemento visual técnico (terminal/code snippet animado, NO foto de stock)
- El H1 debe decir algo como: "Construyo soluciones. Entiendo el porqué."
- Subtítulo: máximo 2 líneas, sin adjetivos vacíos
- CTAs: "Ver proyectos" (primario) + "Escribeme" (secundario, outline)
- Elemento decorativo: Terminal animado mostrando su stack real

### About Section
- NO usar foto de stock genérica
- Usar una foto real de Nicolas o un avatar técnico/minimalista
- Layout tipo "editorial": columna de texto pesada izquierda, detalles/stats derecha
- Stats rápidos: años de experiencia, proyectos, tecnologías, escuela 42
- Bloques de identidad: Dev / IA / Contenido / Diseño — con íconos simples

### Projects Section  
- Renombrar a "Soluciones" o "Trabajo"
- Cards más grandes, más aire, menos elementos
- Mostrar: cliente/contexto, problema resuelto, tecnología usada, resultado
- NO mostrar proyectos fake de Unsplash con títulos genéricos
- Placeholder honesto: "Añade aquí proyectos reales de clientes"
- Filtros: Web / Automatización / IA / Contenido

### Skills Section
- Renombrar a "Stack" o "Con qué construyo"
- Dividir en categorías reales:
  1. **Frontend** — React, TypeScript, Next.js, Styled Components
  2. **IA & Automatización** — Claude, Gemini, n8n, Make, agentes
  3. **Herramientas** — Git, Figma, Docker, VS Code
  4. **Contenido & Diseño** — Premiere, After Effects, Canva
- NO usar progress bars (son arbitrarias y poco honestas)
- Usar grid de iconos/chips limpio

### Experience Section
- Mantener timeline pero hacerlo más limpio
- Añadir 42 School como formación destacada (mencionar el modelo peer-to-peer)
- Añadir aprendizaje autodidacta como un valor, no como debilidad

### Contact Section
- Más directa, menos burocrática
- Título: "¿Tienes algo que construir?" o "Hablemos"
- Mantener el formulario pero estilo más limpio
- Añadir links directos: LinkedIn, GitHub, Email

---

## 06. ANIMACIONES — PRINCIPIOS

**Regla principal:** Las animaciones tienen propósito, no son decoración.

### Tipos permitidos
```
entrance:     fade-in + translateY(20px) → normal. Duration: 0.5s
hover:        translateY(-4px) + shadow sutil. Duration: 0.2s
interactive:  scale(0.97) al click. Duration: 0.1s
sequential:   staggerChildren: 0.08s (no más)
```

### Tipos prohibidos
- Rotaciones sin propósito
- Parallax exagerado
- Animaciones que duren más de 0.8s
- Elementos que reboten sin razón

### Terminal animado (Hero)
- Simular escritura de comandos reales
- Mostrar su stack: `npm create vite@latest`, `claude -p "build me a..."`, etc.
- Cursor parpadeante al final
- Fondo: `--surface-2`, border: `--border`, font: JetBrains Mono

---

## 07. ELEMENTOS UI ESPECÍFICOS

### Tags / Chips de tecnología
```css
font-family: JetBrains Mono
font-size: 0.75rem
padding: 0.3rem 0.75rem
background: var(--surface-3)
border: 1px solid var(--border)
border-radius: 4px
color: var(--text-secondary)
```

### Botón primario (CTA)
```css
background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))
color: white
padding: 0.75rem 1.75rem
border-radius: 6px  /* NO usar 50px — demasiado redondeado, pierde seriedad */
font-family: Inter
font-weight: 600
font-size: 0.9rem
letter-spacing: 0.02em
```

### Botón secundario
```css
background: transparent
border: 1.5px solid var(--border)
color: var(--text-primary)
/* mismos padding/border-radius que primario */
hover: border-color: var(--accent-primary), color: var(--accent-primary)
```

### Cards de proyectos
```css
background: var(--surface-1)
border: 1px solid var(--border)
border-radius: 8px
padding: var(--space-xl)
hover: border-color: var(--accent-primary) con opacidad 0.4
transition: border-color 0.2s ease
/* SIN box-shadow agresiva — solo border hover */
```

### Línea decorativa signature
```css
/* Usar como separador de sección o accento */
width: 40px
height: 3px
background: linear-gradient(to right, var(--accent-primary), var(--accent-secondary))
border-radius: 2px
```

---

## 08. ESTRUCTURA DE SECCIONES (ORDEN FINAL)

```
1. Navbar (fija)
2. Hero — "Construyo soluciones"
3. About — Quién soy (identidad completa)
4. Proyectos/Soluciones — Trabajo real con clientes
5. Stack — Con qué construyo (Dev + IA + Diseño)
6. Experiencia & Formación — Timeline + 42
7. Contacto — "Hablemos"
8. Footer — Minimalista
```

---

## 09. LO QUE NO SE PUEDE CAMBIAR ENTRE ITERACIONES

1. La paleta de colores definida aquí
2. Las tres fuentes: Syne + Inter + JetBrains Mono
3. El tono de voz: directo, sin adjetivos vacíos
4. La tecnología base: React + Vite + Styled Components + Framer Motion
5. La estructura de 8 secciones en ese orden
6. El nombre y apellido: "Nicolas Rodriguez" (sin tilde en Nicolas)
7. El idioma: Español para el contenido, inglés para código/tech

---

## 10. REFERENCIAS DE ESTILO (INSPIRACIÓN VISUAL)

El resultado debe evocar:
- **Claridad técnica** — Como una buena documentación bien diseñada
- **Personalidad** — No corporate, no template, tiene carácter propio
- **Confianza** — No necesita convencer con efectos, convence con claridad

Evitar:
- Portfolio de agencia (demasiado pulido, sin alma)
- Template de Dribbble genérica
- "Dark mode hacker portfolio" con neon verde y matrix effects
- Exceso de glassmorphism
