import ApiClient from '../../services/ApiClient';

export const GET_RECORDS = '[Homerooms] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Homerooms] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Homerooms] GET_RECORDS_FAIL';

export const GET_SINGLE_RECORD = '[Homerooms] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Homerooms] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Homerooms] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Homerooms] RESET_GET_SINGLE_RECORD_REQUEST';

export const GET_SCHOOLS = '[Homerooms] GET_SCHOOLS';
export const GET_SCHOOLS_SUCCESS = '[Homerooms] GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAIL = '[Homerooms] GET_SCHOOLS_FAIL';

export const CREATE = '[Homerooms] CREATE';
export const CREATE_SUCCESS = '[Homerooms] CREATE_SUCCESS';
export const CREATE_FAIL = '[Homerooms] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Homerooms] RESET_CREATE_ERRORS';

export const UPDATE = '[Homerooms] UPDATE';
export const UPDATE_SUCCESS = '[Homerooms] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Homerooms] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Homerooms] RESET_UPDATE_REQUEST';

export const GET_SCHOOL_TEACHERS = '[Homerooms] GET_SCHOOL_TEACHERS';
export const GET_SCHOOL_TEACHERS_SUCCESS = '[Homerooms] GET_SCHOOL_TEACHERS_SUCCESS';
export const GET_SCHOOL_TEACHERS_FAIL = '[Homerooms] GET_SCHOOL_TEACHERS_FAIL';

export const GET_SCHOOL_STUDENTS = '[Homerooms] GET_SCHOOL_STUDENTS';
export const GET_SCHOOL_STUDENTS_SUCCESS = '[Homerooms] GET_SCHOOL_STUDENTS_SUCCESS';
export const GET_SCHOOL_STUDENTS_FAIL = '[Homerooms] GET_SCHOOL_STUDENTS_FAIL';

export const BULK_UPLOAD = '[Homerooms] BULK_UPLOAD';
export const BULK_UPLOAD_PROGRESS = '[Homerooms] BULK_UPLOAD_PROGRESS';
export const BULK_UPLOAD_SUCCESS = '[Homerooms] BULK_UPLOAD_SUCCESS';
export const BULK_UPLOAD_FAIL = '[Homerooms] BULK_UPLOAD_FAIL';
export const RESET_BULK_UPLOAD_REQUEST = '[Homerooms] RESET_BULK_UPLOAD_REQUEST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('homeroom', params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`homeroom/${id}`, params)
  };
}
export function resetGetSingleRecordRequest () {
  return {
    type: RESET_GET_SINGLE_RECORD_REQUEST
  }
}
/**
 * Get schools
 */
export function getSchools(params = {}) {
  return {
    types: [GET_SCHOOLS, GET_SCHOOLS_SUCCESS, GET_SCHOOLS_FAIL],
    promise: (apiClient) => apiClient.get('schools', Object.assign({}, params, {
      perPage: 0
    }))
  };
}
/**
 * Create
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('homeroom', data, params)
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
    promise: (apiClient) => apiClient.put(`homeroom/${id}`, data, params)
  };
}
export function resetUpdateRequest () {
  return {
    type: RESET_UPDATE_REQUEST
  }
}

/**
 * Homerooms School Teachers
 */
export function getSchoolTeachers(id) {
    return {
        types: [GET_SCHOOL_TEACHERS, GET_SCHOOL_TEACHERS_SUCCESS, GET_SCHOOL_TEACHERS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/teachers/${id}`)
    };
}
/**
 * Homerooms School Students
 */
export function getSchoolStudents(id) {
    return {
        types: [GET_SCHOOL_STUDENTS, GET_SCHOOL_STUDENTS_SUCCESS, GET_SCHOOL_STUDENTS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/students/${id}`)
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
        promise: (apiClient) => apiClient.upload(`homerooms/bulk`, file, data, params, {}, {
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