import React from 'react';

//import MenuComponent from "./components/MenuComponent";
import CoinCardList from "./components/CoinCardList";

import "./public/css/flexboxgrid.min.css";
import "./public/css/main.css";
//import "./public/css/menu.css";
//import "./public/css/augmented-ui.min.css";

import bitcoinImg from "./public/img/bitcoin.svg";
import cardanoImg from "./public/img/cardano.svg";
import dogecoinImg from "./public/img/dogecoin.svg";
import ethereumImg from "./public/img/ethereum.svg";
//import rippleImg from "./public/img/ripple.png";

class App extends React.Component {
  pattern = [
    {
      name: "Bitcoin",
      brl: "Retrieving data from Véio da Havan...", usd: "", last_update_at: "", short: "BTC", img: bitcoinImg
    },
    {
      name: "Ethereum",
      brl: "Retrieving data from Véio da Havan...", usd: "", last_update_at: "", short: "ETH", img: ethereumImg
    },
    {
      name: "Cardano",
      brl: "Retrieving data from Véio da Havan...", usd: "", last_update_at: "", short: "ADA", img: cardanoImg
    },
    {
      name: "Dogecoin",
      brl: "Retrieving data from Véio da Havan...", usd: "", last_update_at: "", short: "DOGE", img: dogecoinImg
    }
  ]
  state = {
    coins: [...this.pattern],
    current: ['Bitcoin', 'Ethereum', 'Cardano', 'Dogecoin'],
    lang: (navigator.language != '' && navigator.language != null)?navigator.language:'pt-BR',
    current_gmt: '',
    title: 'Coinberpunk!!'
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
  updateGMT = gmt => {
    this.setState({
      current_gmt: gmt
    })
  };
  getData = () => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,ripple,dogecoin,cardano&vs_currencies=brl,usd&include_last_updated_at=true')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.state.current.map(coinName => {
          this.updatecoin(data[coinName.toLowerCase()], coinName);
        });
        let dt = new Date(data[this.state.current[0].toLowerCase()].last_updated_at * 1000);
        this.updateGMT("GMT"+((dt.getHours() >= dt.getUTCHours() )? "+": "-")+(dt.getTimezoneOffset() / 60));
      });
  }
  updateTitle = () => {
    document.title = 'AAAAA';
  }
  startIntervals = () => {
    setInterval(this.getData, 15000);
  }
  componentDidMount(){
    this.getData();
    this.startIntervals();
  }

  render() {
    return (
      <div>
        <span id="title_here" className="hidden"></span>
        <h2 className="text-center">Coinberpunk (Update every 15s | {this.state.current_gmt})</h2>
        <h5 className="text-center">Powered by <a target="_blank" href="https://www.coingecko.com">CoinGecko API</a> </h5>

        <div className="row">
          <CoinCardList coins={this.state.coins} />
        </div>
      </div>
     )
  }
}

export default App;