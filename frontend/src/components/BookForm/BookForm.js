import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBook } from '../../redux/books/actionCreators';
import './BookForm.css';

export const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const books = {
        title,
        author,
        id: uuidv4(),
      };
      dispatch(addBook(books));
      setTitle('');
      setAuthor('');
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
      </form>
    </div>
  );
};
