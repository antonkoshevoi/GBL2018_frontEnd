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
 * Get record for assign students
 */
export const selectGetRecordForAssignStudentsRequest = createSelector(
  selectClassroomsDomain,
  (subState) => subState.get('getRecordForAssignStudentsRequest')
);

/**
 * Get assign students request
 */
export const selectGetAssignStudentsRequest = createSelector(
  selectClassroomsDomain,
  (subState) => subState.get('assignStudentsRequest')
);

/**
 * Get assign demo student request
 */
export const selectAssignDemoStudentRequest = createSelector(
  selectClassroomsDomain,
  (subState) => subState.get('assignDemoStudentRequest')
);

export const selectGetScheduleRequest = createSelector(
  selectClassroomsDomain,
  (subState) => subState.get('getScheduleRequest')
);

export const selectScheduleLessonRequest = createSelector(
  selectClassroomsDomain,
  (subState) => subState.get('scheduleLessonRequest')
);

export const selectUpdateScheduleRequest = createSelector(
  selectClassroomsDomain,
  (subState) => subState.get('updateScheduleRequest')
);