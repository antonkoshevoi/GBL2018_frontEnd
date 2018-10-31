import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectCourseCreditsDomain = (state) => state.courseCredits;

export const selectGetRecordsRequest = createSelector(
  selectCourseCreditsDomain,
  (subState) => subState.get('getRecordsRequest')
);

export const selectAssignCourseCreditRequest = createSelector(
  selectCourseCreditsDomain,
  (subState) => subState.get('assignRequest')
);
