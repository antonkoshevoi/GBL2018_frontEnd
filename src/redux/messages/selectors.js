import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectMessagesDomain = (state) => state.messages;

export const selectSendMessageRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('sendMessageRequest')
);

export const selectGetRecordRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getRecordRequest')
);

export const selectGetRecordsRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getRecordsRequest')
);

export const selectDeleteRecordRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('deleteRecordRequest')
);