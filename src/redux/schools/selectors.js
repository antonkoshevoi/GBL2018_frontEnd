import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectSchoolsDomain = (state) => state.schools;

/**
 * Schools
 */
export const selectSchools = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('schools')
);
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
/**
 * School Homerooms
 */
export const selectGetSchoolHomeroomsRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getSchoolHomeroomsRequest')
);

