import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HistoryPage from './HistoryPage';
import './styles/index.css';
createRoot(document.getElementById('root')).render(<StrictMode><HistoryPage /></StrictMode>);
