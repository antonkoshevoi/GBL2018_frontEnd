export const GET_RECORDS = '[Courses] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Courses] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Courses] GET_RECORDS_FAIL';

export const CREATE = '[Courses] CREATE';
export const CREATE_SUCCESS = '[Courses] CREATE_SUCCESS';
export const CREATE_FAIL = '[Courses] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Courses] RESET_CREATE_ERRORS';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('Courses', params)
  };
}

export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('Courses', data, params)
  };
}

export function resetCreateRequest () {
  return {
    type: RESET_CREATE_REQUEST
  }
}