import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Header() {
    const { theme, toggleTheme } = useTheme();
    return (
        <header>
            <h1>📚 Catálogo de Livros</h1>
            <button onClick={toggleTheme}>Tema: {theme === 'light' ? 'Claro' : 'Escuro'}</button>
        </header>
    );
}

export default Header;