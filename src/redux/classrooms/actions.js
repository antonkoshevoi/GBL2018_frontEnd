export const GET_RECORDS = '[Classroomss] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Classroomss] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Classroomss] GET_RECORDS_FAIL';

export const GET_SINGLE_RECORD = '[Classroomss] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Classroomss] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Classroomss] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Classroomss] RESET_GET_SINGLE_RECORD_REQUEST';

export const GET_SCHOOLS = '[Classroomss] GET_SCHOOLS';
export const GET_SCHOOLS_SUCCESS = '[Classroomss] GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAIL = '[Classroomss] GET_SCHOOLS_FAIL';

export const CREATE = '[Classroomss] CREATE';
export const CREATE_SUCCESS = '[Classroomss] CREATE_SUCCESS';
export const CREATE_FAIL = '[Classroomss] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Classroomss] RESET_CREATE_ERRORS';

export const UPDATE = '[Classroomss] UPDATE';
export const UPDATE_SUCCESS = '[Classroomss] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Classroomss] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Classroomss] RESET_UPDATE_REQUEST';

export const GET_SCHOOL_TEACHERS = '[Classroomss] GET_SCHOOL_TEACHERS';
export const GET_SCHOOL_TEACHERS_SUCCESS = '[Classroomss] GET_SCHOOL_TEACHERS_SUCCESS';
export const GET_SCHOOL_TEACHERS_FAIL = '[Classroomss] GET_SCHOOL_TEACHERS_FAIL';

export const GET_SCHOOL_STUDENTS = '[Classroomss] GET_SCHOOL_STUDENTS';
export const GET_SCHOOL_STUDENTS_SUCCESS = '[Classroomss] GET_SCHOOL_STUDENTS_SUCCESS';
export const GET_SCHOOL_STUDENTS_FAIL = '[Classroomss] GET_SCHOOL_STUDENTS_FAIL';

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
 * Classrooms School Teachers
 */
export function getSchoolTeachers(id) {
    return {
        types: [GET_SCHOOL_TEACHERS, GET_SCHOOL_TEACHERS_SUCCESS, GET_SCHOOL_TEACHERS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/teachers/${id}`, {
            perPage: 0
        })
    };
}
/**
 * Classrooms School Students
 */
export function getSchoolStudents(id) {
    return {
        types: [GET_SCHOOL_STUDENTS, GET_SCHOOL_STUDENTS_SUCCESS, GET_SCHOOL_STUDENTS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/students/${id}`, {
            perPage: 0
        })
    };
}