import ApiClient from '../../services/ApiClient';

export const GET_RECORDS = '[Students] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Students] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Students] GET_RECORDS_FAIL';

export const GET_SINGLE_RECORD = '[Students] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Students] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Students] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Students] RESET_GET_SINGLE_RECORD_REQUEST';

export const CREATE = '[Students] CREATE';
export const CREATE_SUCCESS = '[Students] CREATE_SUCCESS';
export const CREATE_FAIL = '[Students] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Students] RESET_CREATE_ERRORS';

export const UPDATE = '[Students] UPDATE';
export const UPDATE_SUCCESS = '[Students] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Students] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Students] RESET_UPDATE_REQUEST';

export const BULK_UPLOAD = '[Students] BULK_UPLOAD';
export const BULK_UPLOAD_PROGRESS = '[Students] BULK_UPLOAD_PROGRESS';
export const BULK_UPLOAD_SUCCESS = '[Students] BULK_UPLOAD_SUCCESS';
export const BULK_UPLOAD_FAIL = '[Students] BULK_UPLOAD_FAIL';
export const RESET_BULK_UPLOAD_REQUEST = '[Students] RESET_BULK_UPLOAD_REQUEST';

export const DELETE = '[Students] DELETE';
export const DELETE_SUCCESS = '[Students] DELETE_SUCCESS';
export const DELETE_FAIL = '[Students] DELETE_FAIL';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('students', params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`students/${id}`, params)
  };
}
export function resetGetSingleRecordRequest () {
  return {
    type: RESET_GET_SINGLE_RECORD_REQUEST
  }
}
/**
 * Create
 */
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
/**
 * Update
 */
export function update(id, data, params = {}) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (apiClient) => apiClient.put(`students/${id}`, data, params)
  };
}
export function resetUpdateRequest () {
  return {
    type: RESET_UPDATE_REQUEST
  }
}
/**
 * Bulk upload
 */
export function bulkUpload(file, data, params = {}) {
  const source = ApiClient.cancelToken();

  return {
    upload: true,
    types: [BULK_UPLOAD, BULK_UPLOAD_SUCCESS, BULK_UPLOAD_FAIL, BULK_UPLOAD_PROGRESS],
    promise: (apiClient) => apiClient.upload(`students/bulk`, file, data, params, {}, {
      cancelToken: source.token
    }),
    cancel: source.cancel
  };
}
export function resetBulkUploadRequest () {
  return {
    type: RESET_BULK_UPLOAD_REQUEST
  }
}
/**
 * Delete
 */
export function deleteRecord(id, params = {}) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (apiClient) => apiClient.delete(`students/${id}`, params)
  };
}