import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectCourseCreditsDomain = (state) => state.courseCredits;

export const selectGetRecordsRequest = createSelector(
  selectCourseCreditsDomain,
  (subState) => subState.get('getRecordsRequest')
);

export const selectGiftCourseCreditRequest = createSelector(
  selectCourseCreditsDomain,
  (subState) => subState.get('giftRequest')
);

export const selectAssignCourseCreditRequest = createSelector(
  selectCourseCreditsDomain,
  (subState) => subState.get('assignRequest')
);
