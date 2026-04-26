const theme = {
  colors: {
    background: '#0f0f0f',
    surface1: '#151515',
    surface2: '#1e1e1e',
    surface3: '#252525',
    border: '#2a2a2a',
    text: '#f0f0f0',
    textSecondary: '#888888',
    textTertiary: '#555555',
    textAccent: '#ff7e5f',
    accent1: '#ff7e5f',
    accent2: '#feb47b',
    accentPink: '#ff5e7d',
    cardBg: '#151515',
    navBg: 'rgba(21, 21, 21, 0.9)',
    aiPurple: '#7c6ef0',
    codeTeal: '#4ec9b0',
    contentYellow: '#ffd166',
  },
  fonts: {
    main: "'Inter', sans-serif",
    heading: "'Syne', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radii: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.15)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.2)',
    large: '0 8px 24px rgba(0, 0, 0, 0.25)',
  },
  transitions: {
    fast: '0.15s',
    standard: '0.2s ease-in-out',
    slow: '0.5s',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '5rem',
    '3xl': '8rem',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
    secondary: 'linear-gradient(to right, #ff5e7d, #ff7e5f)',
  }
};

export default theme;
