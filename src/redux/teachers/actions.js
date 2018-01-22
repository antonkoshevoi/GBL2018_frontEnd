import ApiClient from '../../services/ApiClient';

export const GET_RECORDS = '[Teachers] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Teachers] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Teachers] GET_RECORDS_FAIL';

export const GET_SINGLE_RECORD = '[Teachers] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Teachers] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Teachers] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Teachers] RESET_GET_SINGLE_RECORD_REQUEST';

export const CREATE = '[Teachers] CREATE';
export const CREATE_SUCCESS = '[Teachers] CREATE_SUCCESS';
export const CREATE_FAIL = '[Teachers] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Teachers] RESET_CREATE_ERRORS';

export const UPDATE = '[Teachers] UPDATE';
export const UPDATE_SUCCESS = '[Teachers] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Teachers] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Teachers] RESET_UPDATE_REQUEST';

export const DELETE = '[Teachers] DELETE';
export const DELETE_SUCCESS = '[Teachers] DELETE_SUCCESS';
export const DELETE_FAIL = '[Teachers] DELETE_FAIL';

export const BULK_UPLOAD = '[Teachers] BULK_UPLOAD';
export const BULK_UPLOAD_PROGRESS = '[Teachers] BULK_UPLOAD_PROGRESS';
export const BULK_UPLOAD_SUCCESS = '[Teachers] BULK_UPLOAD_SUCCESS';
export const BULK_UPLOAD_FAIL = '[Teachers] BULK_UPLOAD_FAIL';
export const RESET_BULK_UPLOAD_REQUEST = '[Teachers] RESET_BULK_UPLOAD_REQUEST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('teachers', params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`teachers/${id}`, params)
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
    promise: (apiClient) => apiClient.post('teachers', data, params)
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
    promise: (apiClient) => apiClient.put(`teachers/${id}`, data, params)
  };
}
export function resetUpdateRequest () {
  return {
    type: RESET_UPDATE_REQUEST
  }
}
/**
 * Delete
 */
export function deleteRecord(id, params = {}) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (apiClient) => apiClient.delete(`teachers/${id}`, params)
  };
}
/**
 * Bulk upload
 */
export function bulkUpload(file, data, params = {}) {
    const source = ApiClient.cancelToken();

    return {
        upload: true,
        types: [BULK_UPLOAD, BULK_UPLOAD_SUCCESS, BULK_UPLOAD_FAIL, BULK_UPLOAD_PROGRESS],
        promise: (apiClient) => apiClient.upload(`teachers/bulk`, file, data, params, {}, {
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