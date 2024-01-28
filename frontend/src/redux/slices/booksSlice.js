import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBookWithID } from '../../utils/createBookWithID';

const initialState = [];

export const fetchBook = createAsyncThunk('books/fetchBook', async () => {
  const res = await axios.get('http://localhost:45000/random-book');
  return res.data;
});

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      // return [...state, action.payload];
      state.push(action.payload); // immer
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite; // immer
        }
      });
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      console.log('===> fulfilled', action);
      if (action.payload.title && action.payload.author) {
        const books = createBookWithID(action.payload, 'api');
        state.push(books); // immer
      }
    });

    builder.addCase(fetchBook.pending, (state, action) => {
      console.log('===> pending', action);
    });

    builder.addCase(fetchBook.rejected, (state, action) => {
      console.log('===> rejected', action);
    });
  },
});

export const { addBook, toggleFavorite, deleteBook } = bookSlice.actions;
export const selectBooks = (state) => state.books;
export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get('http://localhost:4000/random-book');
    if (res?.data?.title && res?.data?.author) {
      const books = createBookWithID(res.data, 'api');
      dispatch(addBook(books));
    }
  } catch (error) {
    alert('sorry, try later', error);
  }
};
export const booksReducer = bookSlice.reducer;
