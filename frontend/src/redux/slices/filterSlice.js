import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavorite: '',
};

const filterSlice = createSlice(
  {
    name: 'filter',
    initialState,
    reducers: {
      setTitleFilter: (state, action) => {
        // Immer library
        state.title = action.payload;
        // return { ...state, title: action.payload };
      },
      setAuthorFilter: (state, action) => {
        console.log('setAuthorFilter =>', state);
        state.author = action.payload;
      },
      setOnlyFavoriteFilter: (state) => {
        state.onlyFavorite = !state.onlyFavorite;
      },
      resetFilters: () => initialState,
    },
  },
);

export const {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  resetFilters,
} = filterSlice.actions;
export const selectTitleFilter = (state) => {
  return state.filter.title;
};
export const selectAuthorFilter = (state) => {
  return state.filter.author;
};
export const selectOnlyFavoiteFilter = (state) => {
  return state.filter.onlyFavorite;
};

export const filterReducer = filterSlice.reducer;
