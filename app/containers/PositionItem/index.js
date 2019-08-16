/**
 * PositionItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rimble-ui';

import TableRow from '../../components/TableRow';
import TableData from '../../components/TableData';
import Img from '../../components/Img';
import BuyModal from '../../components/BuyModal';

export function PositionItem(props) {
  const img = <Img src={require(`../../images/${props.item.asset}.svg`)} alt={props.item.asset} />
  const buyButton = <BuyModal
    asset={props.item.asset}
    handleConfirm={props.updateDemandedLiquitidy}
  >
    Buy
  </BuyModal>

  return (
    <TableRow>
      <TableData textAlign={'center'} content={img} />
      <TableData textAlign={'center'} content={props.item.asset} />
      <TableData textAlign={'center'} content={props.item.posType} />
      <TableData textAlign={'center'} content={props.item.levSizes} />
      <TableData textAlign={'center'} content={props.item.assetPrice} />
      <TableData textAlign={'center'} content={props.item.liquidationPrice} />
      <TableData textAlign={'center'} content={props.item.interestAPR} />
      <TableData textAlign={'center'} content={buyButton} />
    </TableRow>
  )
}

PositionItem.propTypes = {
  item: PropTypes.object,
};

export default PositionItem;
