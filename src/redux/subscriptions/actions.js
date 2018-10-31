export const GET_RECORDS = '[Subscription] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Subscription] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Subscription] GET_RECORDS_FAIL';

export const GET_USER_RECORDS = '[Subscription] GET_USER_RECORDS';
export const GET_USER_RECORDS_SUCCESS = '[Subscription] GET_USER_RECORDS_SUCCESS';
export const GET_USER_RECORDS_FAIL = '[Subscription] GET_USER_RECORDS_FAIL';
export const RESET_GET_USER_RECORDS_REQUEST = '[Subscription] RESET_GET_USER_RECORDS_REQUEST';

export const GET_STUDENTS_RECORDS = '[Subscription] GET_STUDENTS_RECORDS';
export const GET_STUDENTS_RECORDS_SUCCESS = '[Subscription] GET_STUDENTS_RECORDS_SUCCESS';
export const GET_STUDENTS_RECORDS_FAIL = '[Subscription] GET_STUDENTS_RECORDS_FAIL';

export const GET_RECORD = '[Subscription] GET_RECORD';
export const GET_RECORD_SUCCESS = '[Subscription] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[Subscription] GET_RECORD_FAIL';
export const RESET_GET_RECORD_REQUEST = '[Subscription] RESET_GET_RECORD_REQUEST';

export const SUBSCRIBE = '[Subscription] SUBSCRIBE';
export const SUBSCRIBE_SUCCESS = '[Subscription] SUBSCRIBE_SUCCESS';
export const SUBSCRIBE_FAIL = '[Subscription] SUBSCRIBE_FAIL';
export const RESET_SUBSCRIBE_REQUEST = '[Subscription] RESET_SUBSCRIBE_REQUEST';

export const UNSUBSCRIBE = '[Subscription] UNSUBSCRIBE';
export const UNSUBSCRIBE_SUCCESS = '[Subscription] UNSUBSCRIBE_SUCCESS';
export const UNSUBSCRIBE_FAIL = '[Subscription] UNSUBSCRIBE_FAIL';
export const RESET_UNSUBSCRIBE_REQUEST = '[Subscription] RESET_UNSUBSCRIBE_REQUEST';

export const GET_INVOICE = '[Subscription] GET_INVOICE';
export const GET_INVOICE_SUCCESS = '[Subscription] GET_INVOICE_SUCCESS';
export const GET_INVOICE_FAIL = '[Subscription] GET_INVOICE_FAIL';

export const SUBSCRIBE_STUDENT = '[Subscription] SUBSCRIBE_STUDENT';
export const SUBSCRIBE_STUDENT_SUCCESS = '[Subscription] SUBSCRIBE_STUDENT_SUCCESS';
export const SUBSCRIBE_STUDENT_FAIL = '[Subscription] SUBSCRIBE_STUDENT_FAIL';
export const RESET_SUBSCRIBE_STUDENT_REQUEST = '[Subscription] RESET_SUBSCRIBE_STUDENT_REQUEST';

export const UNSUBSCRIBE_STUDENT = '[Subscription] UNSUBSCRIBE_STUDENT';
export const UNSUBSCRIBE_STUDENT_SUCCESS = '[Subscription] UNSUBSCRIBE_STUDENT_SUCCESS';
export const UNSUBSCRIBE_STUDENT_FAIL = '[Subscription] UNSUBSCRIBE_STUDENT_FAIL';
export const RESET_UNSUBSCRIBE_STUDENT_REQUEST = '[Subscription] RESET_UNSUBSCRIBE_STUDENT_REQUEST';

export const GET_PAYMENTS = '[Subscription] GET_PAYMENTS';
export const GET_PAYMENTS_SUCCESS = '[Subscription] GET_PAYMENTS_SUCCESS';
export const GET_PAYMENTS_FAIL = '[Subscription] GET_PAYMENTS_FAIL';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('subscriptions', params)
  };
}

export function getUserRecords(params = {}) {
  return {
    types: [GET_USER_RECORDS, GET_USER_RECORDS_SUCCESS, GET_USER_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('subscriptions/user', params)
  };
}

export function resetGetUserRecordsRequest () {
  return {
    type: RESET_GET_USER_RECORDS_REQUEST
  }
}

export function getRecord(id) {
  return {
    types: [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`subscriptions/detail/${id}`)
  };
}

export function resetGetRecordRequest () {
  return {
    type: RESET_GET_RECORD_REQUEST
  }
}

export function subscribe(params = {}) {
  return {
    types: [SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAIL],
    promise: (apiClient) => apiClient.post('subscriptions/subscribe', params)
  };
}

export function resetSubscribeRequest () {
  return {
    type: RESET_SUBSCRIBE_REQUEST
  }
}

export function getInvoice(id, params = {}) {
  return {
    types: [GET_INVOICE, GET_INVOICE_SUCCESS, GET_INVOICE_FAIL],
    promise: (apiClient) => apiClient.get(`subscriptions/invoice/${id}`, params)
  };
}

export function subscribeStudent(params = {}) {
  return {
    types: [SUBSCRIBE_STUDENT, SUBSCRIBE_STUDENT_SUCCESS, SUBSCRIBE_STUDENT_FAIL],
    promise: (apiClient) => apiClient.post('subscriptions/assign-student', params)
  };
}

export function resetSubscribeStudentRequest(params = {}) {
  return {
    type: RESET_SUBSCRIBE_STUDENT_REQUEST
  }
}

export function unSubscribeStudent(id, params = {}) {
  return {
    types: [UNSUBSCRIBE_STUDENT, UNSUBSCRIBE_STUDENT_SUCCESS, UNSUBSCRIBE_STUDENT_FAIL],
    promise: (apiClient) => apiClient.get(`subscriptions/unassign-student/${id}`, params)
  };
}

export function resetUnSubscribeStudentRequest(params = {}) {
  return {
    type: RESET_UNSUBSCRIBE_STUDENT_REQUEST
  }
}

export function getStudentsRecords(id, params = {}) {
  return {
    types: [GET_STUDENTS_RECORDS, GET_STUDENTS_RECORDS_SUCCESS, GET_STUDENTS_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get(`subscriptions/students/${id}`, params)
  };
}

export function unSubscribe(id, params = {}) {
  return {
    types: [UNSUBSCRIBE, UNSUBSCRIBE_SUCCESS, UNSUBSCRIBE_FAIL],
    promise: (apiClient) => apiClient.get(`subscriptions/cancel-subscribtion/${id}`, params)
  };
}

export function resetUnSubscribeRequest () {
  return {
    type: RESET_UNSUBSCRIBE_REQUEST
  }
}

export function getPayments(params = {}) {
  return {
    types: [GET_PAYMENTS, GET_PAYMENTS_SUCCESS, GET_PAYMENTS_FAIL],
    promise: (apiClient) => apiClient.get('subscriptions/payments', params)
  };
}

