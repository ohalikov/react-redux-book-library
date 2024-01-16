import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
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
  },
});
console.log(filterSlice);
export const { setTitleFilter } = filterSlice.actions;
export const selectTitleFilter = (state) => {
  console.log(state);
  return state.filter.title;
};
export default filterSlice.reducer;
