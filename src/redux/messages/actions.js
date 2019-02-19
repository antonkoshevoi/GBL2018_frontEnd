
export const GET_MESSAGE = '[Messages] GET_MESSAGE';
export const GET_MESSAGE_SUCCESS = '[Messages] GET_MESSAGE_SUCCESS';
export const GET_MESSAGE_FAIL = '[Messages] GET_MESSAGE_FAIL';
export const RESET_GET_MESSAGE_REQUEST = '[Messages] RESET_GET_MESSAGE_REQUEST';

export const GET_MESSAGES = '[Messages] GET_MESSAGES';
export const GET_MESSAGES_SUCCESS = '[Messages] GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAIL = '[Messages] GET_MESSAGES_FAIL';

export const GET_PRIVATE_CHATS = '[Messages] GET_PRIVATE_CHATS';
export const GET_PRIVATE_CHATS_SUCCESS = '[Messages] GET_PRIVATE_CHATS_SUCCESS';
export const GET_PRIVATE_CHATS_FAIL = '[Messages] GET_PRIVATE_CHATS_FAIL';

export const GET_GROUP_CHATS = '[Messages] GET_GROUP_CHATS';
export const GET_GROUP_CHATS_SUCCESS = '[Messages] GET_GROUP_CHATS_SUCCESS';
export const GET_GROUP_CHATS_FAIL = '[Messages] GET_GROUP_CHATS_FAIL';

export const GET_CHAT_MESSAGES = '[Messages] GET_CHAT_MESSAGES';
export const GET_CHAT_MESSAGES_SUCCESS = '[Messages] GET_CHAT_MESSAGES_SUCCESS';
export const GET_CHAT_MESSAGES_FAIL = '[Messages] GET_CHAT_MESSAGES_FAIL';

export const VIEW_MESSAGE = '[Messages] VIEW_MESSAGE';
export const VIEW_MESSAGE_SUCCESS = '[Messages] VIEW_MESSAGE_SUCCESS';
export const VIEW_MESSAGE_FAIL = '[Messages] VIEW_MESSAGE_FAIL';

export const READ_MESSAGES = '[Messages] READ_MESSAGES';
export const READ_MESSAGES_SUCCESS = '[Messages] READ_MESSAGES_SUCCESS';
export const READ_MESSAGES_FAIL = '[Messages] READ_MESSAGES_FAIL';

export const SEND_MESSAGE = '[Messages] SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = '[Messages] SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = '[Messages] SEND_MESSAGE_FAIL';
export const RESET_SEND_MESSAGE_REQUEST = '[Messages] RESET_SEND_MESSAGE_REQUEST';

export const SEND_CHAT_MESSAGE = '[Messages] SEND_CHAT_MESSAGE';
export const SEND_CHAT_MESSAGE_SUCCESS = '[Messages] SEND_CHAT_MESSAGE_SUCCESS';
export const SEND_CHAT_MESSAGE_FAIL = '[Messages] SEND_CHAT_MESSAGE_FAIL';
export const RESET_SEND_CHAT_MESSAGE_REQUEST = '[Messages] RESET_SEND_CHAT_MESSAGE_REQUEST';

export const UPDATE_MESSAGE = '[Messages] UPDATE_MESSAGE';
export const UPDATE_MESSAGE_SUCCESS = '[Messages] UPDATE_MESSAGE_SUCCESS';
export const UPDATE_MESSAGE_FAIL = '[Messages] UPDATE_MESSAGE_FAIL';
export const RESET_UPDATE_MESSAGE_REQUEST = '[Messages] RESET_UPDATE_MESSAGE_REQUEST';

export const GET_UNREAD_MESSAGES = '[Messages] GET_UNREAD_MESSAGES';
export const GET_UNREAD_MESSAGES_SUCCESS = '[Messages] GET_UNREAD_MESSAGES_SUCCESS';
export const GET_UNREAD_MESSAGES_FAIL = '[Messages] GET_UNREAD_MESSAGES_FAIL';

export const DELETE_MESSAGE = '[Messages] DELETE_MESSAGE';
export const DELETE_MESSAGE_SUCCESS = '[Messages] DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_FAIL = '[Messages] DELETE_MESSAGE_FAIL';
export const RESET_DELETE_MESSAGE_REQUEST = '[Messages] RESET_DELETE_MESSAGE_REQUEST';

export const DELETE_CHAT_MESSAGE = '[Messages] DELETE_CHAT_MESSAGE';
export const DELETE_CHAT_MESSAGE_SUCCESS = '[Messages] DELETE_CHAT_MESSAGE_SUCCESS';
export const DELETE_CHAT_MESSAGE_FAIL = '[Messages] DELETE_CHAT_MESSAGE_FAIL';

export const GET_GROUPS = '[Messages] GET_GROUPS';
export const GET_GROUPS_SUCCESS = '[Messages] GET_GROUPS_SUCCESS';
export const GET_GROUPS_FAIL = '[Messages] GET_GROUPS_FAIL';

export const GET_GROUP = '[Messages] GET_GROUP';
export const GET_GROUP_SUCCESS = '[Messages] GET_GROUP_SUCCESS';
export const GET_GROUP_FAIL = '[Messages] GET_GROUP_FAIL';
export const RESET_GET_GROUP_REQUEST = '[Messages] RESET_GET_GROUP_REQUEST';

export const CREATE_GROUP = '[Messages] CREATE_GROUP';
export const CREATE_GROUP_SUCCESS = '[Messages] CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAIL = '[Messages] CREATE_GROUP_FAIL';
export const RESET_CREATE_GROUP_REQUEST = '[Messages] RESET_CREATE_GROUP_REQUEST';

export const UPDATE_GROUP = '[Messages] UPDATE_GROUP';
export const UPDATE_GROUP_SUCCESS = '[Messages] UPDATE_GROUP_SUCCESS';
export const UPDATE_GROUP_FAIL = '[Messages] UPDATE_GROUP_FAIL';
export const RESET_UPDATE_GROUP_REQUEST = '[Messages] RESET_UPDATE_GROUP_REQUEST';

export const DELETE_GROUP = '[Messages] DELETE_GROUP';
export const DELETE_GROUP_SUCCESS = '[Messages] DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAIL = '[Messages] DELETE_GROUP_FAIL';
export const RESET_DELETE_GROUP_REQUEST = '[Messages] RESET_DELETE_GROUP_REQUEST';

export const NEW_MESSAGE_RECEIVED = '[Messages] NEW_MESSAGE_RECEIVED';
export const MESSAGE_REMOVED = '[Messages] MESSAGE_REMOVED';
export const SUBSCRIBE = '[Messages] SUBSCRIBE';
export const SUBSCRIBE_FAIL = '[Messages] SUBSCRIBE_FAIL';

export function subscribe (userId) {
  console.log(SUBSCRIBE);
  return {
    type: SUBSCRIBE, userId
  }
}

export function sendMessage(params = {}) {
  return {    
    types: [SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.post(`messages/send`, params)
  };
}

export function sendChatMessage(params = {}) {
  params.type = 'chat';
  return {    
    types: [SEND_CHAT_MESSAGE, SEND_CHAT_MESSAGE_SUCCESS, SEND_CHAT_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.post(`messages/send-chat-message`, params)
  };
}

export function resetSendMessageRequest() {
    return {
        type: RESET_SEND_MESSAGE_REQUEST
    };
}

export function updateMessage(id, params = {}) {
  return {    
    types: [UPDATE_MESSAGE, UPDATE_MESSAGE_SUCCESS, UPDATE_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.post(`messages/update/${id}`, params)
  };
}

export function resetUpdateMessageRequest() {
    return {
        type: RESET_UPDATE_MESSAGE_REQUEST
    };
}

export function readMessages(params = {}) {
  return {    
    types: [READ_MESSAGES, READ_MESSAGES_SUCCESS, READ_MESSAGES_FAIL],
    promise: (apiClient) => apiClient.post(`messages/read`, params)
  };
}

export function getMessage(id) {
  return {    
    types: [GET_MESSAGE, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.get(`messages/details/${id}`)
  };
}

export function resetGetMessageRequest() {
    return {
        type: RESET_GET_MESSAGE_REQUEST
    };
}

export function getMessages(params = {}) {
  return {    
    types: [GET_MESSAGES, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAIL],
    promise: (apiClient) => apiClient.get(`messages/all`, params)
  };
}

export function getPrivateChats(params = {}) {
  return {    
    types: [GET_PRIVATE_CHATS, GET_PRIVATE_CHATS_SUCCESS, GET_PRIVATE_CHATS_FAIL],
    promise: (apiClient) => apiClient.get(`messages/private-chats`, params)
  };
}

export function getGroupChats(params = {}) {
  return {    
    types: [GET_GROUP_CHATS, GET_GROUP_CHATS_SUCCESS, GET_GROUP_CHATS_FAIL],
    promise: (apiClient) => apiClient.get(`messages/group-chats`, params)
  };
}

export function getChatMessages(id, params = {}) {
  return {  
    chatId: id,
    types: [GET_CHAT_MESSAGES, GET_CHAT_MESSAGES_SUCCESS, GET_CHAT_MESSAGES_FAIL],
    promise: (apiClient) => apiClient.get(`messages/chat/${id}`, params)
  };
}

export function viewMessage(id) {
  return {    
    types: [VIEW_MESSAGE, VIEW_MESSAGE_SUCCESS, VIEW_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.get(`messages/view/${id}`)
  };
}

export function getUnreadMessages(params = {}) {
  return {    
    types: [GET_UNREAD_MESSAGES, GET_UNREAD_MESSAGES_SUCCESS, GET_UNREAD_MESSAGES_FAIL],
    promise: (apiClient) => apiClient.get(`messages/unread`, params)
  };
}

export function deleteMessage(id) {
  return {    
    types: [DELETE_MESSAGE, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.get(`messages/delete/${id}`)
  };
}

export function resetDeleteMessageRequest() {
    return {
        type: RESET_DELETE_MESSAGE_REQUEST
    };
}

export function deleteChatMessage(id) {
  return {
    messageId: id,
    types: [DELETE_CHAT_MESSAGE, DELETE_CHAT_MESSAGE_SUCCESS, DELETE_CHAT_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.get(`messages/delete/${id}`)
  };
}

export function resetDeleteChatMessageRequest() {
    return {
        type: RESET_DELETE_MESSAGE_REQUEST
    };
}

export function getGroup(id) {
  return {    
    types: [GET_GROUP, GET_GROUP_SUCCESS, GET_GROUP_FAIL],
    promise: (apiClient) => apiClient.get(`message-groups/${id}`)
  };
}

export function resetGetGroupRequest() {
    return {
        type: RESET_GET_GROUP_REQUEST
    };
}

export function getGroups(params = {}) {
  return {    
    types: [GET_GROUPS, GET_GROUPS_SUCCESS, GET_GROUPS_FAIL],
    promise: (apiClient) => apiClient.get(`message-groups`, params)
  };
}

export function createGroup(params = {}) {
  return {    
    types: [CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL],
    promise: (apiClient) => apiClient.put(`message-groups`, params)
  };
}

export function resetCreateGroupRequest() {
    return {
        type: RESET_CREATE_GROUP_REQUEST
    };
}

export function updateGroup(id, params = {}) {
  return {    
    types: [UPDATE_GROUP, UPDATE_GROUP_SUCCESS, UPDATE_GROUP_FAIL],
    promise: (apiClient) => apiClient.post(`message-groups/${id}`, params)
  };
}

export function resetUpdateGroupRequest() {
    return {
        type: RESET_UPDATE_GROUP_REQUEST
    };
}

export function deleteGroup(id) {
  return {    
    types: [DELETE_GROUP, DELETE_GROUP_SUCCESS, DELETE_GROUP_FAIL],
    promise: (apiClient) => apiClient.get(`message-groups/delete/${id}`)
  };
}

export function resetDeleteGroupRequest() {
    return {
        type: RESET_DELETE_GROUP_REQUEST
    };
}