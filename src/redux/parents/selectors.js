import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectParentsDomain = (state) => state.parents;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
    selectParentsDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Get Single Request
 */
export const selectGetSingleRecordRequest = createSelector(
    selectParentsDomain,
  (subState) => subState.get('getSingleRecordRequest')
);
/**
 * Records
 */
export const selectRecords = createSelector(
    selectParentsDomain,
  (subState) => subState.get('records')
);
/**
 * Pagiantion
 */
export const selectPagination = createSelector(
    selectParentsDomain,
  (subState) => subState.get('pagination')
);

/**
 * Create
 */
export const selectCreateRequest = createSelector(
    selectParentsDomain,
  (subState) => subState.get('createRequest')
);
/**
 * Update
 */
export const selectUpdateRequest = createSelector(
    selectParentsDomain,
  (subState) => subState.get('updateRequest')
);
/**
 * Delete
 */
export const selectDeleteRequest = createSelector(
  selectParentsDomain,
  (subState) => subState.get('deleteRequest')
);
/**
 * Delete
 */
export const selectGetStudentsRequest = createSelector(
  selectParentsDomain,
  (subState) => subState.get('getStudentsRequest')
);