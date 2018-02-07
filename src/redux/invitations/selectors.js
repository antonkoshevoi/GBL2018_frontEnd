import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectInvitationsDomain = (state) => state.invitations;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectInvitationsDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Delete record request
 */
export const selectDeleteRecordRequest = createSelector(
  selectInvitationsDomain,
  (subState) => subState.get('deleteRecordRequest')
);
/**
 * Records
 */
export const selectRecords = createSelector(
  selectInvitationsDomain,
  (subState) => subState.get('records')
);
/**
 * Pagiantion
 */
export const selectPagination = createSelector(
  selectInvitationsDomain,
  (subState) => subState.get('pagination')
);
