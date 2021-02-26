import React, { Component, Fragment } from 'react';

import CoinCard from "./CoinCard";

class CoinCardList extends Component {
  render() {
    return (
      <Fragment>
        {this.props.coins.map(coin => (
          <CoinCard
            key={coin.name}
            brl={coin.brl}
            usd={coin.usd}
            last_update_at={coin.last_update_at}
            name={coin.name}
            short={coin.short}
            img={coin.img}
          />
        ))}
      </Fragment>
     );
  }
}

export default CoinCardList;