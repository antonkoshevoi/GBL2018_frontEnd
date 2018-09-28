export const SUBSCRIBE = '[Messages] SUBSCRIBE';
export const SUBSCRIBE_FAIL = '[Messages] SUBSCRIBE_FAIL';

export const GET_THREADS = '[Messages] GET_THREADS';
export const GET_THREADS_SUCCESS = '[Messages] GET_THREADS_SUCCESS';
export const GET_THREADS_FAIL = '[Messages] GET_THREADS_FAIL';

export const CREATE_NEW_THREAD = '[Messages] CREATE_NEW_THREAD';
export const CREATE_NEW_THREAD_SUCCESS = '[Messages] CREATE_NEW_THREAD_SUCCESS';
export const CREATE_NEW_THREAD_FAIL = '[Messages] CREATE_NEW_THREAD_FAIL';

export const SEND_NEW_MESSAGE = '[Messages] SEND_NEW_MESSAGE';
export const SEND_NEW_MESSAGE_SUCCESS = '[Messages] SEND_NEW_MESSAGE_SUCCESS';
export const SEND_NEW_MESSAGE_FAIL = '[Messages] SEND_NEW_MESSAGE_FAIL';

export const SEND_MESSAGE = '[Messages] SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = '[Messages] SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = '[Messages] SEND_MESSAGE_FAIL';

export const NEW_THREAD_CREATED = '[Messages] NEW_THREAD_CREATED';
export const NEW_MESSAGE_RECEIVED = '[Messages] NEW_MESSAGE_RECEIVED';

export const GET_AVAILABLE_USERS = '[Messages] GET_AVAILABLE_USERS';
export const GET_AVAILABLE_USERS_SUCCESS = '[Messages] GET_AVAILABLE_USERS_SUCCESS';
export const GET_AVAILABLE_USERS_FAIL = '[Messages] GET_AVAILABLE_USERS_FAIL';

export function subscribe (userId) {
  return {
    type: SUBSCRIBE,
    userId
  }
}

/**
 * Get threads
 */
export function getThreads(params = {}) {
  return {
    types: [GET_THREADS, GET_THREADS_SUCCESS, GET_THREADS_FAIL],
    promise: (apiClient) => apiClient.get('user/threads', params)
  };
}

/**
 * create thread
 */
export function createNewThread(userId, messageBody) {
  return {
    userId, messageBody,
    types: [CREATE_NEW_THREAD, CREATE_NEW_THREAD_SUCCESS, CREATE_NEW_THREAD_FAIL],
    promise: (apiClient) => apiClient.post(`user/threads/${userId}`, { message: messageBody })
  };
}

/**
 * send message
 */
export function sendNewMessage(threadId, messageBody) {
  return {
    threadId, messageBody,
    types: [SEND_NEW_MESSAGE, SEND_NEW_MESSAGE_SUCCESS, SEND_NEW_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.post(`user/messages/${threadId}`, { message: messageBody })
  };
}

export function getAvailableUsers(keyword = '') {
  return {
    types: [GET_AVAILABLE_USERS, GET_AVAILABLE_USERS_SUCCESS, GET_AVAILABLE_USERS_FAIL],
    promise: (apiClient) => apiClient.get(`user/messages/availableUsers`, { filter: { username: keyword } })
  };
}

export function sendMessage(params = {}) {
  return {    
    types: [SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.post(`messages/send`, params)
  };
}

