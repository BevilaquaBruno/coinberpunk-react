import React, { Fragment } from 'react';

import bitcoinImg from "../public/img/bitcoin.png";
import cardanoImg from "../public/img/cardano.svg";
import dogecoinImg from "../public/img/dogecoin.png";
import ethereumImg from "../public/img/ethereum.png";
import rippleImg from "../public/img/ripple.png";

class MenuComponent extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="menu-overlay"></div>
        <a href="#" className="menu-open">Open Menu</a>
        <div className="side-menu-wrapper">
          <div className="side-menu-child" data-augmented-ui="border tl-2-clip-x l-clip-y bl-2-clip-x">
            <a href="#" className="menu-close">×</a>
            <ul className="no-select">
              <li>Click to show/hide the coin.</li>
              <li><div><img className="img-menu" src={bitcoinImg} alt="Bitcoin"/> Bitcoin</div></li>
              <li><div><img className="img-menu" src={ethereumImg} alt="Ethereum"/> Ethereum</div></li>
              <li><div><img className="img-menu" src={rippleImg} alt="Ripple"/> Ripple</div></li>
              <li><div><img className="img-menu" src={dogecoinImg} alt="Dogecoin"/> DogeCoin</div></li>
              <li><div><img className="img-menu" src={cardanoImg} alt="Cardano"/> Cardano</div></li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MenuComponent;