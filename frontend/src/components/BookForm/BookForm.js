import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import booksData from '../../data/books.json';
import { createBookWithID } from '../../utils/createBookWithID';
import { fetchBook } from '../../redux/slices/booksSlice';
import { FaSpinner } from 'react-icons/fa';
import './BookForm.css';

export const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    const randomBookWithId = createBookWithID(randomBook, 'random');

    dispatch(addBook(randomBookWithId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const books = createBookWithID({ title, author }, 'manual');
      dispatch(addBook(books));
      setTitle('');
      setAuthor('');
    } else {
      dispatch(setError('U must fill this fields'));
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="app-block book-form">
      <h1>BookForm</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Loading Book ...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add random book'
          )}
        </button>
      </form>
    </div>
  );
};
