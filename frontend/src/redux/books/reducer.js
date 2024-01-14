import * as a from './actionTypes';

const initialState = [];

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.ADD_BOOK:
      return [...state, action.payload];
    case a.DEL_BOOK:
      return state.filter((item) => item.id !== action.bookID);
    default:
      return state;
  }
};

export default booksReducer;
