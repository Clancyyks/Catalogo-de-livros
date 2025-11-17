// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { useTheme } from './context/ThemeContext';

// Importações dos outros componentes...
import Header from './components/Header'; // Componente com botão de tema
import SearchBar from './components/SearchBar';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Counters from './components/Counters'; // Componente simples que exibe Total/Filtrados

// Estrutura básica dos outros componentes
const Header = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <header>
            <h1>📚 Catálogo de Livros</h1>
            <button onClick={toggleTheme}>Tema: {theme === 'light' ? 'Claro' : 'Escuro'}</button>
        </header>
    );
};

const BookItem = ({ book, onRemove }) => (
    <li className="book-item">
        {book.title} — {book.author} ({book.year})
        <button onClick={() => onRemove(book.id)}>Remover</button>
    </li>
);

const BookList = ({ books, onRemoveBook }) => (
    <ul className="book-list">
        {books.map(book => (
            <BookItem key={book.id} book={book} onRemove={onRemoveBook} />
        ))}
    </ul>
);

const Counters = ({ total, filtered }) => (
    <div className="counters">
        <span>Total: {total}</span> | <span>Filtrados: {filtered}</span>
    </div>
);


function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 💡 Persistindo o termo de busca com useLocalStorage
  const [searchTerm, setSearchTerm] = useLocalStorage('bookSearchTerm', '');

  // 1. Carregar lista inicial de livros (useEffect)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/books.json');
        if (!response.ok) {
          throw new Error('Falha ao carregar os dados. Verifique public/books.json.');
        }
        const data = await response.json();
        // Garante que todos os livros têm um ID string ou number (para keys estáveis)
        setBooks(data.map(book => ({ ...book, id: book.id || Date.now() + Math.random() }))); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []); // Executa apenas uma vez

  // 2. Adicionar/Remover Livro
  const addBook = (newBook) => {
    const bookWithId = { ...newBook, id: Date.now() }; 
    setBooks(prevBooks => [...prevBooks, bookWithId]);
  };

  const removeBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };
  
  // 3. Lógica de Filtragem (useMemo)
  const filteredBooks = useMemo(() => {
    if (!searchTerm) {
      return books;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowerCaseSearch) ||
      book.author.toLowerCase().includes(lowerCaseSearch)
    );
  }, [books, searchTerm]);
  
  // 4. Renderização Condicional
  if (isLoading) return <div className="loading-message">Carregando...</div>;
  if (error) return <div className="error-message">Erro: {error}</div>;

  return (
    <div className="container">
      <Header />
      <hr />
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <hr />
      
      <BookForm onAddBook={addBook} />
      
      <hr />
      
      <BookList books={filteredBooks} onRemoveBook={removeBook} />
      
      {/* Mensagem de nenhum livro encontrado */}
      {books.length > 0 && filteredBooks.length === 0 && (
        <div className="no-results">Nenhum livro encontrado.</div>
      )}
      
      <hr />
      
      <Counters total={books.length} filtered={filteredBooks.length} />
    </div>
  );
}

// 💡 O App deve ser envolvido pelo ThemeProvider no index.js
export default App;