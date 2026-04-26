import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
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

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-main);
    background-color: var(--dark-bg);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button, input, textarea {
    font-family: inherit;
  }

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section {
    padding: 6rem 0;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    position: relative;
    display: inline-block;
  }

  .section-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50%;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: 2px;
  }

  .gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    .section {
      padding: 4rem 0;
    }

    .section-title {
      font-size: 2rem;
    }
  }

  .mono { font-family: var(--font-mono); }
  .heading { font-family: var(--font-heading); }
  .eyebrow {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-tertiary);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

export default GlobalStyles;
