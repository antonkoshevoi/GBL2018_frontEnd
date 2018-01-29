import ApiClient from '../../services/ApiClient';

export const GET_RECORDS = '[Classrooms] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Classrooms] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Classrooms] GET_RECORDS_FAIL';

export const GET_SINGLE_RECORD = '[Classrooms] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Classrooms] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Classrooms] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Classrooms] RESET_GET_SINGLE_RECORD_REQUEST';

export const CREATE = '[Classrooms] CREATE';
export const CREATE_SUCCESS = '[Classrooms] CREATE_SUCCESS';
export const CREATE_FAIL = '[Classrooms] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Classrooms] RESET_CREATE_ERRORS';

export const UPDATE = '[Classrooms] UPDATE';
export const UPDATE_SUCCESS = '[Classrooms] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Classrooms] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Classrooms] RESET_UPDATE_REQUEST';

export const DELETE = '[Classrooms] DELETE';
export const DELETE_SUCCESS = '[Classrooms] DELETE_SUCCESS';
export const DELETE_FAIL = '[Classrooms] DELETE_FAIL';

export const BULK_UPLOAD = '[Classrooms] BULK_UPLOAD';
export const BULK_UPLOAD_PROGRESS = '[Classrooms] BULK_UPLOAD_PROGRESS';
export const BULK_UPLOAD_SUCCESS = '[Classrooms] BULK_UPLOAD_SUCCESS';
export const BULK_UPLOAD_FAIL = '[Classrooms] BULK_UPLOAD_FAIL';
export const RESET_BULK_UPLOAD_REQUEST = '[Classrooms] RESET_BULK_UPLOAD_REQUEST';

export const GET_COURSES = '[Classrooms] GET_COURSES';
export const GET_COURSES_SUCCESS = '[Classrooms] GET_COURSES_SUCCESS';
export const GET_COURSES_FAIL = '[Classrooms] GET_COURSES_FAIL';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('classroom', params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`classroom/${id}`, params)
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
    promise: (apiClient) => apiClient.post('classroom', data, params)
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
    promise: (apiClient) => apiClient.put(`classroom/${id}`, data, params)
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
        promise: (apiClient) => apiClient.upload(`classroom/bulk`, file, data, params, {}, {
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
    promise: (apiClient) => apiClient.delete(`classroom/${id}`, params)
  };
}

/**
 * Courses
 */
export function getCourses() {
  return {
    types: [GET_COURSES, GET_COURSES_SUCCESS, GET_COURSES_FAIL],
    promise: (apiClient) => apiClient.get(`classrooms/courses`)
  };
}