import { uri } from '../../helpers/uri';

export const GET_RECORDS = '[Connections] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Connections] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Connections] GET_RECORDS_FAIL';

export const GET_RECORD = '[Connections] GET_RECORD';
export const GET_RECORD_SUCCESS = '[Connections] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[Connections] GET_RECORD_FAIL';
export const RESET_GET_RECORD_REQUEST = '[Connections] RESET_GET_RECORD_REQUEST';

export const CREATE = '[Connections] CREATE';
export const CREATE_SUCCESS = '[Connections] CREATE_SUCCESS';
export const CREATE_FAIL = '[Connections] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Connections] RESET_CREATE_REQUEST';

export const ACCEPT = '[Connections] ACCEPT';
export const ACCEPT_SUCCESS = '[Connections] ACCEPT_SUCCESS';
export const ACCEPT_FAIL = '[Connections] ACCEPT_FAIL';

export const ACCEPT_PUBLIC = '[Connections] ACCEPT_PUBLIC';
export const ACCEPT_PUBLIC_SUCCESS = '[Connections] ACCEPT_PUBLIC_SUCCESS';
export const ACCEPT_PUBLIC_FAIL = '[Connections] ACCEPT_PUBLIC_FAIL';

export const DECLINE = '[Connections] DECLINE';
export const DECLINE_SUCCESS = '[Connections] DECLINE_SUCCESS';
export const DECLINE_FAIL = '[Connections] DECLINE_FAIL';

export const RESET_CHANGE_STATUS_REQUEST = '[Connections] RESET_CHANGE_STATUS_REQUEST';

export const DELETE = '[Connections] DELETE';
export const DELETE_SUCCESS = '[Connections] DELETE_SUCCESS';
export const DELETE_FAIL = '[Connections] DELETE_FAIL';
export const RESET_DELETE_REQUEST = '[Connections] RESET_DELETE_REQUEST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('parents', params)
  };
}

export function getRecord(id, params = {}) {
  return {
    types: [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`parents/${id}`, params)
  };
}

export function resetGetRecordRequest () {
  return {
    type: RESET_GET_RECORD_REQUEST
  }
}

export function accept(id) {
  return {
    types: [ACCEPT, ACCEPT_SUCCESS, ACCEPT_FAIL],
    promise: (apiClient) => apiClient.get(`connections/accept/${id}`)
  };
}

export function acceptPublic(id, hash) {
  return {
    types: [ACCEPT_PUBLIC, ACCEPT_PUBLIC_SUCCESS, ACCEPT_PUBLIC_FAIL],
    promise: (apiClient) => apiClient.get(`connections/accept-public/${id}/${hash}`)
  };
}

export function decline(id) {
  return {
    types: [DECLINE, DECLINE_SUCCESS, DECLINE_FAIL],
    promise: (apiClient) => apiClient.get(`connections/decline/${id}`)
  };
}

export function resetChangeStatusRequest() {
  return {
    type: RESET_CHANGE_STATUS_REQUEST
  }
}

export function deleteRecord(id) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (apiClient) => apiClient.get(`connections/delete/${id}`)
  };
}

export function resetDeleteRequest() {
  return {
    type: RESET_DELETE_REQUEST
  }
}

export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('parents', {...data, returnUrl: uri('connections/accept')}, params)
  };
}

export function resetCreateRequest () {
  return {
    type: RESET_CREATE_REQUEST
  }
}