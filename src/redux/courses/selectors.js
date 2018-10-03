import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectCoursesDomain = (state) => state.courses;

export const selectGetStoreRecordsRequest = createSelector(
  selectCoursesDomain,
  (subState) => subState.get('getStoreRecordsRequest')
);

/**
 * Courses
 */
export const selectCoursesRequest = createSelector(
  selectCoursesDomain,
  (subState) => subState.get('getCoursesRequest')
);