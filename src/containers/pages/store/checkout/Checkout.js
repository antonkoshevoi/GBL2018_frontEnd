import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import CartItems from '../../../../components/pages/store/checkout/CartItems';
import '../../../../styles/store.css'
import InfoDetails from '../../../../components/pages/store/checkout/InfoDetails';
import PaymentMethods from '../../../../components/pages/store/checkout/PaymentMethods';
import {selectCartRecords, selectCartRecordsSum, selectGetCartRecordsRequest} from '../../../../redux/store/selectors';
import {calculateCartSum, getCartRecords} from '../../../../redux/store/actions';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import {
  selectCreateCheckPaymentRequest,
  selectCreatePayPalPaymentRequest
} from '../../../../redux/payments/selectors';
import { createCheckPayment, createPayPalPayment } from '../../../../redux/payments/actions';

import payPalImg from '../../../../media/images/payments/paypal.png'
import creditCardImg from '../../../../media/images/payments/credit_card.png'
import checkImg from '../../../../media/images/payments/check.png'


class Checkout extends Component {

  state = {
    redirecting: false
  };

  componentDidMount() {
    const { cartRecords } = this.props;
      if (cartRecords.size === 0) {
        this._getCartRecords();
        this._calculateSum(this.props.cartRecords.toJS());
    }
  }

  componentWillReceiveProps (nextProps) {
    this._handlePayPalPaymentCreated(nextProps);
    this._handleCheckPaymentCreated(nextProps);
    this._handleCheckPaymentFailed(nextProps);

    if (this.props.cartRecords !== nextProps.cartRecords) {
        this._calculateSum(nextProps.cartRecords.toJS());
    }
  }

  _getCartRecords() {
    this.props.getCartRecords();
  }

  _calculateSum(data){
    this.props.calculateSum(data);
  }

  /**
   * PayPal
   * @private
   */
  _processPayPal () {
    this.props.createPayPalPayment();
  }
  _handlePayPalPaymentCreated(nextProps) {
    const success = this.props.createPayPalPaymentRequest.get('success');
    const nextSuccess = nextProps.createPayPalPaymentRequest.get('success');

    if (!success && nextSuccess) {
      this.setState({ redirecting: true });
      window.location = nextProps.createPayPalPaymentRequest.get('approvalUrl');
    }
  }

  /**
   * Check
   * @private
   */
  _processCheck () {
    this.props.createCheckPayment();
  }
  _handleCheckPaymentCreated(nextProps) {
    const success = this.props.createCheckPaymentRequest.get('success');
    const nextSuccess = nextProps.createCheckPaymentRequest.get('success');

    if (!success && nextSuccess) {
      this.props.goToPendingPage();
    }
  }
  _handleCheckPaymentFailed(nextProps) {
    const fail = this.props.createCheckPaymentRequest.get('fail');
    const nextFail = nextProps.createCheckPaymentRequest.get('fail');

    if (!fail && nextFail) {
      this.props.goToFailPage();
    }
  }

  render() {

    const { redirecting } = this.state;
    const {
      cartRecords,
      cartRecordsRequest,
      createPayPalPaymentRequest,
      createCheckPaymentRequest,
      cartRecordsSum
    } = this.props;
    const loadingCarts = cartRecordsRequest.get('loading');
    const successCarts = cartRecordsRequest.get('success');

    return (
      <div>
        <div className='row'>
          <div className='col-xl-3'>
            {successCarts &&
              <CartItems sum={cartRecordsSum} data={cartRecords.toJS()}/>}
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
                    loading: createPayPalPaymentRequest.get('loading') || redirecting,
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
                    loading: createCheckPaymentRequest.get('loading') || redirecting,
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
    cartRecordsSum: selectCartRecordsSum(state),
    createPayPalPaymentRequest: selectCreatePayPalPaymentRequest(state),
    createCheckPaymentRequest: selectCreateCheckPaymentRequest(state)
  }),
  (dispatch) => ({
    getCartRecords: () => { dispatch(getCartRecords()) },
    createPayPalPayment: () => { dispatch(createPayPalPayment()) },
    createCheckPayment: () => { dispatch(createCheckPayment()) },
    calculateSum: (data) => { dispatch(calculateCartSum(data)) },
    goToSuccessPage: () => { dispatch(push('/payments/success')) },
    goToPendingPage: () => { dispatch(push('/payments/pending')) },
    goToFailPage: () => { dispatch(push('/payments/fail')) },
  })
)(Checkout);

export default withRouter(translate('Checkout')(Checkout));