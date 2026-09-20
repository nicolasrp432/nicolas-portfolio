import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EducationPage from './EducationPage.jsx';
import { enableMotionStyles } from './lib/gsap';
import './styles/index.css';

// Set before the first paint, exactly as `main.jsx` does: CSS uses
// `[data-motion="on"]` to pre-hide the elements GSAP is about to animate in.
enableMotionStyles();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EducationPage />
  </StrictMode>,
);
