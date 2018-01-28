import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectStoreDomain = (state) => state.payments;

export const selectCreatePayPalPaymentRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('createPayPalPaymentRequest')
);

export const selectExecutePayPalPaymentRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('executePayPalPaymentRequest')
);
