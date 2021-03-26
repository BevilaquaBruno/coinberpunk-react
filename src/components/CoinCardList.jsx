import React, { Component, Fragment } from 'react';

import CoinCard from "./CoinCard";

class CoinCardList extends Component {
  render() {
    return (
      <Fragment>
        {this.props.coins.map(coin => (
          <div key={coin.id} className="col-xs-12 col-sm-3 text-center">
            <CoinCard
              id={coin.id}
              brl={coin.brl}
              usd={coin.usd}
              last_updated_at={coin.last_updated_at}
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