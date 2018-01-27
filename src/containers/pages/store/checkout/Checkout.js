import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import CartItems from '../../../../components/pages/store/checkout/CartItems';
import '../../../../styles/store.css'
import InfoDetails from '../../../../components/pages/store/checkout/InfoDetails';
import PaymentMethods from '../../../../components/pages/store/checkout/PaymentMethods';
import {selectCartRecords, selectGetCartRecordsRequest} from '../../../../redux/store/selectors';
import { getCartRecords } from '../../../../redux/store/actions';
import { withRouter } from 'react-router-dom';

import payPalImg from '../../../../media/images/payments/paypal.png'
import creditCardImg from '../../../../media/images/payments/credit_card.png'
import checkImg from '../../../../media/images/payments/check.png'
import { selectCreatePayPalPaymentRequest } from '../../../../redux/payments/selectors';
import { createPayPalPayment } from '../../../../redux/payments/actions';

class Checkout extends Component {

  componentDidMount() {
    this._getCartRecords();
  }

  componentWillReceiveProps (nextProps) {
    this._handlePayPalPaymentCrated(nextProps);
  }

  _getCartRecords() {
    this.props.getCartRecords();
  }

  _processPayPal () {
    this.props.createPayPalPayment();
  }
  _handlePayPalPaymentCrated(nextProps) {
    const success = this.props.createPayPalPaymentRequest.get('success');
    const nextSuccess = nextProps.createPayPalPaymentRequest.get('success');

    if (!success && nextSuccess) {
      window.location = nextProps.createPayPalPaymentRequest.get('approvalUrl');
    }
  }

  render() {

    const { cartRecords, cartRecordsRequest, createPayPalPaymentRequest } = this.props;
    const loadingCarts = cartRecordsRequest.get('loading');
    const successCarts = cartRecordsRequest.get('success');

    return (
      <div>
        <div className='row'>
          <div className='col-xl-3'>
            {successCarts &&
              <CartItems data={cartRecords.toJS()}/>}
          </div>
          <div className='col-xl-9'>
            <div className='row'>
              <div className='col-sm-12'>
                <InfoDetails/>
              </div>
              <div className='col-sm-12'>
                <PaymentMethods methods={[
                  {
                    title: 'PayPal',
                    img: payPalImg,
                    loading: createPayPalPaymentRequest.get('loading'),
                    onSelect: () => { this._processPayPal(); },
                  },
                  {
                    title: 'Credit Card',
                    img: creditCardImg,
                    onSelect: () => { this._processCC(); },
                  },
                  {
                    title: 'Check',
                    img: checkImg,
                    onSelect: () => { this._processCheck(); },
                  }
                ]}/>
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
    createPayPalPaymentRequest: selectCreatePayPalPaymentRequest(state)
  }),
  (dispatch) => ({
    getCartRecords: () => { dispatch(getCartRecords()) },
    createPayPalPayment: () => { dispatch(createPayPalPayment()) }
  })
)(Checkout);

export default withRouter(translate('Checkout')(Checkout));