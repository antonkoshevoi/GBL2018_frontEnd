import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectStoreDomain = (state) => state.payments;

/**
 * PayPal
 */
export const selectCreatePayPalPaymentRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('createPayPalPaymentRequest')
);
export const selectExecutePayPalPaymentRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('executePayPalPaymentRequest')
);

/**
 * CC
 */
export const selectCreateCreditCardPaymentRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('createCreditCardPaymentRequest')
);

/**
 * Check
 */
export const selectCreateCheckPaymentRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('createCheckPaymentRequest')
);

/**
 * Invoice
 */
export const invoiceRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('invoiceRequest')
);