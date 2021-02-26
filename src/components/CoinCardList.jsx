import React, { Component, Fragment } from 'react';

import CoinCard from "./CoinCard";

class CoinCardList extends Component {
  render() {
    return (
      <Fragment>
        {this.props.coins.map(coin => (
          <div className="col-xs-12 col-sm-3 text-center">
            <CoinCard
              key={coin.id}
              id={coin.id}
              brl={coin.brl}
              usd={coin.usd}
              last_update_at={coin.last_update_at}
              name={coin.name}
              short={coin.short}
            />
          </div>
        ))}
      </Fragment>
     );
  }
}

export default CoinCardList;