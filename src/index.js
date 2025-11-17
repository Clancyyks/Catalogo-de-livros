// src/index.js (ou main.jsx se usando Vite)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Requisito: Context API para tema */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);