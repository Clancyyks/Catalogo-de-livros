// src/components/BookItem.jsx
import React from 'react';

function BookItem({ book, onRemove }) {
    if (!book) return null;

    return (
        <li className="book-item">
            <div className="book-info">
                <strong>{book.title}</strong> por {book.author} ({book.year})
            </div>
            <button onClick={() => onRemove(book.id)}>Remover</button>
        </li>
    );
}

export default BookItem;