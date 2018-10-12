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
export const selectGetRecordRequest = createSelector(
  selectParentsDomain,
  (subState) => subState.get('getRecordRequest')
);

/**
 * Get student requests request
 */
export const selectStudentRequestsRequest = createSelector(
  selectParentsDomain,
  (subState) => subState.get('getStudentRequestsRequest')
);


/**
 * Get update student status request
 */
export const selectStudentStatusRequest = createSelector(
  selectParentsDomain,
  (subState) => subState.get('studentStatusRequest')
);

/**
 * Get sent student request
 */
export const selectSentStudentRequest = createSelector(
  selectParentsDomain,
  (subState) => subState.get('sentStudentRequest')
);

/**
 * Create parent
 */
export const selectCreateRequest = createSelector(
  selectParentsDomain,
  (subState) => subState.get('createRequest')
);



