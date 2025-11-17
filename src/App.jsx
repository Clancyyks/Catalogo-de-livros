// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { useTheme } from './context/ThemeContext';

// Importações dos componentes separados
import Header from './components/Header'; // Você precisará criar Header.jsx
import SearchBar from './components/SearchBar';
import BookForm from './components/BookForm';
import BookList from './components/BookList'; // Você precisará criar BookList.jsx
import Counters from './components/Counters'; // Você precisará criar Counters.jsx


function App() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 💡 Requisito: useLocalStorage para persistir a busca
    const [searchTerm, setSearchTerm] = useLocalStorage('bookSearchTerm', '');

    // Requisito: Carregar lista inicial de public/books.json (useEffect)
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/books.json');
                if (!response.ok) {
                    throw new Error('Falha ao carregar os dados dos livros.');
                }
                const data = await response.json();
                setBooks(data.map(book => ({ ...book, id: book.id || Date.now() + Math.random() }))); 
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, []); 

    // Requisito: Cadastrar novo livro
    const addBook = (newBook) => {
        const bookWithId = { ...newBook, id: Date.now() }; 
        setBooks(prevBooks => [...prevBooks, bookWithId]);
    };

    // Requisito: Remover livro individualmente
    const removeBook = (id) => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    };
    
    // Requisito: Buscar por título/autor (Lógica de filtragem otimizada com useMemo)
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
    
    // Renderização Condicional
    if (isLoading) return <div className="loading-message">Carregando...</div>;
    // Requisito: Erro no fetch exibe mensagem amigável
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
            
            {/* Requisito: Mensagem 'Nenhum livro encontrado.' */}
            {books.length > 0 && filteredBooks.length === 0 && (
                <div className="no-results">Nenhum livro encontrado.</div>
            )}
            
            <hr />
            
            {/* Requisito: Exibir contadores */}
            <Counters total={books.length} filtered={filteredBooks.length} />
        </div>
    );
}

export default App;