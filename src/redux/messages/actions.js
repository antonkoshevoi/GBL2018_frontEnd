
export const GET_MESSAGE = '[Messages] GET_MESSAGE';
export const GET_MESSAGE_SUCCESS = '[Messages] GET_MESSAGE_SUCCESS';
export const GET_MESSAGE_FAIL = '[Messages] GET_MESSAGE_FAIL';
export const RESET_GET_MESSAGE_REQUEST = '[Messages] RESET_GET_MESSAGE_REQUEST';

export const VIEW_MESSAGE = '[Messages] VIEW_MESSAGE';
export const VIEW_MESSAGE_SUCCESS = '[Messages] VIEW_MESSAGE_SUCCESS';
export const VIEW_MESSAGE_FAIL = '[Messages] VIEW_MESSAGE_FAIL';

export const SEND_MESSAGE = '[Messages] SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = '[Messages] SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = '[Messages] SEND_MESSAGE_FAIL';
export const RESET_SEND_MESSAGE_REQUEST = '[Messages] RESET_SEND_MESSAGE_REQUEST';

export const REPLY_MESSAGE = '[Messages] REPLY_MESSAGE';
export const REPLY_MESSAGE_SUCCESS = '[Messages] REPLY_MESSAGE_SUCCESS';
export const REPLY_MESSAGE_FAIL = '[Messages] REPLY_MESSAGE_FAIL';
export const RESET_REPLY_MESSAGE_REQUEST = '[Messages] RESET_REPLY_MESSAGE_REQUEST';

export const GET_UNREAD_MESSAGES = '[Messages] GET_UNREAD_MESSAGES';
export const GET_UNREAD_MESSAGES_SUCCESS = '[Messages] GET_UNREAD_MESSAGES_SUCCESS';
export const GET_UNREAD_MESSAGES_FAIL = '[Messages] GET_UNREAD_MESSAGES_FAIL';

export const GET_SENT_MESSAGES = '[Messages] GET_SENT_MESSAGES';
export const GET_SENT_MESSAGES_SUCCESS = '[Messages] GET_SENT_MESSAGES_SUCCESS';
export const GET_SENT_MESSAGES_FAIL = '[Messages] GET_SENT_MESSAGES_FAIL';

export const GET_DRAFT_MESSAGES = '[Messages] GET_DRAFT_MESSAGES';
export const GET_DRAFT_MESSAGES_SUCCESS = '[Messages] GET_DRAFT_MESSAGES_SUCCESS';
export const GET_DRAFT_MESSAGES_FAIL = '[Messages] GET_DRAFT_MESSAGES_FAIL';

export const GET_DRAFT_MESSAGE = '[Messages] GET_DRAFT_MESSAGE';
export const GET_DRAFT_MESSAGE_SUCCESS = '[Messages] GET_DRAFT_MESSAGE_SUCCESS';
export const GET_DRAFT_MESSAGE_FAIL = '[Messages] GET_DRAFT_MESSAGE_FAIL';

export const GET_INBOX_MESSAGES = '[Messages] GET_INBOX_MESSAGES';
export const GET_INBOX_MESSAGES_SUCCESS = '[Messages] GET_INBOX_MESSAGES_SUCCESS';
export const GET_INBOX_MESSAGES_FAIL = '[Messages] GET_INBOX_MESSAGES_FAIL';

export const DELETE_MESSAGE = '[Messages] DELETE_MESSAGE';
export const DELETE_MESSAGE_SUCCESS = '[Messages] DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_FAIL = '[Messages] DELETE_MESSAGE_FAIL';
export const RESET_DELETE_MESSAGE_REQUEST = '[Messages] RESET_DELETE_MESSAGE_REQUEST';

export const DELETE_DRAFT_MESSAGE = '[Messages] DELETE_DRAFT_MESSAGE';
export const DELETE_DRAFT_MESSAGE_SUCCESS = '[Messages] DELETE_DRAFT_MESSAGE_SUCCESS';
export const DELETE_DRAFT_MESSAGE_FAIL = '[Messages] DELETE_DRAFT_MESSAGE_FAIL';

export function sendMessage(params = {}) {
  return {    
    types: [SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.post(`messages/send`, params)
  };
}

export function resetSendMessageRequest() {
    return {
        type: RESET_SEND_MESSAGE_REQUEST
    };
}

export function replyMessage(id, params = {}) {
  return {    
    types: [REPLY_MESSAGE, REPLY_MESSAGE_SUCCESS, REPLY_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.post(`messages/reply/${id}`, params)
  };
}

export function resetReplyMessageRequest() {
    return {
        type: RESET_REPLY_MESSAGE_REQUEST
    };
}

export function getMessage(id) {
  return {    
    types: [GET_MESSAGE, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.get(`messages/details/${id}`)
  };
}

export function getDraftMessage(id) {
  return {    
    types: [GET_DRAFT_MESSAGE, GET_DRAFT_MESSAGE_SUCCESS, GET_DRAFT_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.get(`messages/draft/${id}`)
  };
}

export function viewMessage(id) {
  return {    
    types: [VIEW_MESSAGE, VIEW_MESSAGE_SUCCESS, VIEW_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.get(`messages/view/${id}`)
  };
}

export function resetGetMessageRequest() {
    return {
        type: RESET_GET_MESSAGE_REQUEST
    };
}

export function getSentMessages(params = {}) {
  return {    
    types: [GET_SENT_MESSAGES, GET_SENT_MESSAGES_SUCCESS, GET_SENT_MESSAGES_FAIL],
    promise: (apiClient) => apiClient.get(`messages/sent`, params)
  };
}

export function getUnreadMessages(params = {}) {
  return {    
    types: [GET_UNREAD_MESSAGES, GET_UNREAD_MESSAGES_SUCCESS, GET_UNREAD_MESSAGES_FAIL],
    promise: (apiClient) => apiClient.get(`messages/unread`, params)
  };
}

export function getDraftMessages(params = {}) {
  return {    
    types: [GET_DRAFT_MESSAGES, GET_DRAFT_MESSAGES_SUCCESS, GET_DRAFT_MESSAGES_FAIL],
    promise: (apiClient) => apiClient.get(`messages/drafts`, params)
  };
}

export function getInboxMessages(params = {}) {
  return {    
    types: [GET_INBOX_MESSAGES, GET_INBOX_MESSAGES_SUCCESS, GET_INBOX_MESSAGES_FAIL],
    promise: (apiClient) => apiClient.get(`messages/inbox`, params)
  };
}

export function deleteMessage(id) {
  return {    
    types: [DELETE_MESSAGE, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.get(`messages/delete/${id}`)
  };
}

export function deleteDraftMessage(id) {
  return {    
    types: [DELETE_DRAFT_MESSAGE, DELETE_DRAFT_MESSAGE_SUCCESS, DELETE_DRAFT_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.get(`messages/delete-draft/${id}`)
  };
}

export function resetDeleteMessageRequest() {
    return {
        type: RESET_DELETE_MESSAGE_REQUEST
    };
}