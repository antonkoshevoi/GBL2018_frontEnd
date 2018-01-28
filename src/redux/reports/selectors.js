import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectSchoolsDomain = (state) => state.reports;

/**
 * School
 */
export const selectSchoolRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('school')
);
/**
 * User School Students
 */
export const selectGetUserSchoolStudentsRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getUserSchoolStudentsRequest')
);
/**
 * User School Homerooms
 */
export const selectGetUserSchoolHomeroomsRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getUserSchoolHomeroomsRequest')
);
/**
 * User School Teachers
 */
export const selectGetUserSchoolTeachersRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getUserSchoolTeachersRequest')
);
/**
 * User School Admins
 */
export const selectGetUserSchoolAdminsRequestRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getUserSchoolAdminsRequest')
);
/**
 * Get Student for report
 */
export const selectGetStudentForReportRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getStudentForReportRequest')
);
/**
 * User School Classrooms
 */
export const selectGetUserSchoolClassroomsRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getUserSchoolClassroomsRequest')
);
