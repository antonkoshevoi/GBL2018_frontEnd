import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectTeachersDomain = (state) => state.teachers;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
    selectTeachersDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Get Single Request
 */
export const selectGetSingleRecordRequest = createSelector(
    selectTeachersDomain,
  (subState) => subState.get('getSingleRecordRequest')
);
/**
 * Records
 */
export const selectRecords = createSelector(
    selectTeachersDomain,
  (subState) => subState.get('records')
);
/**
 * Pagiantion
 */
export const selectPagination = createSelector(
    selectTeachersDomain,
  (subState) => subState.get('pagination')
);

/**
 * Create
 */
export const selectCreateRequest = createSelector(
    selectTeachersDomain,
  (subState) => subState.get('createRequest')
);
/**
 * Update
 */
export const selectUpdateRequest = createSelector(
    selectTeachersDomain,
  (subState) => subState.get('updateRequest')
);
/**
 * Delete
 */
export const selectDeleteRequest = createSelector(
  selectTeachersDomain,
  (subState) => subState.get('deleteRequest')
);
