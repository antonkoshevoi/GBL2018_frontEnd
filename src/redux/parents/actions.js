export const GET_RECORDS = '[Parents] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Parents] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Parents] GET_RECORDS_FAIL';

export const GET_STUDENTS = '[Parents] GET_STUDENTS';
export const GET_STUDENTS_SUCCESS = '[Parents] GET_STUDENTS_SUCCESS';
export const GET_STUDENTS_FAIL = '[Parents] GET_STUDENTS_FAIL';

export const GET_SINGLE_RECORD = '[Parents] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Parents] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Parents] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Parents] RESET_GET_SINGLE_RECORD_REQUEST';

export const CREATE = '[Parents] CREATE';
export const CREATE_SUCCESS = '[Parents] CREATE_SUCCESS';
export const CREATE_FAIL = '[Parents] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Parents] RESET_CREATE_ERRORS';

export const UPDATE = '[Parents] UPDATE';
export const UPDATE_SUCCESS = '[Parents] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Parents] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Parents] RESET_UPDATE_REQUEST';

export const DELETE = '[Parents] DELETE';
export const DELETE_SUCCESS = '[Parents] DELETE_SUCCESS';
export const DELETE_FAIL = '[Parents] DELETE_FAIL';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('parents', params)
  };
}

export function getStudents(id, params = {}) {
  return {
    types: [GET_STUDENTS, GET_STUDENTS_SUCCESS, GET_STUDENTS_FAIL],
    promise: (apiClient) => apiClient.get(`parents/students/${id}`, params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`parents/${id}`, params)
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
    promise: (apiClient) => apiClient.post('parents', data, params)
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
    promise: (apiClient) => apiClient.put(`parents/${id}`, data, params)
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
    promise: (apiClient) => apiClient.delete(`parents/${id}`, params)
  };
}