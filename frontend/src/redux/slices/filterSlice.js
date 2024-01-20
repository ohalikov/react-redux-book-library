import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
};

const filterSlice = createSlice({
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
    resetFilters: (state) => initialState,
  },
});
export const { setTitleFilter, setAuthorFilter, resetFilters } =
  filterSlice.actions;
export const selectTitleFilter = (state) => {
  return state.filter.title;
};
export const selectAuthorFilter = (state) => {
  return state.filter.author;
};
export default filterSlice.reducer;
