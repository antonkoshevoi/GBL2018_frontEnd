import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

class CartItems extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  _getTotalSum () {
    const { data } = this.props;

    let total = 0;
    for(let i = 0; i < data.length; i++) {
      if (isNaN(data[i].storeItem.price)) {
        continue;
      }
      total += (Number(data[i].storeItem.price) * Number(data[i].count));
    }
    return total;
  }

  _renderItems () {
    const { data } = this.props;

    return data.map((item, key) => (
      <div key={key} className="m-widget4__item">
        <div className="m-widget__img m-widget4__img--logo">
          <img src={item.storeItem.thumbnail} width={40} alt="cart product"/>
        </div>
        <div className="m-widget4__info">
					<span className="m-widget4__title">
            {item.storeItem.title}
					</span> <br/>
          <span className="m-widget4__sub">
            {item.count} items
					</span>
        </div>
        <span className="m-widget4__ext">
            <span className="m-widget4__number m--font-danger">+${item.storeItem.price * item.count}</span>
          </span>
      </div>
    ));
  }

  render() {
    const {sum} = this.props;
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
            <span className="invoice-title">Yor invoice #{Math.floor(Math.random() * 1000000) + 1  } Total ${sum}</span>
          </div>
          {/*<div className="m-widget4">*/}
            {/*{this._renderItems()}*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

export default CartItems;
