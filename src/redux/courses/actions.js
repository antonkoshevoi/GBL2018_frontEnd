export const GET_UNASSIGNED_RECORDS = '[Courses] GET_UNASSIGNED_RECORDS';
export const GET_UNASSIGNED_RECORDS_SUCCESS = '[Courses] GET_UNASSIGNED_RECORDS_SUCCESS';
export const GET_UNASSIGNED_RECORDS_FAIL = '[Courses] GET_UNASSIGNED_RECORDS_FAIL';

export const GET_STORE_RECORDS = '[Courses] GET_STORE_RECORDS';
export const GET_STORE_RECORDS_SUCCESS = '[Courses] GET_STORE_RECORDS_SUCCESS';
export const GET_STORE_RECORDS_FAIL = '[Courses] GET_STORE_RECORDS_FAIL';

export function getUnassignedRecords(params = {}) {
  return {
    types: [GET_UNASSIGNED_RECORDS, GET_UNASSIGNED_RECORDS_SUCCESS, GET_UNASSIGNED_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('courses/unassigneds', params)
  };
}

export function getStoreRecords(params = {}) {
  return {
    types: [GET_STORE_RECORDS, GET_STORE_RECORDS_SUCCESS, GET_STORE_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('courses/store', params)
  };
}

