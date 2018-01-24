import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../../ui/Card";
import payPalImg from "../../../../media/images/payments/paypal.png"
import creditCardImg from "../../../../media/images/payments/credit_card.png"
import checkImg from "../../../../media/images/payments/check.png"

class PaymentMethods extends Component {
    render() {
        return (
            <Card title="Payment Methods" icon="fa	fa-credit-card">
                <div className="row">
                    <div className="col-md-12">
                        <div class="m-portlet ">
                            <div class="m-portlet__body  m-portlet__body--no-padding">
                                <div class="row m-row--no-padding m-row--col-separator-xl">
                                    <div class="col-md-12 col-lg-6 col-xl-4">
                                        <div class="m-widget24 payments-widgets">
                                            <div class="m-widget24__item ">
                                                <h4 class="m-widget24__txitle">
                                                    PayPal
                                                </h4>
                                                  <span class="m-widget24__sxtats m--font-brand">
                                                         <div className="paymentImg">
                                                            <img src={payPalImg} width={80} className="img-responsive" alt="paypal"/>
                                                        </div>
                                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-6 col-xl-4">
                                        <div class="m-widget24 payments-widgets">
                                            <div class="m-widget24__item ">
                                                <h4 class="m-widget24__txitle">
                                                    Credit Card
                                                </h4>
                                                <span class="m-widget24__sxtats m--font-brand">
                                                         <div className="paymentImg">
                                                            <img src={creditCardImg} width={80} className="img-responsive" alt="paypal"/>
                                                        </div>
                                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-6 col-xl-4">
                                        <div class="m-widget24 payments-widgets">
                                            <div class="m-widget24__item ">
                                                <h4 class="m-widget24__txitle">
                                                    Cheque
                                                </h4>
                                                <span class="m-widget24__sxtats m--font-brand">
                                                         <div className="paymentImg">
                                                            <img src={checkImg} width={80} className="img-responsive" alt="paypal"/>
                                                        </div>
                                                    </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Card>
        );
    }
}

PaymentMethods.propTypes = {};

export default PaymentMethods;
