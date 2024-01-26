import { createSlice } from '@reduxjs/toolkit';

const initialState = []
const bookSlice = createSlice(
  {
    name: 'books',
    initialState,
    reducers: {
      addBook: (state, action) => {
        // return [...state, action.payload];
        state.push(action.payload)  // immer
      },
      toggleFavorite: (state, action) => {
        state.forEach(book => {
          if (book.id === action.payload) {
            book.isFavorite = !book.isFavorite // immer
          }
        })
      },
      deleteBook: (state, action) => {
        return state.filter((book) => book.id !== action.payload);
      },
    },
  },
)

export const {addBook, toggleFavorite, deleteBook} = bookSlice.actions
export const selectBooks = (state) => state.books
export const booksReducer = bookSlice.reducer;