export const GET_RECORDS = '[Gifts] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Gifts] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Gifts] GET_RECORDS_FAIL';

export const GET_RECORD = '[Gifts] GET_RECORD';
export const GET_RECORD_SUCCESS = '[Gifts] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[Gifts] GET_RECORD_FAIL';
export const RESET_GET_RECORD_REQUEST = '[Gifts] RESET_GET_RECORD_REQUEST';

export const GIFT = '[Gifts] GIFT';
export const GIFT_COURSE_SUCCESS = '[Gifts] GIFT_COURSE_SUCCESS';
export const GIFT_SUBSCRIPTION_SUCCESS = '[Gifts] GIFT_SUBSCRIPTION_SUCCESS';
export const GIFT_FAIL = '[Gifts] GIFT_FAIL';
export const RESET_GIFT_REQUST = '[Gifts] RESET_GIFT_REQUST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('unassigned-items', params)
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

export function resetGiftRequest() {
  return {
    type: RESET_GIFT_REQUST
  };
}