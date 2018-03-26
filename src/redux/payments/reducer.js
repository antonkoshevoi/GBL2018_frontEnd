import Immutable from 'immutable';
import {
  CREATE_CHECK_PAYMENT, CREATE_CHECK_PAYMENT_FAIL, CREATE_CHECK_PAYMENT_SUCCESS,
  CREATE_PAYPAL_PAYMENT, CREATE_PAYPAL_PAYMENT_FAIL, CREATE_PAYPAL_PAYMENT_SUCCESS,
  EXECUTE_PAYPAL_PAYMENT, EXECUTE_PAYPAL_PAYMENT_FAIL, EXECUTE_PAYPAL_PAYMENT_SUCCESS, GET_INVOICE, GET_INVOICE_FAIL,
  GET_INVOICE_SUCCESS,
  SET_PAY_TYPE
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
  createCheckPaymentRequest: {
    loading: false,
    success: false,
    fail: false
  },
  payMethod: null,
  invoiceRequest: {
    loading: false,
    success: false,
    fail: false,
    data: undefined
  },

});

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
     * Create check payment
     */
    case CREATE_CHECK_PAYMENT:
      return state
        .set('createCheckPaymentRequest', state.get('createCheckPaymentRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
        );
    case CREATE_CHECK_PAYMENT_SUCCESS:
      return state
        .set('createCheckPaymentRequest', state.get('createCheckPaymentRequest')
          .set('success', true)
          .set('loading', false)
        );
    case CREATE_CHECK_PAYMENT_FAIL:
      return state
        .set('createCheckPaymentRequest', state.get('createCheckPaymentRequest')
          .set('loading', false)
          .set('fail', true)
        );

    case SET_PAY_TYPE:
      return state
        .set('payMethod', action.data);

    /**
     * Create check payment
     */
    case GET_INVOICE:
      return state
        .set('invoiceRequest', state.get('invoiceRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
        );
    case GET_INVOICE_SUCCESS:
      return state
        .set('invoiceRequest', state.get('invoiceRequest')
          .set('success', true)
          .set('loading', false)
          .set('data', Immutable.fromJS(action.result.data))
        );
    case GET_INVOICE_FAIL:
      return state
        .set('invoiceRequest', state.get('invoiceRequest')
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