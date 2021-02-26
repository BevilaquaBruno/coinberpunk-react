import React, { Component, Fragment } from 'react';

class CoinCard extends Component {
  render() {
    return ( 
      <Fragment>
        <div className="col-xs-12 col-sm-3 text-center">
          <div>
            <img id={this.props.short.toLowerCase()+"_image"} src={this.props.img} alt={this.props.name} />
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
        </div>
      </Fragment>
     );
  }
}

export default CoinCard;