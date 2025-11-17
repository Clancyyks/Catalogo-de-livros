// src/components/BookForm.jsx
import React, { useState } from 'react';

function BookForm({ onAddBook }) {
  // Requisito: Input Controlado
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação: não inserir livro com campos vazios
    if (!title.trim() || !author.trim() || !year.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    onAddBook({ title, author, year });

    // Limpa o formulário
    setTitle('');
    setAuthor('');
    setYear('');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>Novo livro</h3>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="number" placeholder="Ano" value={year} onChange={(e) => setYear(e.target.value)} maxLength="4" />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default BookForm;