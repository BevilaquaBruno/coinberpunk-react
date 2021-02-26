import React, { Component, Fragment } from 'react';

class CoinCard extends Component {
  state = {
    src: ''
  }
  componentDidMount() {
    this.loadImage(this.props.id)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.id !== this.props.id) {
      this.loadImage(this.props.id)
    }
  }

  loadImage = (name) => {
    import("../public/img/"+name+"-img.svg")
      .then(image => {
        this.setState({ src: image.default });
      })
  }
  render() {
    return (
      <Fragment>
        <div>
          <img id={this.props.short.toLowerCase()+"_image"} src={this.state.src} alt={this.props.name} />
          <div>
            <h4>{this.props.name}({this.props.short})</h4>
            <div id={this.props.short.toLowerCase()+"_value"} className="card-text row text-center">
              <div className="col-sm-12 no-margin no-padding text-center">
                <div className="col-sm-12">
                  {this.props.brl}{(this.props.usd!=""?" | "+this.props.usd:"") }
                  <br />
                  {this.props.last_update_at}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
     );
  }
}

export default CoinCard;