import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --dark-bg: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #e0e0e0;
    --accent-gradient-1: #ff7e5f;
    --accent-gradient-2: #feb47b;
    --accent-pink: #ff5e7d;
    --transition: all 0.3s ease-in-out;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
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
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
    border-radius: 2px;
  }

  .gradient-text {
    background: linear-gradient(to right, var(--accent-gradient-1), var(--accent-gradient-2));
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
`;

export default GlobalStyles;
