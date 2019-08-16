import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';

import PositionItem from 'containers/PositionItem';

function PositionList(props) {
  let positions = props.positions.map(item => {
    item.id = item.asset + '_' + item.posType
    return item
  })
  
  return <List
    component={PositionItem}
    headers={['Asset', '', '', 'Leverage', 'Asset Price', 'Liquidation Price', 'Interest APR', '']}
    items={positions}
    theirProps={props.handler}
  />;
}

PositionList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  positions: PropTypes.array,
  theirProps: PropTypes.object,
};

export default PositionList;
