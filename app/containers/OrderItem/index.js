/**
 * OrderItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../../components/TableRow';
import TableData from '../../components/TableData';

import assetFormat from '../../utils/assetFormat';

export function OrderItem(props) {
  const { remainingBaseTokenAmount, remainingQuoteTokenAmount, price } = props.item;

  const baseAmount = assetFormat(remainingBaseTokenAmount, 3)
  const quoteAmount = assetFormat(remainingQuoteTokenAmount, 5)
  const priceInQuote = assetFormat(price, 5)

  return (
    <TableRow style={{background: 'darkgreen', color:'springgreen'}}>
      <TableData textAlign={'right'} content={'Buying: '} />
      <TableData textAlign={'right'} content={baseAmount + ' ' + props.MarketBase + ' for '} />
      <TableData textAlign={'left'} content={quoteAmount + ' ' + props.MarketQuote} bold />
      <TableData textAlign={'left'} content={'@ ' + priceInQuote + ' ' + props.MarketQuote} />
    </TableRow>
  )
}

OrderItem.propTypes = {
  item: PropTypes.object,
  MarketBase: PropTypes.string,
  MarketQuote: PropTypes.string,
};

export default OrderItem;
