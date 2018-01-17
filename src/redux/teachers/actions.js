export const GET_RECORDS = '[Teachers] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Teachers] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Teachers] GET_RECORDS_FAIL';

export const GET_SINGLE_RECORD = '[Teachers] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Teachers] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Teachers] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Teachers] RESET_GET_SINGLE_RECORD_REQUEST';

export const GET_SCHOOLS = '[Teachers] GET_SCHOOLS';
export const GET_SCHOOLS_SUCCESS = '[Teachers] GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAIL = '[Teachers] GET_SCHOOLS_FAIL';

export const CREATE = '[Teachers] CREATE';
export const CREATE_SUCCESS = '[Teachers] CREATE_SUCCESS';
export const CREATE_FAIL = '[Teachers] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Teachers] RESET_CREATE_ERRORS';

export const UPDATE = '[Teachers] UPDATE';
export const UPDATE_SUCCESS = '[Teachers] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Teachers] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Teachers] RESET_UPDATE_REQUEST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('teachers', params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`teachers/${id}`, params)
  };
}
export function resetGetSingleRecordRequest () {
  return {
    type: RESET_GET_SINGLE_RECORD_REQUEST
  }
}
/**
 * Get schools
 */
export function getSchools(params = {}) {
  return {
    types: [GET_SCHOOLS, GET_SCHOOLS_SUCCESS, GET_SCHOOLS_FAIL],
    promise: (apiClient) => apiClient.get('schools', Object.assign({}, params, {
      perPage: 0
    }))
  };
}
/**
 * Create
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('teachers', data, params)
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
    promise: (apiClient) => apiClient.put(`teachers/${id}`, data, params)
  };
}
export function resetUpdateRequest () {
  return {
    type: RESET_UPDATE_REQUEST
  }
}