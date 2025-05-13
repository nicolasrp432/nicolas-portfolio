const theme = {
  colors: {
    background: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#e0e0e0',
    accent1: '#ff7e5f',
    accent2: '#feb47b',
    accentPink: '#ff5e7d',
    cardBg: '#252525',
    navBg: 'rgba(26, 26, 26, 0.9)',
  },
  fonts: {
    main: "'Poppins', sans-serif",
    heading: "'Montserrat', sans-serif",
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
    standard: 'all 0.3s ease-in-out',
    slow: 'all 0.5s ease-in-out',
    fast: 'all 0.2s ease-in-out',
  },
  gradients: {
    primary: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    secondary: 'linear-gradient(to right, #ff5e7d, #ff7e5f)',
  }
};

export default theme;
