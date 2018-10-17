import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectConnectionsDomain = (state) => state.connections;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('getRecordsRequest')
);

/**
 * Get Records Request
 */
export const selectGetReceivedRecordsRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('getReceivedRecordsRequest')
);

/**
 * Get Single Request
 */
export const selectGetRecordRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('getRecordRequest')
);

/**
 * Get update student status request
 */
export const selectChangeStatusRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('changeStatusRequest')
);

/**
 * Create connection
 */
export const selectCreateRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('createRequest')
);

/**
 * Delete connection
 */
export const selectDeleteRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('deleteRequest')
);


