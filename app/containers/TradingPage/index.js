/*
 * TradingPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { SdkManager, EventName } from '@radarrelay/sdk';
import { UserOrderType } from '@radarrelay/types';

import _ from 'lodash';
import BigNumber from 'bignumber.js';

import H1 from 'components/H1';
import PositionList from 'components/PositionList';

export default class TradingPage extends React.Component {

  constructor(props) {
    super()
    this.SdkManager = SdkManager
    this.state = {
      rr: this.SdkManager.Setup({
        wallet: {
          password: process.env.PASSWORD,
          seedPhrase: process.env.SEED_PHRASE
        },
        dataRpcUrl: 'https://kovan.infura.io/radar',
        radarRestEndpoint: 'https://api.kovan.radarrelay.com/v2',
        radarWebsocketEndpoint: 'wss://ws.kovan.radarrelay.com/v2'
      }),
      demandedLiquidity: {
        'LINK': 0,
        'KNC': 0,
        'REP': 0,
        'WBTC': 0,
        'WETH': 0,
        'ZRX': 0,
      },
    }
    this.updateDemandedLiquitidy = this.updateDemandedLiquitidy.bind(this);
  }

  async componentDidMount() {
    try {
      console.log('componentDidMount')
      this.state.rr.events.on(EventName.MarketsInitialized , async (data) => {
        try {
          console.log(EventName.MarketsInitialized)
          let ZRX_WETH = await this.state.rr.markets.getAsync('ZRX-WETH')
          let REP_WETH = await this.state.rr.markets.getAsync('REP-WETH')
          let markets = {
            'ZRX-WETH': {
              marketData: ZRX_WETH,
              orderBook: await ZRX_WETH.getBookAsync()
            },
            'REP-WETH': {
              marketData: REP_WETH,
              orderBook: await REP_WETH.getBookAsync()
            },
          }
          this.setState({ markets: markets })
        } catch (e) {
          console.log(e)
        }
      })
      await this.SdkManager.InitializeAsync(this.state.rr)
    } catch (e) {
      console.log(e)
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    try {

      console.log('TradingPage.componentDidUpdate')
      console.log(this.state)
      let demand = this.state.demandedLiquidity['WETH']
      let bids = this.state.markets['ZRX-WETH'].orderBook.bids

      let availableSupply = 0
      if (bids.length > 1)
        availableSupply = bids.reduce((acc, currVal, currInd) => {
          let former = currInd == 1
            ? parseFloat(acc.remainingQuoteTokenAmount)
            : acc
          return former + parseFloat(currVal.remainingQuoteTokenAmount)
        })
      else if (bids.length == 1)
        availableSupply = bids[0]

      var remainingDemand = demand
      for (var i = 0; i < bids.length; i++) {
        let orderAmount = bids[i].remainingQuoteTokenAmount;
        remainingDemand -= orderAmount
        availableSupply -= orderAmount
        console.log('orderAmount', typeof orderAmount, orderAmount)
        this.state.markets['ZRX-WETH'].marketData.marketOrderAsync(
          UserOrderType.BUY,
          new BigNumber(orderAmount)
        );
        if (remainingDemand <= 0 || availableSupply <= 0) break;
      }
      
    } catch (e) {
      console.log(e)
    }    
  }

  updateDemandedLiquitidy(asset, amount) {
    let newDemandedLiquidity = new BigNumber(amount)
      .plus(this.state.demandedLiquidity[asset])
      .toNumber()
    
    this.setState({
      demandedLiquidity: {
        ...this.state.demandedLiquidity,
        [asset]: newDemandedLiquidity,
      }
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Open Margin Position</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          Available Margin Positions
        </H1>
        <PositionList
          positions={[
            { posType: 'long', asset: 'WETH', levSizes: _.range(1, 4), assetPrice: 200, liquidationPrice: 200, interestAPR: '1.04%' },
            { posType: 'short', asset: 'WETH', levSizes: _.range(1, 4), assetPrice: 200, liquidationPrice: 200, interestAPR: '1.04%' },
            { posType: 'long', asset: 'WBTC', levSizes: _.range(1, 5), assetPrice: 11000, liquidationPrice: 11000, interestAPR: '1.04%' },
            { posType: 'short', asset: 'WBTC', levSizes: _.range(1, 5), assetPrice: 11000, liquidationPrice: 11000, interestAPR: '1.04%' },
            { posType: 'long', asset: 'LINK', levSizes: _.range(1, 4), assetPrice: 2, liquidationPrice: 1, interestAPR: '1.04%' },
            { posType: 'short', asset: 'LINK', levSizes: _.range(1, 4), assetPrice: 2, liquidationPrice: 1, interestAPR: '1.04%' },
            { posType: 'long', asset: 'KNC', levSizes: _.range(1, 4), assetPrice: 2, liquidationPrice: 1, interestAPR: '1.04%' },
            { posType: 'short', asset: 'KNC', levSizes: _.range(1, 4), assetPrice: 2, liquidationPrice: 1, interestAPR: '1.04%' },
            { posType: 'long', asset: 'REP', levSizes: _.range(1, 4), assetPrice: 2, liquidationPrice: 1, interestAPR: '1.04%' },
            { posType: 'short', asset: 'REP', levSizes: _.range(1, 4), assetPrice: 2, liquidationPrice: 1, interestAPR: '1.04%' },
            { posType: 'long', asset: 'ZRX', levSizes: _.range(1, 4), assetPrice: 2, liquidationPrice: 1, interestAPR: '1.04%' },
            { posType: 'short', asset: 'ZRX', levSizes: _.range(1, 4), assetPrice: 2, liquidationPrice: 1, interestAPR: '1.04%' },
          ]}
          handler={{updateDemandedLiquitidy: this.updateDemandedLiquitidy}}
        />
      </div>
    );
  }
}
