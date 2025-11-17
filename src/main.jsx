// src/main.jsx (ou index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Assumindo que App.jsx está em src/
import { ThemeProvider } from './context/ThemeContext.jsx'; // ⬅️ CORREÇÃO ESSENCIAL: Com chaves { } se você estiver usando export nomeado
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 🛑 AQUI ELE ENCONTRARÁ O COMPONENTE 🛑 */}
    <ThemeProvider> 
      <App />
    </ThemeProvider>
  </React.StrictMode>
);