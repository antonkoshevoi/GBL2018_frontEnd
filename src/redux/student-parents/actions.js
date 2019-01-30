import { uri } from '../../helpers/uri';

export const GET_RECORDS = '[StudentParents] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[StudentParents] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[StudentParents] GET_RECORDS_FAIL';

export const GET_RECORD = '[StudentParents] GET_RECORD';
export const GET_RECORD_SUCCESS = '[StudentParents] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[StudentParents] GET_RECORD_FAIL';
export const RESET_GET_RECORD_REQUEST = '[StudentParents] RESET_GET_RECORD_REQUEST';

export const CREATE = '[StudentParents] CREATE';
export const CREATE_SUCCESS = '[StudentParents] CREATE_SUCCESS';
export const CREATE_FAIL = '[StudentParents] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[StudentParents] RESET_CREATE_ERRORS';

export const GET_STUDENTS = '[StudentParents] GET_STUDENTS';
export const GET_STUDENTS_SUCCESS = '[StudentParents] GET_STUDENTS_SUCCESS';
export const GET_STUDENTS_FAIL = '[StudentParents] GET_STUDENTS_FAIL';

export const GET_STUDENT_REQUESTS = '[StudentParents] GET_STUDENT_REQUESTS';
export const GET_STUDENT_REQUESTS_SUCCESS = '[StudentParents] GET_STUDENT_REQUESTS_SUCCESS';
export const GET_STUDENT_REQUESTS_FAIL = '[StudentParents] GET_STUDENT_REQUESTS_FAIL';

export const ACCEPT_STUDENT = '[StudentParents] ACCEPT_STUDENT';
export const ACCEPT_STUDENT_SUCCESS = '[StudentParents] ACCEPT_STUDENT_SUCCESS';
export const ACCEPT_STUDENT_FAIL = '[StudentParents] ACCEPT_STUDENT_FAIL';

export const ACCEPT_STUDENT_PUBLIC = '[StudentParents] ACCEPT_STUDENT_PUBLIC';
export const ACCEPT_STUDENT_PUBLIC_SUCCESS = '[StudentParents] ACCEPT_STUDENT_PUBLIC_SUCCESS';
export const ACCEPT_STUDENT_PUBLIC_FAIL = '[StudentParents] ACCEPT_STUDENT_PUBLIC_FAIL';

export const DECLINE_STUDENT = '[StudentParents] DECLINE_STUDENT';
export const DECLINE_STUDENT_SUCCESS = '[StudentParents] DECLINE_STUDENT_SUCCESS';
export const DECLINE_STUDENT_FAIL = '[StudentParents] DECLINE_STUDENT_FAIL';

export const DELETE_STUDENT_REQUST = '[StudentParents] DELETE_STUDENT_REQUST';
export const DELETE_STUDENT_REQUST_SUCCESS = '[StudentParents] DELETE_STUDENT_REQUST_SUCCESS';
export const DELETE_STUDENT_REQUST_FAIL = '[StudentParents] DELETE_STUDENT_REQUST_FAIL';
export const RESET_STUDENT_REQUEST = '[StudentParents] RESET_STUDENT_REQUEST';

export const SENT_STUDENT_REQUEST = '[StudentParents] SENT_STUDENT_REQUEST';
export const SENT_STUDENT_REQUEST_SUCCESS = '[StudentParents] SENT_STUDENT_REQUEST_SUCCESS';
export const SENT_STUDENT_REQUEST_FAIL = '[StudentParents] SENT_STUDENT_REQUEST_FAIL';
export const RESET_SENT_STUDENT_REQUEST = '[StudentParents] RESET_SENT_STUDENT_REQUEST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('student-parents', params)
  };
}

export function getRecord(id, params = {}) {
  return {
    types: [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`student-parents/${id}`, params)
  };
}

export function resetGetRecordRequest () {
  return {
    type: RESET_GET_RECORD_REQUEST
  }
}

export function getStudents(params = {}) {
  return {
    types: [GET_STUDENT_REQUESTS, GET_STUDENT_REQUESTS_SUCCESS, GET_STUDENT_REQUESTS_FAIL],
    promise: (apiClient) => apiClient.get('student-parents/students', params)
  };
}

export function getStudentRequests(params = {}) {
  return {
    types: [GET_STUDENT_REQUESTS, GET_STUDENT_REQUESTS_SUCCESS, GET_STUDENT_REQUESTS_FAIL],
    promise: (apiClient) => apiClient.get('student-parents/requests', params)
  };
}

export function acceptStudentRequest(id) {
  return {
    types: [ACCEPT_STUDENT, ACCEPT_STUDENT_SUCCESS, ACCEPT_STUDENT_FAIL],
    promise: (apiClient) => apiClient.get(`student-parents/request/accept/${id}`)
  };
}

export function acceptStudentRequestPublic(id, hash) {
  return {
    types: [ACCEPT_STUDENT_PUBLIC, ACCEPT_STUDENT_PUBLIC_SUCCESS, ACCEPT_STUDENT_PUBLIC_FAIL],
    promise: (apiClient) => apiClient.get(`student-parents/request/accept-public/${id}/${hash}`)
  };
}

export function declineStudentRequest(id) {
  return {
    types: [DECLINE_STUDENT, DECLINE_STUDENT_SUCCESS, DECLINE_STUDENT_FAIL],
    promise: (apiClient) => apiClient.get(`student-parents/request/decline/${id}`)
  };
}

export function deleteStudentRequest(id) {
  return {
    types: [DELETE_STUDENT_REQUST, DELETE_STUDENT_REQUST_SUCCESS, DELETE_STUDENT_REQUST_FAIL],
    promise: (apiClient) => apiClient.get(`student-parents/request/delete/${id}`)
  };
}

export function resetStudentRequest() {
  return {
    type: RESET_STUDENT_REQUEST
  }
}

export function resetSentStudentRequest() {
  return {
    type: RESET_SENT_STUDENT_REQUEST
  }
}

export function sentStudentRequest(params = {}) {
  return {
    types: [SENT_STUDENT_REQUEST, SENT_STUDENT_REQUEST_SUCCESS, SENT_STUDENT_REQUEST_FAIL],
    promise: (apiClient) => apiClient.post('student-parents/request', {...params, returnUrl: uri('students/accept')})
  };
}

export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('student-parents', data, params)
  };
}

export function resetCreateRequest () {
  return {
    type: RESET_CREATE_REQUEST
  }
}