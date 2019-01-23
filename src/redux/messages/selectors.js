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

export const selectGetGroupRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getGroupRequest')
);

export const selectGetGroupsRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getGroupsRequest')
);

export const selectCreateGroupRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('createGroupRequest')
);

export const selectUpdateGroupRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('updateGroupRequest')
);

export const selectDeleteGroupRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('deleteGroupRequest')
);