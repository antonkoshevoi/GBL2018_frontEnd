import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

class CartItems extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  _renderItems() {
    const {data} = this.props;
    const items = data.get('items');
    return items.map((item, key) => (
      <div key={key} className="m-widget4__item">

        <div className="m-widget4__info">
					<span className="m-widget4__title">
            {item.get('title')}
					</span> <br/>
          <span className="m-widget4__sub">
            {item.get('quantity')} items
					</span>
        </div>
        <span className="m-widget4__ext">
            <span className="m-widget4__number m--font-danger">${item.get('total_price')}</span>
          </span>
      </div>
    ));
  }

  render() {
    return (
      <div className="m-portlet m-portlet--bordered-semi  cartItems">
        <div className="m-portlet__body">
          <div className="m-widget25">
            <Typography variant="title" gutterBottom>
            </Typography>
            <span className="invoice-title">Order details</span>
          </div>
          <div className="m-widget4 col-md-7 m-auto">
          {this._renderItems()}
          </div>
        </div>
      </div>
    );
  }
}

export default CartItems;
