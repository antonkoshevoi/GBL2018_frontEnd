export const GET_RECORDS = '[Students] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Students] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Students] GET_RECORDS_FAIL';

export const GET_SCHOOLS = '[Students] GET_SCHOOLS';
export const GET_SCHOOLS_SUCCESS = '[Students] GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAIL = '[Students] GET_SCHOOLS_FAIL';

export const CREATE = '[Students] CREATE';
export const CREATE_SUCCESS = '[Students] CREATE_SUCCESS';
export const CREATE_FAIL = '[Students] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Students] RESET_CREATE_ERRORS';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('students', params)
  };
}

export function getSchools(params = {}) {
  return {
    types: [GET_SCHOOLS, GET_SCHOOLS_SUCCESS, GET_SCHOOLS_FAIL],
    promise: (apiClient) => apiClient.get('schools', Object.assign({}, params, {
      // perPage: 0
    }))
  };
}

export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('students', data, params)
  };
}

export function resetCreateRequest () {
  return {
    type: RESET_CREATE_REQUEST
  }
}