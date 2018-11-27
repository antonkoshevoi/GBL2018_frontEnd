export const GET_RECORDS = '[Gifts] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Gifts] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Gifts] GET_RECORDS_FAIL';

export const GET_RECORD = '[Gifts] GET_RECORD';
export const GET_RECORD_SUCCESS = '[Gifts] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[Gifts] GET_RECORD_FAIL';
export const RESET_GET_RECORD_REQUEST = '[Gifts] RESET_GET_RECORD_REQUEST';

export const DELETE = '[Gifts] DELETE';
export const DELETE_SUCCESS = '[Gifts] DELETE_SUCCESS';
export const DELETE_FAIL = '[Gifts] DELETE_FAIL';
export const RESET_DELETE_REQUEST = '[Gifts] RESET_DELETE_REQUEST';

export const ACCEPT = '[Gifts] ACCEPT';
export const ACCEPT_SUCCESS = '[Gifts] ACCEPT_SUCCESS';
export const ACCEPT_FAIL = '[Gifts] ACCEPT_FAIL';

export const DECLINE = '[Gifts] DECLINE';
export const DECLINE_SUCCESS = '[Gifts] DECLINE_SUCCESS';
export const DECLINE_FAIL = '[Gifts] DECLINE_FAIL';
export const RESET_CHANGE_STATUS_REQUEST = '[Gifts] RESET_CHANGE_STATUS_REQUEST';

export const GIFT = '[Gifts] GIFT';
export const GIFT_COURSE_SUCCESS = '[Gifts] GIFT_COURSE_SUCCESS';
export const GIFT_SUBSCRIPTION_SUCCESS = '[Gifts] GIFT_SUBSCRIPTION_SUCCESS';
export const GIFT_FAIL = '[Gifts] GIFT_FAIL';
export const RESET_GIFT_REQUEST = '[Gifts] RESET_GIFT_REQUEST';

export const PUBLIC_GIFT = '[Gifts] PUBLIC_GIFT';
export const PUBLIC_GIFT_SUCCESS = '[Gifts] PUBLIC_GIFT_SUCCESS';
export const PUBLIC_GIFT_FAIL = '[Gifts] PUBLIC_GIFT_FAIL';
export const RESET_PUBLIC_GIFT_REQUEST = '[Gifts] RESET_PUBLIC_GIFT_REQUEST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('gifts', params)
  };
}

export function getRecord(id) {
  return {
    types: [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`gifts/${id}`)
  };
}

export function giftCourseCredit(params = {}) {
  params.type = 'course';
  return {
    types: [GIFT, GIFT_COURSE_SUCCESS, GIFT_FAIL],
    promise: (apiClient) => apiClient.post('gifts', params)
  };
}

export function giftSubscription(params = {}) {
  params.type = 'subscription';
  return {
    types: [GIFT, GIFT_SUBSCRIPTION_SUCCESS, GIFT_FAIL],
    promise: (apiClient) => apiClient.post('gifts', params)
  };
}

export function giftPublic(params = {}) {  
  return {
    types: [PUBLIC_GIFT, PUBLIC_GIFT_SUCCESS, PUBLIC_GIFT_FAIL],
    promise: (apiClient) => apiClient.post('gifts/public', params)
  };
}

export function resetGiftRequest() {
  return {
    type: RESET_GIFT_REQUEST
  };
}

export function resetPublicGiftRequest() {
  return {
    type: RESET_PUBLIC_GIFT_REQUEST
  };
}

export function deleteRecord(id) {  
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (apiClient) => apiClient.delete(`gifts/${id}`)
  };
}

export function resetDeleteRequest() {
  return {
    type: RESET_DELETE_REQUEST
  };
}

export function accept(id) {  
  return {
    types: [ACCEPT, ACCEPT_SUCCESS, ACCEPT_FAIL],
    promise: (apiClient) => apiClient.delete(`gifts/accept/${id}`)
  };
}

export function decline(id) {  
  return {
    types: [DECLINE, DECLINE_SUCCESS, DECLINE_FAIL],
    promise: (apiClient) => apiClient.delete(`gifts/decline/${id}`)
  };
}

export function resetChangeStatusRequest() {
  return {
    type: RESET_CHANGE_STATUS_REQUEST
  }
}