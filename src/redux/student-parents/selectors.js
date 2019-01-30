import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectStudentParentsDomain = (state) => state.studentParents;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectStudentParentsDomain,
  (subState) => subState.get('getRecordsRequest')
);

/**
 * Get Single Request
 */
export const selectGetRecordRequest = createSelector(
  selectStudentParentsDomain,
  (subState) => subState.get('getRecordRequest')
);

/**
 * Get student requests request
 */
export const selectStudentsRequest = createSelector(
  selectStudentParentsDomain,
  (subState) => subState.get('getStudentsRequest')
);


/**
 * Get update student status request
 */
export const selectStudentStatusRequest = createSelector(
  selectStudentParentsDomain,
  (subState) => subState.get('studentStatusRequest')
);

/**
 * Get sent student request
 */
export const selectSentStudentRequest = createSelector(
  selectStudentParentsDomain,
  (subState) => subState.get('sentStudentRequest')
);

/**
 * Create parent
 */
export const selectCreateRequest = createSelector(
  selectStudentParentsDomain,
  (subState) => subState.get('createRequest')
);



