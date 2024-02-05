import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBookWithID } from '../../utils/createBookWithID';
import { setError } from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

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
      state.books.push(action.payload); // immer
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite; // immer
        }
      });
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
  },
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaAPI = false;
      if (action.payload.title && action.payload.author) {
        const books = createBookWithID(action.payload, 'api');
        state.books.push(books); // immer
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaAPI = false;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       const books = createBookWithID(action.payload, 'api');
  //       state.push(books); // immer
  //     }
  //   });
  // },
});

export const { addBook, toggleFavorite, deleteBook } = bookSlice.actions;
export const selectBooks = (state) => {
  return state.books.books;
};
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI
export const booksReducer = bookSlice.reducer;
