import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectStudentsDomain = (state) => state.students;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('getRecordsRequest')
);

/**
 * Get Single Request
 */
export const selectGetSingleRecordRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('getSingleRecordRequest')
);

/**
 * Get Parent Request
 */
export const selectGetParentRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('getParentRequest')
);

/**
 * Get Create Parent Request
 */
export const selectCreateParentRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('createParentRequest')
);

/**
 * Get Link to Parent Request
 */
export const selectLinkToParentRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('linkToParentRequest')
);

/**
 * Get student requests request
 */
export const selectStudentRequestsRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('getStudentRequestsRequest')
);


/**
 * Get update student status request
 */
export const selectUpdateStudentStatusRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('updateStudentStatusRequest')
);

/**
 * Records
 */
export const selectRecords = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('records')
);
/**
 * Pagiantion
 */
export const selectPagination = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('pagination')
);

/**
 * Create
 */
export const selectCreateRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('createRequest')
);
/**
 * Update
 */
export const selectUpdateRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('updateRequest')
);
/**
 * Bulk Upload
 */
export const selectBulkUploadRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('bulkUploadRequest')
);
/**
 * Delete
 */
export const selectDeleteRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('deleteRequest')
);




