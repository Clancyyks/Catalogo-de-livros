// src/components/Counters.jsx
import React from 'react';

function Counters({ total, filtered }) {
    return (
        <div className="counters">
            <span>Total de Livros: {total}</span> | <span>Livros Filtrados: {filtered}</span>
        </div>
    );
}

export default Counters;