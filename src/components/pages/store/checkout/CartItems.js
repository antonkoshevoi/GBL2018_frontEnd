import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

class CartItems extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  _renderItems() {
    const {data} = this.props;
    const items = data.get('items');
    console.log('items.toJS()',items.toJS());
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
    const {data} = this.props;

    return (
      <div className="m-portlet m-portlet--bordered-semi  cartItems">
        <div className="m-portlet__head m--hide">
          <div className="m-portlet__head-caption">
            <div className="m-portlet__head-title">
              <h3 className="m-portlet__head-text">
                Items
              </h3>
            </div>
          </div>
        </div>
        <div className="m-portlet__body">
          <div className="m-widget25">
            <Typography variant="title" gutterBottom>
            </Typography>
            <span className="invoice-title">Yor invoice #{data.get('invoice_no')} Total ${data.get('total')}</span>
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
