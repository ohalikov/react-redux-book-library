import { createSlice } from '@reduxjs/toolkit';

const initialState = [{
    id: '',
    title: '',
    author: '',
    isFavorite: '',
}]
const bookSlice = createSlice(
  {
    name: 'books',
    initialState,
    reducers: {
      addBook: (state, action) => {
        return [...state, action.payload];
      },
      toggleFavorite: (state, action) => {
        console.log('setAuthorFilter =>', state);
        state.author = action.payload;
      },
      deleteBook: () => initialState,
    },
  },
)

export const {addBook, toggleFavorite, deleteBook} = bookSlice.actions
// const filterSlice = createSlice(
//     {
//       name: 'filter',
//       initialState,
//       reducers: {
//         setTitleFilter: (state, action) => {
//           // Immer library
//           state.title = action.payload;
//           // return { ...state, title: action.payload };
//         },
//         setAuthorFilter: (state, action) => {
//           console.log('setAuthorFilter =>', state);
//           state.author = action.payload;
//         },
//         setOnlyFavoriteFilter: (state) => {
//           state.onlyFavorite = !state.onlyFavorite;
//         },
//         resetFilters: () => initialState,
//       },
//     },
//   );
console.log(bookSlice)

export const booksReducer = bookSlice.reducer;