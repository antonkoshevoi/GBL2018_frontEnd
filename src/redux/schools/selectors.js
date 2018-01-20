import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectSchoolsDomain = (state) => state.schools;

/**
 * School Teachers
 */
export const selectGetSchoolTeachersRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getSchoolTeachersRequest')
);
/**
 * School Students
 */
export const selectGetSchoolStudentsRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getSchoolStudentsRequest')
);
