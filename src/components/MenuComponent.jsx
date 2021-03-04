import React, { Fragment } from 'react';


const beforePath = '../public/img/';
const afterPath = '-img.svg';
const images = import.meta.glob('../public/img/*-img.svg');

/*import bitcoinImg from "../public/img/bitcoin-img.svg";
import cardanoImg from "../public/img/cardano-img.svg";
import dogecoinImg from "../public/img/dogecoin-img.svg";
import ethereumImg from "../public/img/ethereum-img.svg";
import rippleImg from "../public/img/ripple-img.svg";
import basicAttentionTokenImg from "../public/img/basic-attention-token-img.svg";
import chainlinkImg from "../public/img/chainlink-img.svg";
import elrondErd2Img from "../public/img/elrond-erd-2-img.svg";
import polkadotImg from "../public/img/polkadot-img.svg";
import webchainImg from "../public/img/webchain-img.svg";*/

class MenuComponent extends React.Component {
  state = {
    slide_wrp: "side-menu-wrapper",
    open_button:"menu-open",
    close_button: "menu-close",
    overlay: "menu-overlay",
    coinImgs: [],
    images: images
  }
  menuOpenHandle = () => {
    let els2;
    els2 = document.getElementsByClassName(this.state.slide_wrp);
    Array.prototype.forEach.call(els2, (el2) => {
      el2.style.right = '0px';
      setTimeout(() => {
        el2.classList.add('active')
      }, 50);
    })
    els2 = document.getElementsByClassName(this.state.overlay);
    Array.prototype.forEach.call(els2, (el2) => {
      el2.style.opacity = '1';
      el2.style.width = '100%';
    })
  }
  menuCloseHandle = () => {
    let els2;
    els2 = document.getElementsByClassName(this.state.slide_wrp);
    Array.prototype.forEach.call(els2, (el2) => {
      el2.style.right = -el2.offsetWidth+'px';
      setTimeout(() => {
        el2.classList.remove('active');
      }, 50);
    });
    els2 = document.getElementsByClassName(this.state.overlay);
    Array.prototype.forEach.call(els2, (el2) => {
      el2.style.opacity = '0';
      el2.style.width = '0';
    });
  }
  componentDidMount = () => {
    for (const path in this.state.images) {
      this.state.images[path]().then((mod) => {
        let coinImgs = this.state.coinImgs;
        coinImgs[path] = mod.default;
        this.setState({ coinImgs: coinImgs });
      })
    }
    Object.keys(this.props.coinListAll).forEach(coin => {
      let store = this.state.coinImgs;
      store.push({
        id: this.props.coinListAll[coin].id,
        image: ''
      });
      this.setState({ coinImgs: store});
    })
    var els = document.getElementsByClassName(this.state.slide_wrp);
    Array.prototype.forEach.call(els,function (el) {
      el.style.right = -el.offsetWidth+'px';
      el.style.display = 'none';
      el.style.display = 'block';
    });

    document.body.addEventListener('click', (e) => {
      if (!e.target.closest('.'+this.state.slide_wrp) && document.getElementsByClassName(this.state.slide_wrp)[0].classList.contains('active')) {
        let els = document.getElementsByClassName(this.state.slide_wrp);
        Array.prototype.forEach.call(els, (el) => {
          el.style.right = -el.offsetWidth+'px';
          el.classList.remove('active');
        });
        els = document.getElementsByClassName(this.state.overlay);
        Array.prototype.forEach.call(els, (el) => {
          el.style.opacity = '0';
          el.style.width = '0';
        });
      }
    });
  }
  render() {
    const liList = [];
    Object.keys(this.props.coinListAll).forEach(coin => {
      liList.push(
        <li key={this.props.coinListAll[coin].id+"Menu"}>
          <div onClick={() => {this.props.changeCoinHandle(this.props.coinListAll[coin].id)}}>
            <img className="img-menu"
              src={this.state.coinImgs[beforePath+this.props.coinListAll[coin].id+afterPath]}
              alt={this.props.coinListAll[coin].name}/>&nbsp;
              {(this.props.coinListAll[coin].short == 'BAT')? this.props.coinListAll[coin].short:this.props.coinListAll[coin].name}
          </div>
        </li>
    )})
    return (
      <Fragment>
        <div className="menu-overlay"></div>
        <a onClick={this.menuOpenHandle} href="#" className="menu-open">Open Menu</a>
        <div className="side-menu-wrapper">
          <div className="side-menu-child" data-augmented-ui="border tl-2-clip-x l-clip-y bl-2-clip-x">
            <a onClick={this.menuCloseHandle} href="#" className="menu-close">×</a>
            <ul className="no-select">
              <li>Click to show/hide the coin.</li>
              {liList}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

/*
{this.state.coinImgs.map(img => {
  console.log(img);
  if (img.id === this.props.coinListAll[coin].id){
    return img.image
  }
})}
*/

export default MenuComponent;