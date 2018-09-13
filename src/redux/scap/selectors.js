import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectScapDomain = (state) => state.scap;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('getRecordsRequest')
);

/**
 * Get Results Request
 */
export const selectGetResultRecordsRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('getResultRecordsRequest')
);

/**
 * Get Single Request
 */
export const selectGetRecordRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('getRecordRequest')
);

/**
 * Get Create Request
 */
export const selectCreateRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('createRequest')
);

/**
 * Get Update Request
 */
export const selectUpdateRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('updateRequest')
);

/**
 * Get Delete Request
 */
export const selectDeleteRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('deleteRequest')
);

/**
 * Get Assign Teachers Request
 */
export const selectAssignTeachersRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('assignTeachersRequest')
);

/**
 * Get Add Answers Request
 */
export const selectAddAnswersRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('saveAnswersRequest')
);

/**
 * Get Update Answers Request
 */
export const selectUpdateAnswersRequest = createSelector(
    selectScapDomain,
    (subState) => subState.get('saveAnswersRequest')
);
