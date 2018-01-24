import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import Card from "../../../../components/ui/Card";
import CartItems from "../../../../components/pages/store/checkout/CartItems";
import products from '../../../../data/json/products.json'
import "../../../../styles/store.css"
import InfoDetails from "../../../../components/pages/store/checkout/InfoDetails";
import PaymentMethods from "../../../../components/pages/store/checkout/PaymentMethods";

class Checkout extends Component {
    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-xl-3">
                        <CartItems data={products}/>
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

function mapStateToProps(state) {
    return {};
}

export default translate("Checkout")(connect(
    mapStateToProps,
)(Checkout));

