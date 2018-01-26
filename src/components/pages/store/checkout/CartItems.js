import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../../ui/Card";

class CartItems extends Component {




    _getTotalSum(items) {
        let total = 0
        for(var i=0;i<items.length;i++)
        {
            if(isNaN(items[i].storeItem.price)){
                continue;
            }
            total += (Number(items[i].storeItem.price) * Number(items[i].count));
        }
        return total;
    }

    _renderItems(items) {
        return items.map(function (item,i) {
            return (
                <div class="m-widget4__item">
                    <div class="m-widget__img m-widget4__img--logo">
                        <img src={item.storeItem.thumbnail} width={40} alt="cart product"/>
                    </div>
                    <div class="m-widget4__info">
					<span class="m-widget4__title">
                        {item.storeItem.title}
					</span> <br/>
                    <span class="m-widget4__sub">
                        {item.count} items
					</span>
                    </div>
                    <span class="m-widget4__ext">
					<span class="m-widget4__number m--font-danger">+${item.storeItem.price * item.count}</span>
				</span>
                </div>
            )
        })
    }

    render() {

        const {data} = this.props;

        return (
            <div className="m-portlet m-portlet--bordered-semi  cartItems">
                <div class="m-portlet__head m--hide">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <h3 class="m-portlet__head-text">
                                Items
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="m-portlet__body">
                    <div class="m-widget25">
                        <span class="m-widget25__price m--font-brand">${this._getTotalSum(data)}</span>
                        <span class="m-widget25__desc">Total</span>
                    </div>
                    <div class="m-widget4">
                        {this._renderItems(data)}
                    </div>
                </div>
            </div>
        );
    }
}

CartItems.propTypes = {
    data:PropTypes.array.isRequired
};

CartItems.defaultProps = {
    data: []
}

export default CartItems;
