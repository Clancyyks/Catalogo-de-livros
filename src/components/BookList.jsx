// src/components/BookList.jsx
import React from 'react';
import BookItem from './BookItem'; // Importa o componente que acabamos de criar

function BookList({ books, onRemoveBook }) {
    if (!books || books.length === 0) {
        return <p>Nenhum livro encontrado. Adicione um!</p>;
    }

    return (
        <ul className="book-list">
            {books.map(book => (
                <BookItem 
                    key={book.id} 
                    book={book} 
                    onRemove={onRemoveBook} 
                />
            ))}
        </ul>
    );
}

export default BookList;