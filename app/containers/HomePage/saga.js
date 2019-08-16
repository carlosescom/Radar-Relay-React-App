/**
 * Gets the order book
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_ORDER_BOOK } from 'containers/App/constants';
import { OrderBookLoaded, OrderBookLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import {
  makeSelectMarketBase,
  makeSelectMarketQuote,
} from 'containers/HomePage/selectors';

/**
 * Github bids request/response handler
 */
export function* getOrderBook() {
  // Select username from store
  const MarketBase = yield select(makeSelectMarketBase());
  const MarketQuote = yield select(makeSelectMarketQuote());
  console.log(`${MarketBase}-${MarketQuote}`)
  const MarketId =
    MarketBase && MarketQuote ? `${MarketBase}-${MarketQuote}` : `ZRX-WETH`;
  const requestURL = `https://api.kovan.radarrelay.com/v2/markets/${MarketId}/book`;

  try {
    // Call our request helper (see 'utils/request') 
    const OrderBook = yield call(request, requestURL);
    console.log(OrderBook)
    yield put(OrderBookLoaded(OrderBook));
  } catch (err) {
    yield put(OrderBookLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_ORDER_BOOK actions and calls getOrderBook when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_ORDER_BOOK, getOrderBook);
}
