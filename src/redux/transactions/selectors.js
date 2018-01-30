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

export const selectRecords = createSelector(
  selectStoreDomain,
  (subState) => subState.get('records')
);


/**
 * Pagiantion
 */
export const selectPagination = createSelector(
  selectStoreDomain,
  (subState) => subState.get('pagination')
);
