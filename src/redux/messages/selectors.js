import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectMessagesDomain = (state) => state.messages;

export const selectSendMessageRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('sendMessageRequest')
);

export const selectUpdateMessageRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('updateMessageRequest')
);

export const selectGetRecordRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getRecordRequest')
);

export const selectGetRecordsRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getRecordsRequest')
);

export const selectGetPrivateChatsRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getPrivateChatsRequest')
);

export const selectGetGroupChatsRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getGroupChatsRequest')
);

export const selectGetChatMessagesRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getChatMessagesRequest')
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