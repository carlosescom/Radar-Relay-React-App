import React from 'react';
import { MetaMaskButton } from 'rimble-ui';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';

function Header() {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/orderBook">OrderBook</HeaderLink>
        <HeaderLink to="/trade">Trade</HeaderLink>
      </NavBar>
      <MetaMaskButton>Connect with MetaMask</MetaMaskButton>
    </div>
  );
}

export default Header;
