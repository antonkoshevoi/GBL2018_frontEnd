export const GET_RECORDS = '[Surveys] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Surveys] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Surveys] GET_RECORDS_FAIL';

export const GET_RECORD = '[Surveys] GET_RECORD';
export const GET_RECORD_SUCCESS = '[Surveys] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[Surveys] GET_RECORD_FAIL';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('surveys', params)
  };
}

export function getRecord(id) {
  return {
    types: [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`surveys/detail/${id}`)
  };
}
