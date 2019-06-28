import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectStoreDomain = (state) => state.transactions;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('getRecordsRequest')
);

/**
 * Get Downloads Request
 */
export const selectGetDownloadsRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('getDownloadsRequest')
);