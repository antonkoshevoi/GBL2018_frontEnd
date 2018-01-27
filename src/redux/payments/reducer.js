import Immutable from 'immutable';
import {
  CREATE_PAYPAL_PAYMENT, CREATE_PAYPAL_PAYMENT_FAIL, CREATE_PAYPAL_PAYMENT_SUCCESS,
  EXECUTE_PAYPAL_PAYMENT, EXECUTE_PAYPAL_PAYMENT_FAIL, EXECUTE_PAYPAL_PAYMENT_SUCCESS
} from './actions';

const initialState = Immutable.fromJS({
  createPayPalPaymentRequest: {
    loading: false,
    success: false,
    fail: false,
    approvalUrl: undefined
  },
  executePayPalPaymentRequest: {
    loading: false,
    success: false,
    fail: false
  },
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Create paypal payment
     */
    case CREATE_PAYPAL_PAYMENT:
      return state
        .set('createPayPalPaymentRequest', state.get('createPayPalPaymentRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('approvalUrl')
        );
    case CREATE_PAYPAL_PAYMENT_SUCCESS:
      return state
        .set('createPayPalPaymentRequest', state.get('createPayPalPaymentRequest')
          .set('success', true)
          .set('loading', false)
          .set('approvalUrl', action.result.data.approvalUrl)
        );
    case CREATE_PAYPAL_PAYMENT_FAIL:
      return state
        .set('createPayPalPaymentRequest', state.get('createPayPalPaymentRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * Execute paypal payment
     */
    case EXECUTE_PAYPAL_PAYMENT:
      return state
        .set('executePayPalPaymentRequest', state.get('executePayPalPaymentRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
        );
    case EXECUTE_PAYPAL_PAYMENT_SUCCESS:
      return state
        .set('executePayPalPaymentRequest', state.get('executePayPalPaymentRequest')
          .set('success', true)
          .set('loading', false)
        );
    case EXECUTE_PAYPAL_PAYMENT_FAIL:
      return state
        .set('executePayPalPaymentRequest', state.get('executePayPalPaymentRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * default
     */
    default:
      return state;
  }
}