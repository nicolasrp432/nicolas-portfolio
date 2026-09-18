import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { enableMotionStyles } from './lib/gsap';
import './styles/index.css';

// Set before the first paint: CSS uses `[data-motion="on"]` to pre-hide the
// elements GSAP is about to animate in. Without it, nothing is ever hidden.
enableMotionStyles();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
