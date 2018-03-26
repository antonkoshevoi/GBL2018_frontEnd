import { uri } from '../../helpers/uri';

export const CREATE_PAYPAL_PAYMENT = '[Payments] CREATE_PAYPAL_PAYMENT';
export const CREATE_PAYPAL_PAYMENT_SUCCESS = '[Payments] CREATE_PAYPAL_PAYMENT_SUCCESS';
export const CREATE_PAYPAL_PAYMENT_FAIL = '[Payments] CREATE_PAYPAL_PAYMENT_FAIL';

export const EXECUTE_PAYPAL_PAYMENT = '[Payments] EXECUTE_PAYPAL_PAYMENT';
export const EXECUTE_PAYPAL_PAYMENT_SUCCESS = '[Payments] EXECUTE_PAYPAL_PAYMENT_SUCCESS';
export const EXECUTE_PAYPAL_PAYMENT_FAIL = '[Payments] EXECUTE_PAYPAL_PAYMENT_FAIL';

export const CREATE_CHECK_PAYMENT = '[Payments] CREATE_CHECK_PAYMENT';
export const CREATE_CHECK_PAYMENT_SUCCESS = '[Payments] CREATE_CHECK_PAYMENT_SUCCESS';
export const CREATE_CHECK_PAYMENT_FAIL = '[Payments] CREATE_CHECK_PAYMENT_FAIL';

export const SET_PAY_TYPE = '[Payments] SET_PAY_TYPE';

export const GET_INVOICE = '[Payments] GET_INVOICE';
export const GET_INVOICE_SUCCESS = '[Payments] GET_INVOICE_SUCCESS';
export const GET_INVOICE_FAIL = '[Payments] GET_INVOICE_FAIL';

/**
 * PayPal
 */
export function createPayPalPayment() {
  return {
    types: [CREATE_PAYPAL_PAYMENT, CREATE_PAYPAL_PAYMENT_SUCCESS, CREATE_PAYPAL_PAYMENT_FAIL],
    promise: (apiClient) => apiClient.post(`checkout/paypal/create`, {
      returnUrl: uri('payments/paypal/return'),
      cancelUrl: uri('payments/canceled')
    })
  }
}
export function executePayPalPayment(data) {
  return {
    types: [EXECUTE_PAYPAL_PAYMENT, EXECUTE_PAYPAL_PAYMENT_SUCCESS, EXECUTE_PAYPAL_PAYMENT_FAIL],
    promise: (apiClient) => apiClient.post(`checkout/paypal/execute`, data)
  }
}

/**
 * Check
 */
export function createCheckPayment() {
  return {
    types: [CREATE_CHECK_PAYMENT, CREATE_CHECK_PAYMENT_SUCCESS, CREATE_CHECK_PAYMENT_FAIL],
    promise: (apiClient) => apiClient.post(`checkout/check/create`, {})
  }
}

export function setPayType(data) {
  return {
    type: SET_PAY_TYPE,
    data
  }
}

/**
 * Get invoice
 */
export function getInvoice() {
  return {
    types: [GET_INVOICE, GET_INVOICE_SUCCESS, GET_INVOICE_FAIL],
    promise: (apiClient) => apiClient.get(`checkout/invoice`, {})
  }
}


