/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_ORDER_BOOK,
  LOAD_ORDER_BOOK_SUCCESS,
  LOAD_ORDER_BOOK_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ORDER_BOOK
 */
export function loadOrderBook() {
  return {
    type: LOAD_ORDER_BOOK,
  };
}

/**
 * Dispatched when the order book is loaded by the request saga
 *
 * @param  {object} OrderBook The asks for the selected trading pair
 *
 * @return {object} An action object with a type of LOAD_ORDER_BOOK_SUCCESS passing the bids
 */
export function OrderBookLoaded(OrderBook) {
  return {
    type: LOAD_ORDER_BOOK_SUCCESS,
    OrderBook,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_ORDER_BOOK_ERROR passing the error
 */
export function OrderBookLoadingError(error) {
  return {
    type: LOAD_ORDER_BOOK_ERROR,
    error,
  };
}
