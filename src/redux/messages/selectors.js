import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectMessagesDomain = (state) => state.messages;

export const selectSendMessageRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('sendMessageRequest')
);

export const selectReplyMessageRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('replyMessageRequest')
);

export const selectGetRecordRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getRecordRequest')
);

export const selectGetInboxRecordsRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getInboxRecordsRequest')
);

export const selectGetDraftRecordsRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getDraftRecordsRequest')
);

export const selectGetSentRecordsRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getSentRecordsRequest')
);

export const selectDeleteRecordRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('deleteRecordRequest')
);

export const selectGetUnreadMessagesRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getUnreadMessagesRequest')
);