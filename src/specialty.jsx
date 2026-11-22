import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SpecialtyPage from './SpecialtyPage';
import { specialtyById } from './data/specialties';
import './styles/index.css';

const root = document.getElementById('root');
const specialty = specialtyById(root.dataset.specialty);
createRoot(root).render(<StrictMode><SpecialtyPage specialty={specialty} /></StrictMode>);
