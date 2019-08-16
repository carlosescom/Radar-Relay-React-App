import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import OrderItem from 'containers/OrderItem';

function ReposList({ loading, error, OrderBook, MarketBase, MarketQuote }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error !== false) {
    const ErrorListItem = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorListItem} />;
  }

  if (OrderBook !== false) {
    let asks = OrderBook.asks.map(item => {
      item.id = item.orderHash
      return item
    })
    console.log(asks)
    return <List
      items={asks}
      headers={['Bids', MarketBase, MarketQuote, '']}
      component={OrderItem}
      theirProps={{ MarketBase, MarketQuote }}
    />;
  }

  return null;
}

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  OrderBook: PropTypes.any,
  MarketBase: PropTypes.string,
  MarketQuote: PropTypes.string,
};

export default ReposList;
