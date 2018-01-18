export const GET_RECORDS = '[Administration] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Administration] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Administration] GET_RECORDS_FAIL';

export const GET_SINGLE_RECORD = '[Administration] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Administration] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Administration] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Administration] RESET_GET_SINGLE_RECORD_REQUEST';

export const GET_SCHOOLS = '[Administration] GET_SCHOOLS';
export const GET_SCHOOLS_SUCCESS = '[Administration] GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAIL = '[Administration] GET_SCHOOLS_FAIL';

export const GET_ROLES = '[Administration] GET_ROLES';
export const GET_ROLES_SUCCESS = '[Administration] GET_ROLES_SUCCESS';
export const GET_ROLES_FAIL = '[Administration] GET_ROLES_FAIL';

export const CREATE = '[Administration] CREATE';
export const CREATE_SUCCESS = '[Administration] CREATE_SUCCESS';
export const CREATE_FAIL = '[Administration] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Administration] RESET_CREATE_ERRORS';

export const UPDATE = '[Administration] UPDATE';
export const UPDATE_SUCCESS = '[Administration] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Administration] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Administration] RESET_UPDATE_REQUEST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('administration', params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`administration/${id}`, params)
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
 * Get roles
 */
export function getRoles(params = {}) {
    return {
        types: [GET_ROLES, GET_ROLES_SUCCESS, GET_ROLES_SUCCESS],
        promise: (apiClient) => apiClient.get('roles', Object.assign({}, params, {
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
    promise: (apiClient) => apiClient.post('administration', data, params)
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
    promise: (apiClient) => apiClient.put(`administration/${id}`, data, params)
  };
}
export function resetUpdateRequest () {
  return {
    type: RESET_UPDATE_REQUEST
  }
}