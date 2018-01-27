import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import Card from "../../../../components/ui/Card";
import CartItems from "../../../../components/pages/store/checkout/CartItems";
import products from '../../../../data/json/products.json'
import "../../../../styles/store.css"
import InfoDetails from "../../../../components/pages/store/checkout/InfoDetails";
import PaymentMethods from "../../../../components/pages/store/checkout/PaymentMethods";
import {selectCartRecords, selectGetCartRecordsRequest} from "../../../../redux/store/selectors";
import {getCartRecords} from "../../../../redux/store/actions";
import {withRouter} from "react-router-dom";

class Checkout extends Component {

    componentDidMount() {
        this._getCartRecords();
    }


    _getCartRecords() {
        this.props.getCartRecords();
    }



    render() {

        const {cartRecords,cartRecordsRequest} = this.props;
        const loadingCarts = cartRecordsRequest.get('loading');
        const successCarts = cartRecordsRequest.get('success');


        return (
            <div>
                <div className="row">
                    <div className="col-xl-3">
                        {successCarts &&
                        <CartItems data={cartRecords.toJS()}/>
                        }
                    </div>
                    <div className="col-xl-9">
                        <div className="row">
                            <div className="col-sm-12">
                                <InfoDetails/>
                            </div>
                            <div className="col-sm-12">
                                <PaymentMethods/>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}



Checkout = connect(
    (state) => ({
        cartRecordsRequest: selectGetCartRecordsRequest(state),
        cartRecords: selectCartRecords(state),
    }),
    (dispatch) => ({
        getCartRecords: () => { dispatch(getCartRecords()) },
    })
)(Checkout);

export default withRouter(translate("Checkout")(Checkout));