/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectOrderBook,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import Separator from './Separator';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadOrderBook } from '../App/actions';
import { changeMarketBase, changeMarketQuote } from './actions';
import { makeSelectMarketBase, makeSelectMarketQuote } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  MarketBase,
  MarketQuote,
  loading,
  error,
  OrderBook,
  onSubmitForm,
  onSelectMarketBase,
  onSelectMarketQuote,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state MarketBase is not null, submit the form to load OrderBook
    console.log('MarketBase', typeof MarketBase, MarketBase)
    console.log('MarketQuote', typeof MarketQuote, MarketQuote)
    if (MarketBase && MarketBase.trim().length > 0
      && MarketQuote && MarketQuote.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    OrderBook,
    MarketBase,
    MarketQuote
  };

  return (
    <article>
      <Helmet>
        <title>Order Book</title>
        <meta name="description" content="A Radar Relay Webapp" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
        <Section>
          <H2>
            Order Book
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="Market"></label>
            <div id={"Market"}>
              <Select
                id="MarketBase"
                type="text"
                placeholder="ZRX"
                label={MarketBase}
                onChange={onSelectMarketBase}
                options={[
                  { label: '0x', value: 'ZRX' },
                  { label: 'Chainlink', value: 'LINK' },
                  { label: 'Augur', value: 'REP' },
                  { label: 'Kyber Network', value: 'KNC' },
                ]}
              />
              <Separator>
                <FormattedMessage {...messages.tradeSeparator} />
              </Separator>
              <Select
                id="MarketQuote"
                type="text"
                placeholder="WETH"
                label={MarketQuote}
                onChange={onSelectMarketQuote}
                options={[
                  { label: 'Ether', value: 'WETH' },
                  { label: 'Bitcoin', value: 'WBTC' },
                ]}
              />
            </div>
            <input type="submit" value="Submit" />
          </Form>
          <ReposList {...reposListProps} />
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  OrderBook: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  MarketBase: PropTypes.string,
  MarketQuote: PropTypes.string,
  onSelectMarketBase: PropTypes.func,
  onSelectMarketQuote: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  OrderBook: makeSelectOrderBook(),
  MarketBase: makeSelectMarketBase(),
  MarketQuote: makeSelectMarketQuote(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMarketBase: evt => {
      console.log('onSelectMarketBase:',evt)
      return dispatch(changeMarketBase(evt.value))
    },
    onSelectMarketQuote: evt => {
      console.log('onSelectMarketQuote:',evt)
      return dispatch(changeMarketQuote(evt.value))
    },
    onSubmitForm: evt => {
      console.log('onSubmitForm:',evt)
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadOrderBook());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
