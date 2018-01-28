import { uri } from '../../helpers/uri';

export const CREATE_PAYPAL_PAYMENT = '[Payments] CREATE_PAYPAL_PAYMENT';
export const CREATE_PAYPAL_PAYMENT_SUCCESS = '[Payments] CREATE_PAYPAL_PAYMENT_SUCCESS';
export const CREATE_PAYPAL_PAYMENT_FAIL = '[Payments] CREATE_PAYPAL_PAYMENT_FAIL';

export const EXECUTE_PAYPAL_PAYMENT = '[Payments] EXECUTE_PAYPAL_PAYMENT';
export const EXECUTE_PAYPAL_PAYMENT_SUCCESS = '[Payments] EXECUTE_PAYPAL_PAYMENT_SUCCESS';
export const EXECUTE_PAYPAL_PAYMENT_FAIL = '[Payments] EXECUTE_PAYPAL_PAYMENT_FAIL';

/**
 * PayPal
 */
export function createPayPalPayment() {
  return {
    types: [CREATE_PAYPAL_PAYMENT, CREATE_PAYPAL_PAYMENT_SUCCESS, CREATE_PAYPAL_PAYMENT_FAIL],
    promise: (apiClient) => apiClient.post(`checkout/paypal/create`, {
      returnUrl: uri('payments/paypal/return'),
      cancelUrl: uri('payments/paypal/cancel')
    })
  }
}
export function executePayPalPayment(data) {
  return {
    types: [EXECUTE_PAYPAL_PAYMENT, EXECUTE_PAYPAL_PAYMENT_SUCCESS, EXECUTE_PAYPAL_PAYMENT_FAIL],
    promise: (apiClient) => apiClient.post(`checkout/paypal/execute`, data)
  }
}