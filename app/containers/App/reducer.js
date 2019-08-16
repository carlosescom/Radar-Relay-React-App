/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_ORDER_BOOK_SUCCESS,
  LOAD_ORDER_BOOK,
  LOAD_ORDER_BOOK_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  OrderBook: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ORDER_BOOK:
        draft.loading = true;
        draft.error = false;
        draft.OrderBook = false;
        break;

      case LOAD_ORDER_BOOK_SUCCESS:
        console.log(LOAD_ORDER_BOOK_SUCCESS, action)
        draft.loading = false;
        draft.OrderBook = action.OrderBook;
        break;

      case LOAD_ORDER_BOOK_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
