export const GET_RECORDS = '[Homerooms] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Homerooms] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Homerooms] GET_RECORDS_FAIL';

export const GET_SINGLE_RECORD = '[Homerooms] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Homerooms] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Homerooms] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Homerooms] RESET_GET_SINGLE_RECORD_REQUEST';

export const CREATE = '[Homerooms] CREATE';
export const CREATE_SUCCESS = '[Homerooms] CREATE_SUCCESS';
export const CREATE_FAIL = '[Homerooms] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Homerooms] RESET_CREATE_ERRORS';

export const UPDATE = '[Homerooms] UPDATE';
export const UPDATE_SUCCESS = '[Homerooms] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Homerooms] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Homerooms] RESET_UPDATE_REQUEST';

export const DELETE = '[Homerooms] DELETE';
export const DELETE_SUCCESS = '[Homerooms] DELETE_SUCCESS';
export const DELETE_FAIL = '[Homerooms] DELETE_FAIL';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('homeroom', params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`homeroom/${id}`, params)
  };
}
export function resetGetSingleRecordRequest () {
  return {
    type: RESET_GET_SINGLE_RECORD_REQUEST
  }
}
/**
 * Create
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('homeroom', data, params)
  };
}
export function resetCreateRequest () {
  return {
    type: RESET_CREATE_REQUEST
  }
}
/**
 * Update
 */
export function update(id, data, params = {}) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (apiClient) => apiClient.put(`homeroom/${id}`, data, params)
  };
}
export function resetUpdateRequest () {
  return {
    type: RESET_UPDATE_REQUEST
  }
}
/**
 * Delete
 */
export function deleteRecord(id, params = {}) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (apiClient) => apiClient.delete(`homeroom/${id}`, params)
  };
}