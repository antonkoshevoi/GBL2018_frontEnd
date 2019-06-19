import { uri } from '../../helpers/uri';
import SessionStorage from '../../services/SessionStorage';

export const CREATE_PAYPAL_PAYMENT = '[Payments] CREATE_PAYPAL_PAYMENT';
export const CREATE_PAYPAL_PAYMENT_SUCCESS = '[Payments] CREATE_PAYPAL_PAYMENT_SUCCESS';
export const CREATE_PAYPAL_PAYMENT_FAIL = '[Payments] CREATE_PAYPAL_PAYMENT_FAIL';

export const EXECUTE_PAYPAL_PAYMENT = '[Payments] EXECUTE_PAYPAL_PAYMENT';
export const EXECUTE_PAYPAL_PAYMENT_SUCCESS = '[Payments] EXECUTE_PAYPAL_PAYMENT_SUCCESS';
export const EXECUTE_PAYPAL_PAYMENT_FAIL = '[Payments] EXECUTE_PAYPAL_PAYMENT_FAIL';

export const CREATE_CHECK_PAYMENT = '[Payments] CREATE_CHECK_PAYMENT';
export const CREATE_CHECK_PAYMENT_SUCCESS = '[Payments] CREATE_CHECK_PAYMENT_SUCCESS';
export const CREATE_CHECK_PAYMENT_FAIL = '[Payments] CREATE_CHECK_PAYMENT_FAIL';

export const CREATE_CC_PAYMENT = '[Payments] CREATE_CC_PAYMENT';
export const CREATE_CC_PAYMENT_SUCCESS = '[Payments] CREATE_CC_PAYMENT_SUCCESS';
export const CREATE_CC_PAYMENT_FAIL = '[Payments] CREATE_CC_PAYMENT_FAIL';
export const RESET_CC_PAYMENT = '[Payments] RESET_CC_PAYMENT';

export const GET_INVOICE = '[Payments] GET_INVOICE';
export const GET_INVOICE_SUCCESS = '[Payments] GET_INVOICE_SUCCESS';
export const GET_INVOICE_FAIL = '[Payments] GET_INVOICE_FAIL';

export function createCreditCardPayment(data) {
  data.invoiceNo = SessionStorage.get('invoiceNo');
  return {
    types: [CREATE_CC_PAYMENT, CREATE_CC_PAYMENT_SUCCESS, CREATE_CC_PAYMENT_FAIL],
    promise: (apiClient) => apiClient.post('checkout/creditcard/create', data),
    payload: data
  };
}

export function resetCreditCardPayment () {
  return {
    type: RESET_CC_PAYMENT
  }
}

/**
 * PayPal
 */
export function createPayPalPayment(data) {
  data.returnUrl = uri('payments/paypal/return');
  data.cancelUrl = uri('payments/canceled');
  data.invoiceNo = SessionStorage.get('invoiceNo');
  return {
    types: [CREATE_PAYPAL_PAYMENT, CREATE_PAYPAL_PAYMENT_SUCCESS, CREATE_PAYPAL_PAYMENT_FAIL],
    promise: (apiClient) => apiClient.post(`checkout/paypal/create`, data)
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
export function createCheckPayment(data) {
  data.invoiceNo = SessionStorage.get('invoiceNo');
  return {
    types: [CREATE_CHECK_PAYMENT, CREATE_CHECK_PAYMENT_SUCCESS, CREATE_CHECK_PAYMENT_FAIL],
    promise: (apiClient) => apiClient.post(`checkout/check/create`, data)
  }
}

/**
 * Get invoice
 */
export function getInvoice(number, hash) {
  return {
    types: [GET_INVOICE, GET_INVOICE_SUCCESS, GET_INVOICE_FAIL],
    promise: (apiClient) => apiClient.get(`checkout/invoice/${number}/${hash}`, {})
  }
}


