import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectClassroomsDomain = (state) => state.classrooms;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
    selectClassroomsDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Get Single Request
 */
export const selectGetSingleRecordRequest = createSelector(
    selectClassroomsDomain,
  (subState) => subState.get('getSingleRecordRequest')
);
/**
 * Records
 */
export const selectRecords = createSelector(
    selectClassroomsDomain,
  (subState) => subState.get('records')
);
/**
 * Schools
 */
export const selectSchools = createSelector(
    selectClassroomsDomain,
  (subState) => subState.get('schools')
);
/**
 * Pagiantion
 */
export const selectPagination = createSelector(
    selectClassroomsDomain,
  (subState) => subState.get('pagination')
);

/**
 * Create
 */
export const selectCreateRequest = createSelector(
    selectClassroomsDomain,
  (subState) => subState.get('createRequest')
);
/**
 * Update
 */
export const selectUpdateRequest = createSelector(
    selectClassroomsDomain,
  (subState) => subState.get('updateRequest')
);
/**
 * Classrooms School Teachers
 */
export const selectGetSchoolTeachersRequest = createSelector(
    selectClassroomsDomain,
    (subState) => subState.get('getSchoolTeachersRequest')
);
/**
 * Classrooms School Students
 */
export const selectGetSchoolStudentsRequest = createSelector(
    selectClassroomsDomain,
    (subState) => subState.get('getSchoolStudentsRequest')
);
