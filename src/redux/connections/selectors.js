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
 * Get Received Records Request
 */
export const selectGetReceivedRecordsRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('getReceivedRecordsRequest')
);

/**
 * Get Connected Users Request
 */
export const selectGetUsersRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('getUsersRequest')
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
 * Invite connection
 */
export const selectInviteRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('inviteRequest')
);

/**
 * Delete connection
 */
export const selectDeleteRequest = createSelector(
  selectConnectionsDomain,
  (subState) => subState.get('deleteRequest')
);


