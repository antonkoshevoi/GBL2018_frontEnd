export const GET_RECORDS = '[Invitations] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Invitations] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Invitations] GET_RECORDS_FAIL';

export const DELETE_RECORD = '[Invitations] DELETE_RECORD';
export const DELETE_RECORD_SUCCESS = '[Invitations] DELETE_RECORD_SUCCESS';
export const DELETE_RECORD_FAIL = '[Invitations] DELETE_RECORD_FAIL';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('invitations', params)
  };
}

export function deleteRecord(id, params = {}) {
  return {
    types: [DELETE_RECORD, DELETE_RECORD_SUCCESS, DELETE_RECORD_FAIL],
    promise: (apiClient) => apiClient.delete(`invitations/${id}`, params)
  };
}