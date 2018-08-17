import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectScapDomain = (state) => state.scap;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('getRecordsRequest')
);

/**
 * Get Single Request
 */
export const selectGetRecordRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('getRecordRequest')
);

/**
 * Get Create Request
 */
export const selectCreateRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('createRequest')
);

/**
 * Get Pagiantion
 */
export const selectPagination = createSelector(
    selectScapDomain,
    (subState) => subState.get('pagination')
);