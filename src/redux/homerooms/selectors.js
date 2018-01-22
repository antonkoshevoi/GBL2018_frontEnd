import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectHomeroomsDomain = (state) => state.homerooms;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
    selectHomeroomsDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Get Single Request
 */
export const selectGetSingleRecordRequest = createSelector(
    selectHomeroomsDomain,
  (subState) => subState.get('getSingleRecordRequest')
);
/**
 * Records
 */
export const selectRecords = createSelector(
    selectHomeroomsDomain,
  (subState) => subState.get('records')
);
/**
 * Pagiantion
 */
export const selectPagination = createSelector(
    selectHomeroomsDomain,
  (subState) => subState.get('pagination')
);

/**
 * Create
 */
export const selectCreateRequest = createSelector(
    selectHomeroomsDomain,
  (subState) => subState.get('createRequest')
);
/**
 * Update
 */
export const selectUpdateRequest = createSelector(
    selectHomeroomsDomain,
  (subState) => subState.get('updateRequest')
);
/**
 * Delete
 */
export const selectDeleteRequest = createSelector(
  selectHomeroomsDomain,
  (subState) => subState.get('deleteRequest')
);
/**
 * Bulk Upload
 */
export const selectBulkUploadRequest = createSelector(
    selectHomeroomsDomain,
    (subState) => subState.get('bulkUploadRequest')
);

