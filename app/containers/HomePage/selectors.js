/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectMarketBase = () =>
  createSelector(
    selectHome,
    homeState => homeState.MarketBase,
  );

const makeSelectMarketQuote = () =>
  createSelector(
    selectHome,
    homeState => homeState.MarketQuote,
  );

export { selectHome, makeSelectMarketBase, makeSelectMarketQuote };
