import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectStoreDomain = (state) => state.store;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Get Single Request
 */
export const selectGetSingleRecordRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('getSingleRecordRequest')
);

/**
 * Get Single Record
 */
export const selectGetSingleRecord = createSelector(
    selectStoreDomain,
    (subState) => subState.get('singleRecord')
);
/**
 * Records
 */
export const selectRecords = createSelector(
  selectStoreDomain,
  (subState) => subState.get('records')
);

/**
 * Get Cart Records Request
 */
export const selectGetCartRecordsRequest = createSelector(
    selectStoreDomain,
    (subState) => subState.get('getCartRecordsRequest')
);

/**
 * Get Cart Records Request
 */
export const selectGetCartInvoiceRecordsRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('getCartInvoiceRecordsRequest')
);

/**
 * Get Cart Records
 */
export const selectCartRecords = createSelector(
    selectStoreDomain,
    (subState) => subState.get('cartRecords')
);
/**
 * Get Cart Redirect
 */
export const selectCardRedirect = createSelector(
    selectStoreDomain,
    (subState) => subState.get('addToCartRedirect')
);

/**
 * Get Cart Records Total
 */
export const selectCartRecordsSum = createSelector(
    selectStoreDomain,
    (subState) => subState.get('totalSum')
);

/**
 * Add To Cart Request
 */
export const selectAddToCartRequest = createSelector(
    selectStoreDomain,
    (subState) => subState.get('addToCartRequest')
);


/**
 * Pagiantion
 */
export const selectPagination = createSelector(
  selectStoreDomain,
  (subState) => subState.get('pagination')
);

/**
 * Delete
 */
export const deleteFromCartRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('deleteFromCartRequest')
);

/**
 * Unassigneds
 */
export const getUnassignedsRequest = createSelector(
  selectStoreDomain,
  (subState) => subState.get('getUnassignedsRequest')
);
