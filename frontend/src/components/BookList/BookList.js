import { useDispatch, useSelector } from 'react-redux';
import { delBook } from '../../redux/books/actionCreators';

import './BookList.css';

export const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleSubmit = (bookId) => {
    dispatch(delBook(bookId));
  };

  console.log('books->', books);
  return (
    <div className="app-block book-list">
      <h2>BookList</h2>

      {books.length === 0 ? (
        <p>no books, sorry</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={book.id}>
              <div className="book-info">
                {++index}. {book.title} by <strong>{book.author}</strong>
                <div className="book-action">
                  <button onClick={() => handleSubmit(book.id)}>delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
