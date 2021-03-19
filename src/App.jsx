import React from 'react';

import MenuComponent from "./components/MenuComponent";
import CoinCardList from "./components/CoinCardList";

import "./public/css/flexboxgrid.min.css";
import "./public/css/main.css";
import "./public/css/augmented-ui.min.css";

import { jsonCoins } from "./coins";
class App extends React.Component {
  pattern = [
    {
      name: "Bitcoin", id: "bitcoin",
      brl: "Retrieving data from Véio da Havan...", usd: "", last_update_at: "", short: "BTC"
    },
    {
      name: "Ethereum", id: "ethereum",
      brl: "Retrieving data from Véio da Havan...", usd: "", last_update_at: "", short: "ETH"
    },
    {
      name: "Cardano", id: "cardano",
      brl: "Retrieving data from Véio da Havan...", usd: "", last_update_at: "", short: "ADA"
    },
    {
      name: "Dogecoin", id: "dogecoin",
      brl: "Retrieving data from Véio da Havan...", usd: "", last_update_at: "", short: "DOGE"
    }
  ]
  state = {
    coins: [...this.pattern],
    lang: (navigator.language != '' && navigator.language != null)?navigator.language:'pt-BR',
    current_gmt: '',
    coinList: jsonCoins,
    updating_coin: false,
    //current: ['Bitcoin', 'Ethereum', 'Cardano', 'Dogecoin']
  }
  updatecoin = (data, name) => {
    this.setState(prevState => ({
      coins: prevState.coins.map(coin => {
        if (coin.name === name) {
          let dt = new Date(data.last_updated_at * 1000);
          return {
            ...coin,
            brl: 'R$ '+data.brl.toLocaleString(this.state.lang),
            usd: '$ '+data.usd.toLocaleString(this.state.lang),
            last_update_at: dt.toLocaleString(this.state.lang)
          }
        }
        return coin
      }),
    }))
  };
  getCurrentIds = () => {
    let currentIds = this.state.coins.map(coin => {
      return coin.id;
    });
    return currentIds;
  };
  getData = () => {
    this.setState({ updating_coin: true });
    fetch('https://api.coingecko.com/api/v3/simple/price?ids='+this.getCurrentIds()+'&vs_currencies=brl,usd&include_last_updated_at=true')
      .then(response => response.json())
      .then(data => {
        this.state.coins.map(coin => {
          this.updatecoin(data[coin.id.toLocaleLowerCase()], coin.name);
        });
        let dt = new Date(data[this.state.coins[0].id].last_updated_at * 1000);
        this.setState({ updating_coin: false, current_gmt: "GMT"+((dt.getHours() >= dt.getUTCHours() )? "+": "-")+(dt.getTimezoneOffset() / 60) });
      });
  }
  getLocalCoins = () => {
    coins = localStorage.getItem('coins');
    if(coins){
      this.setState({
        coins: coins
      });
    }
  }
  setLocalCoins = () => {
    localStorage.setItem('coins', JSON.stringify(this.state.coins));
  }
  changeCoin = (id) => {
    if (this.state.updating_coin === true) {
      return false;
    }
    let isVisible = false;
    this.state.coins.map(coin => {
      if (coin.id === id) {
        isVisible = true;
      }
    });
    if (isVisible === false) {
      const newCoin = {
        name: this.state.coinList[id]['name'], id: this.state.coinList[id]['id'],
        brl: "Retrieving data from Véio da Havan...", usd: "", last_update_at: "", short: this.state.coinList[id]['short']
      };
      this.setState({
        coins: [...this.state.coins, newCoin]
      });
    }else if(isVisible === true){
      this.setState({
        coins:[
          ...this.state.coins.filter(coin => {
            return coin.id !== id;
          })
        ]
      })
    }
  }
  startIntervals = () => {
    setInterval(this.getData, 7000);
  }

  componentDidMount(){
    this.getData();
    this.startIntervals();
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Coinberpunk (Update every 15s | {this.state.current_gmt})</h2>
        <h5 className="text-center">Powered by <a target="_blank" href="https://www.coingecko.com">CoinGecko API</a> </h5>
        <MenuComponent coinListAll={this.state.coinList} changeCoinHandle={this.changeCoin} />
        <div className="row">
          <CoinCardList coins={this.state.coins} />
        </div>
      </div>
     )
  }
}

export default App;