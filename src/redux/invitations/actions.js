import { uri } from '../../helpers/uri';

export const GET_RECORDS = '[Invitations] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Invitations] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Invitations] GET_RECORDS_FAIL';

export const GET_SINGLE_RECORD = '[Invitations] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Invitations] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Invitations] GET_SINGLE_RECORD_FAIL';

export const DELETE_RECORD = '[Invitations] DELETE_RECORD';
export const DELETE_RECORD_SUCCESS = '[Invitations] DELETE_RECORD_SUCCESS';
export const DELETE_RECORD_FAIL = '[Invitations] DELETE_RECORD_FAIL';

export const CREATE = '[Invitations] CREATE';
export const CREATE_SUCCESS = '[Invitations] CREATE_SUCCESS';
export const CREATE_FAIL = '[Invitations] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Invitations] RESET_CREATE_ERRORS';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('invitations', params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, hash, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`invitations/${id}/${hash}`, params)
  };
}

export function deleteRecord(id, params = {}) {
  return {
    types: [DELETE_RECORD, DELETE_RECORD_SUCCESS, DELETE_RECORD_FAIL],
    promise: (apiClient) => apiClient.delete(`invitations/${id}`, params)
  };
}
/**
 * Create
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('invitations', {
      ...data,
      returnUrl: uri('invitations/details')
    }, params)
  };
}
export function resetCreateRequest () {
  return {
    type: RESET_CREATE_REQUEST
  }
}