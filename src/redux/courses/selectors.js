import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectCoursesDomain = (state) => state.courses;

export const selectGetStoreRecordsRequest = createSelector(
  selectCoursesDomain,
  (subState) => subState.get('getStoreRecordsRequest')
);

export const selectGetUnassignedRecordsRequest = createSelector(
  selectCoursesDomain,
  (subState) => subState.get('getUnassignedRecordsRequest')
);
