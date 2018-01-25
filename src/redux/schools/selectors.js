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
 * School
 */
export const selectSchool = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('school')
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
