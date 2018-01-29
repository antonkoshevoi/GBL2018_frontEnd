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
 * Delete
 */
export const selectDeleteRequest = createSelector(
  selectClassroomsDomain,
  (subState) => subState.get('deleteRequest')
);
/**
 * Bulk Upload
 */
export const selectBulkUploadRequest = createSelector(
    selectClassroomsDomain,
    (subState) => subState.get('bulkUploadRequest')
);

/**
 * Courses
 */
export const selectCoursesRequest = createSelector(
  selectClassroomsDomain,
  (subState) => subState.get('getCoursesRequest')
);