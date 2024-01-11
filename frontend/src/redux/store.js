import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/reducer';

export const store = configureStore({
  reducer: {
    booksList: booksReducer,
  },
});
