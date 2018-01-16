import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectStudentsDomain = (state) => state.students;

export const selectGetRecordsRequest = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('getRecordsRequest')
);

export const selectRecords = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('records')
);

export const selectSchools = createSelector(
  selectStudentsDomain,
  (subState) => subState.get('schools')
);

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
