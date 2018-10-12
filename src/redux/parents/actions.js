export const GET_RECORDS = '[Parents] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Parents] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Parents] GET_RECORDS_FAIL';

export const GET_RECORD = '[Parents] GET_RECORD';
export const GET_RECORD_SUCCESS = '[Parents] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[Parents] GET_RECORD_FAIL';
export const RESET_GET_RECORD_REQUEST = '[Parents] RESET_GET_RECORD_REQUEST';

export const CREATE = '[Parents] CREATE';
export const CREATE_SUCCESS = '[Parents] CREATE_SUCCESS';
export const CREATE_FAIL = '[Parents] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Parents] RESET_CREATE_ERRORS';

export const GET_STUDENT_REQUESTS = '[Parents] GET_STUDENT_REQUESTS';
export const GET_STUDENT_REQUESTS_SUCCESS = '[Parents] GET_STUDENT_REQUESTS_SUCCESS';
export const GET_STUDENT_REQUESTS_FAIL = '[Parents] GET_STUDENT_REQUESTS_FAIL';

export const ACCEPT_STUDENT = '[Parents] ACCEPT_STUDENT';
export const ACCEPT_STUDENT_SUCCESS = '[Parents] ACCEPT_STUDENT_SUCCESS';
export const ACCEPT_STUDENT_FAIL = '[Parents] ACCEPT_STUDENT_FAIL';

export const DECLINE_STUDENT = '[Parents] DECLINE_STUDENT';
export const DECLINE_STUDENT_SUCCESS = '[Parents] DECLINE_STUDENT_SUCCESS';
export const DECLINE_STUDENT_FAIL = '[Parents] DECLINE_STUDENT_FAIL';

export const DELETE_STUDENT_REQUST = '[Parents] DELETE_STUDENT_REQUST';
export const DELETE_STUDENT_REQUST_SUCCESS = '[Parents] DELETE_STUDENT_REQUST_SUCCESS';
export const DELETE_STUDENT_REQUST_FAIL = '[Parents] DELETE_STUDENT_REQUST_FAIL';

export const SENT_STUDENT_REQUEST = '[Parents] SENT_STUDENT_REQUEST';
export const SENT_STUDENT_REQUEST_SUCCESS = '[Parents] SENT_STUDENT_REQUEST_SUCCESS';
export const SENT_STUDENT_REQUEST_FAIL = '[Parents] SENT_STUDENT_REQUEST_FAIL';

export const RESET_STUDENT_REQUEST = '[Parents] RESET_STUDENT_REQUEST';

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

export function getStudentRequests(params = {}) {
  return {
    types: [GET_STUDENT_REQUESTS, GET_STUDENT_REQUESTS_SUCCESS, GET_STUDENT_REQUESTS_FAIL],
    promise: (apiClient) => apiClient.get('parents/requests', params)
  };
}

export function acceptStudentRequest(id) {
  return {
    types: [ACCEPT_STUDENT, ACCEPT_STUDENT_SUCCESS, ACCEPT_STUDENT_FAIL],
    promise: (apiClient) => apiClient.get(`parents/request/accept/${id}`)
  };
}

export function declineStudentRequest(id) {
  return {
    types: [DECLINE_STUDENT, DECLINE_STUDENT_SUCCESS, DECLINE_STUDENT_FAIL],
    promise: (apiClient) => apiClient.get(`parents/request/decline/${id}`)
  };
}

export function deleteStudentRequest(id) {
  return {
    types: [DELETE_STUDENT_REQUST, DELETE_STUDENT_REQUST_SUCCESS, DELETE_STUDENT_REQUST_FAIL],
    promise: (apiClient) => apiClient.get(`parents/request/delete/${id}`)
  };
}

export function resetStudentRequest() {
  return {
    type: RESET_STUDENT_REQUEST
  }
}

export function sentStudentRequest(params = {}) {
  return {
    types: [SENT_STUDENT_REQUEST, SENT_STUDENT_REQUEST_SUCCESS, SENT_STUDENT_REQUEST_FAIL],
    promise: (apiClient) => apiClient.post('parents/request', params)
  };
}

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