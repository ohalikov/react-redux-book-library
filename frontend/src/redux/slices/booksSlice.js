import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBookWithID } from '../../utils/createBookWithID';
import { setError } from './errorSlice';

const initialState = [];

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

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
      if (action.payload.title && action.payload.author) {
        const books = createBookWithID(action.payload, 'api');
        state.push(books); // immer
      }
    });
  },
});

export const { addBook, toggleFavorite, deleteBook } = bookSlice.actions;
export const selectBooks = (state) => {
  return state.books;
};
export const booksReducer = bookSlice.reducer;
