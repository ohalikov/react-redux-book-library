import { createSlice } from '@reduxjs/toolkit';

const initialState = []
const bookSlice = createSlice(
  {
    name: 'books',
    initialState,
    reducers: {
      addBook: (state, action) => {
        return [...state, action.payload];
      },
      toggleFavorite: (state, action) => {
        return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
        );
      },
      deleteBook: (state, action) => {
        return state.filter((book) => book.id !== action.payload);
      },
    },
  },
)

export const {addBook, toggleFavorite, deleteBook} = bookSlice.actions
export const booksReducer = bookSlice.reducer;