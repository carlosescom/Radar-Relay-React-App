# Sourcing liquidity from 0x using Radar Relay

Please run `npm start`, a server will be launched in your terminal for development. You can then open [http://localhost:3000](http://localhost:3000) to access the server and see the app.

### `How to try it`:

1. Click [`Trade`](http://localhost:3000/trade) at the header of the page.
2. Pick an asset in which you would like to go short or long in. (All assets change the state of the main component but only WETH works with RadarRelay)
3. Enter the hypothetical `total` amount of asset you would like to open your position with, i.e. the amount after multiplying by the leverage size.
4. Open the browser's console and look at the order amounts that are being sent to radar 

### `Typescript`:

I included several packages that already work TypeScript type definitions: 

- [ ] [React Router DOM](https://github.com/ReactTraining/react-router)
- [ ] [React Helmet](https://github.com/nfl/react-helmet)

Moreover, Radar Relay itself has its own TS type definitions which proved really helpful while developing the app.

Also it's not advisable to rewrite all components to TypeScript, but to start from the outer part of the dependency graph and then proceed to rewrite components that are shared the most between highly-used utility modules or npm packages.

### `Radar Relay`:

To comply with the requirements of this challenge I used the `componentDidUpdate` method of the TradingPage component. Everytime there is liquidity demand for WETH, the component sums up the available amounts of WETH in open orders from a the order book that is loaded asynchronously with Radar Relay. 