import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import reportWebVitals from './reportWebVitals.jsx'

// Import Google Fonts
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap';
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

reportWebVitals(); 