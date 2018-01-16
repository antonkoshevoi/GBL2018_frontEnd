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
 * Records
 */
export const selectRecords = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('records')
);
/**
 * Schools
 */
export const selectSchools = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('schools')
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
