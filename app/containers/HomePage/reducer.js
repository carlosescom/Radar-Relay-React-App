/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_MARKET_BASE, CHANGE_MARKET_QUOTE } from './constants';

// The initial state of the App
export const initialState = {
  MarketBase: '',
  MarketQuote: '',
  OrderBook: {},
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_MARKET_BASE:
        draft.MarketBase = action.MarketBase || `ZRX`;
      case CHANGE_MARKET_QUOTE:
        draft.MarketQuote = action.MarketQuote || `WETH`;
        break;
    }
  });

export default homeReducer;
