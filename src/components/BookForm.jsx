// src/components/BookForm.jsx
import React, { useState } from 'react';

function BookForm({ onAddBook }) {
  // ... sua lógica de useState e handleSubmit ...
  const [title, setTitle] = useState('');
  // ... (código omitido)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Preencha os campos!');
      return;
    }
    onAddBook({ title, author: 'Placeholder', year: '2025' });
    setTitle('');
  };

  return (
    // ... seu formulário JSX
    <form onSubmit={handleSubmit}>
        <h3>Novo Livro</h3>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Adicionar</button>
    </form>
  );
}

// 🛑 ESTA LINHA ESTAVA FALTANDO OU INCORRETA:
export default BookForm;