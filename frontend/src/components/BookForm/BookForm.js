import { useState } from 'react'
import './BookForm.css'

export const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      // dispatch actioz
      console.log(title, author)
      setTitle('')
      setAuthor('')
    }
  }
  return (
    <div className="app-block book-form">
      <h1>BookForm</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>title: </label>
          <input type='text' id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor='author'>author: </label>
          <input type='text' id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <button type="submit">Add book</button>
      </form>
    </div>
  );
};
