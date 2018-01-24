export const SUBSCRIBE = '[Messages] SUBSCRIBE';
export const SUBSCRIBE_FAIL = '[Messages] SUBSCRIBE_FAIL';

export const GET_THREADS = '[Messages] GET_THREADS';
export const GET_THREADS_SUCCESS = '[Messages] GET_THREADS_SUCCESS';
export const GET_THREADS_FAIL = '[Messages] GET_THREADS_FAIL';

export const SELECT_THREAD = '[Messages] SELECT_THREAD';

export const SEND_NEW_MESSAGE = '[Messages] SEND_NEW_MESSAGE';
export const SEND_NEW_MESSAGE_SUCCESS = '[Messages] SEND_NEW_MESSAGE_SUCCESS';
export const SEND_NEW_MESSAGE_FAIL = '[Messages] SEND_NEW_MESSAGE_FAIL';

export const NEW_MESSAGE_RECEIVED = '[Messages] NEW_MESSAGE_RECEIVED';

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
 * set selected thread
 */
export function selectThread(id) {
  return {
    type: SELECT_THREAD,
    id
  };
}

/**
 * send message
 */
export function sendNewMessage(threadId, message) {
  return {
    types: [SEND_NEW_MESSAGE, SEND_NEW_MESSAGE_SUCCESS, SEND_NEW_MESSAGE_FAIL],
    promise: (apiClient) => apiClient.post(`user/messages/${threadId}`, { message })
  };
}