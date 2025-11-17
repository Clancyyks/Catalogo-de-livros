// src/components/SearchBar.jsx
import React, { useRef, useEffect } from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  // Requisito: Foco automático (useRef)
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="search-bar">
      <label htmlFor="search">Buscar:</label>
      <input
        id="search"
        type="text"
        ref={inputRef} 
        value={searchTerm} // Input Controlado
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Título ou Autor..."
      />
    </div>
  );
}

export default SearchBar;