export const GET_RECORDS = '[Subscription] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Subscription] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Subscription] GET_RECORDS_FAIL';

export const GET_RECORD = '[Subscription] GET_RECORD';
export const GET_RECORD_SUCCESS = '[Subscription] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[Subscription] GET_RECORD_FAIL';
export const RESET_GET_RECORD_REQUEST = '[Subscription] RESET_GET_RECORD_REQUEST';

export const SUBSCRIBE = '[Subscription] SUBSCRIBE';
export const SUBSCRIBE_SUCCESS = '[Subscription] SUBSCRIBE_SUCCESS';
export const SUBSCRIBE_FAIL = '[Subscription] SUBSCRIBE_FAIL';
export const RESET_SUBSCRIBE_REQUEST = '[Subscription] RESET_SUBSCRIBE_REQUEST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('subscriptions', params)
  };
}

export function getRecord(id) {
  return {
    types: [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`subscriptions/detail/${id}`)
  };
}

export function resetGetRecordRequest () {
  return {
    type: RESET_GET_RECORD_REQUEST
  }
}

export function subscribe(params = {}) {
  return {
    types: [SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAIL],
    promise: (apiClient) => apiClient.post('subscriptions/subscribe', params)
  };
}

export function resetSubscribeRequest () {
  return {
    type: RESET_SUBSCRIBE_REQUEST
  }
}