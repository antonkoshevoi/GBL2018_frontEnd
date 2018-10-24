import ApiClient from '../../services/ApiClient';

export const GET_RECORDS = '[Classrooms] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Classrooms] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Classrooms] GET_RECORDS_FAIL';

export const GET_RECORDS_PUBLIC = '[Classrooms] GET_RECORDS_PUBLIC';
export const GET_RECORDS_PUBLIC_SUCCESS = '[Classrooms] GET_RECORDS_PUBLIC_SUCCESS';
export const GET_RECORDS_PUBLIC_FAIL = '[Classrooms] GET_RECORDS_PUBLIC_FAIL';

export const GET_SINGLE_RECORD = '[Classrooms] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Classrooms] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Classrooms] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Classrooms] RESET_GET_SINGLE_RECORD_REQUEST';

export const GET_SINGLE_AUTOCLASS_RECORD = '[Classrooms] GET_SINGLE_AUTOCLASS_RECORD';
export const GET_SINGLE_AUTOCLASS_RECORD_SUCCESS = '[Classrooms] GET_SINGLE_AUTOCLASS_RECORD_SUCCESS';
export const GET_SINGLE_AUTOCLASS_RECORD_FAIL = '[Classrooms] GET_SINGLE_AUTOCLASS_RECORD_FAIL';
export const RESET_GET_SINGLE_AUTOCLASS_RECORD_REQUEST = '[Classrooms] RESET_GET_SINGLE_RECORD_REQUEST';

export const CREATE = '[Classrooms] CREATE';
export const CREATE_SUCCESS = '[Classrooms] CREATE_SUCCESS';
export const CREATE_FAIL = '[Classrooms] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Classrooms] RESET_CREATE_ERRORS';

export const UPDATE_AUTOCLASS = '[Classrooms] UPDATE_AUTOCLASS';
export const UPDATE_AUTOCLASS_SUCCESS = '[Classrooms] UPDATE_AUTOCLASS_SUCCESS';
export const UPDATE_AUTOCLASS_FAIL = '[Classrooms] UPDATE_AUTOCLASS_FAIL';
export const RESET_UPDATE_AUTOCLASS_REQUEST = '[Classrooms] RESET_UPDATE_AUTOCLASS_ERRORS';

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

export const GET_DEMO_CLASSROOMS = '[Classrooms] GET_DEMO_CLASSROOMS';
export const GET_DEMO_CLASSROOMS_SUCCESS = '[Classrooms] GET_DEMO_CLASSROOMS_SUCCESS';
export const GET_DEMO_CLASSROOMS_FAIL = '[Classrooms] GET_DEMO_CLASSROOMS_FAIL';

export const GET_RECORD_FOR_ASSIGN_STUDENTS = '[Classrooms] GET_ASSIGN_STUDENTS';
export const GET_RECORD_FOR_ASSIGN_STUDENTS_SUCCESS = '[Classrooms] GET_ASSIGN_STUDENTS_SUCCESS';
export const GET_RECORD_FOR_ASSIGN_STUDENTS_FAIL = '[Classrooms] GET_ASSIGN_STUDENTS_FAIL';
export const RESET_GET_RECORD_FOR_ASSIGN_STUDENTS_REQUEST = '[Classrooms] RESET_GET_ASSIGN_STUDENTS_REQUEST';

export const ASSIGN_STUDENT = '[Classrooms] ASSIGN_STUDENT';
export const ASSIGN_STUDENT_SUCCESS = '[Classrooms] ASSIGN_STUDENT_SUCCESS';
export const ASSIGN_STUDENT_FAIL = '[Classrooms] ASSIGN_STUDENT_FAIL';
export const RESET_ASSIGN_STUDENT_REQUEST = '[Classrooms] RESET_ASSIGN_STUDENT_REQUEST';

export const ASSIGN_DEMO_STUDENT = '[Classrooms] ASSIGN_DEMO_STUDENT';
export const ASSIGN_DEMO_STUDENT_SUCCESS = '[Classrooms] ASSIGN_DEMO_STUDENT_SUCCESS';
export const ASSIGN_DEMO_STUDENT_FAIL = '[Classrooms] ASSIGN_DEMO_STUDENT_FAIL';
export const RESET_ASSIGN_DEMO_STUDENT_REQUEST = '[Classrooms] RESET_ASSIGN_DEMO_STUDENT_REQUEST';

export const GET_CLASSROOM_SCHEDULE  = '[Classrooms] GET_CLASSROOM_SCHEDULE';
export const GET_CLASSROOM_SCHEDULE_SUCCESS = '[Classrooms] GET_CLASSROOM_SCHEDULE_SUCCESS';
export const GET_CLASSROOM_SCHEDULE_FAIL = '[Classrooms] GET_CLASSROOM_SCHEDULE_FAIL';

export const CLASSROOM_SCHEDULE_LESSON  = '[Classrooms] CLASSROOM_SCHEDULE_LESSON';
export const CLASSROOM_SCHEDULE_LESSON_SUCCESS = '[Classrooms] CLASSROOM_SCHEDULE_LESSON_SUCCESS';
export const CLASSROOM_SCHEDULE_LESSON_FAIL = '[Classrooms] CLASSROOM_SCHEDULE_LESSON_FAIL';

export const UPDATE_CLASSROOM_SCHEDULE  = '[Classrooms] UPDATE_CLASSROOM_SCHEDULE';
export const UPDATE_CLASSROOM_SCHEDULE_SUCCESS = '[Classrooms] UPDATE_CLASSROOM_SCHEDULE_SUCCESS';
export const UPDATE_CLASSROOM_SCHEDULE_FAIL = '[Classrooms] UPDATE_CLASSROOM_SCHEDULE_FAIL';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('classroom', params)
  };
}

export function getRecordsPublic(params = {}) {
  return {
    types: [GET_RECORDS_PUBLIC, GET_RECORDS_PUBLIC_SUCCESS, GET_RECORDS_PUBLIC_FAIL],
    promise: (apiClient) => apiClient.get('classrooms/auto', params)
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
 * Single
 */
export function getSingleAutoClassRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_AUTOCLASS_RECORD, GET_SINGLE_AUTOCLASS_RECORD_SUCCESS, GET_SINGLE_AUTOCLASS_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`classroom/auto/${id}`, params)
  };
}

/**
 * Update auto classroom
 */
export function updateAutoClass(id, data, params = {}) {
  return {
    types: [UPDATE_AUTOCLASS, UPDATE_AUTOCLASS_SUCCESS, UPDATE_AUTOCLASS_FAIL],
    promise: (apiClient) => apiClient.post(`classroom/auto/${id}`, data, params)
  };
}

export function resetUpdateAutoClass() {
  return {
    type: RESET_UPDATE_AUTOCLASS_REQUEST
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
export function getDemoClassrooms(params = {}) {
  return {
    types: [GET_DEMO_CLASSROOMS, GET_DEMO_CLASSROOMS_SUCCESS, GET_DEMO_CLASSROOMS_FAIL],
    promise: (apiClient) => apiClient.get(`classrooms/demo`, params)
  };
}

/**
 * Get classroom for assign students
 */
export function getRecordForAssignStudents(id, params = {}) {
  return {
    types: [GET_RECORD_FOR_ASSIGN_STUDENTS, GET_RECORD_FOR_ASSIGN_STUDENTS_SUCCESS, GET_RECORD_FOR_ASSIGN_STUDENTS_FAIL],
    promise: (apiClient) => apiClient.get(`classroom/${id}`, params)
  };
}
export function resetGetRecordForAssignStudentsRequest () {
  return {
    type: RESET_GET_RECORD_FOR_ASSIGN_STUDENTS_REQUEST
  }
}

/**
 * Assign Students
 */
export function assignStudents(id, data, params = {}) {
  return {
    types: [ASSIGN_STUDENT, ASSIGN_STUDENT_SUCCESS, ASSIGN_STUDENT_FAIL],
    promise: (apiClient) => apiClient.post(`classrooms/assign/students/${id}`, data, params)
  };
}

export function resetAssignStudentsRequest () {
  return {
    type: RESET_ASSIGN_STUDENT_REQUEST
  }
}

export function assignDemoStudent(data, params = {}) {
  return {
    types: [ASSIGN_DEMO_STUDENT, ASSIGN_DEMO_STUDENT_SUCCESS, ASSIGN_DEMO_STUDENT_FAIL],
    promise: (apiClient) => apiClient.post(`classrooms/assign/student`, data, params)
  };
}


export function resetAssignDemoStudentRequest () {
  return {
    type: RESET_ASSIGN_DEMO_STUDENT_REQUEST
  }
}

export function getSchedule(id, params = {}) {
  return {
    types: [GET_CLASSROOM_SCHEDULE, GET_CLASSROOM_SCHEDULE_SUCCESS, GET_CLASSROOM_SCHEDULE_FAIL],
    promise: (apiClient) => apiClient.get(`classroom/schedule/${id}`, params)
  };
}

export function scheduleLesson(params = {}) {
  return {
    types: [CLASSROOM_SCHEDULE_LESSON, CLASSROOM_SCHEDULE_LESSON_SUCCESS, CLASSROOM_SCHEDULE_LESSON_FAIL],
    promise: (apiClient) => apiClient.post(`classroom/schedule-lesson`, params)
  };
}

export function updateSchedule(id, params = {}) {
  return {
    types: [UPDATE_CLASSROOM_SCHEDULE, UPDATE_CLASSROOM_SCHEDULE_SUCCESS, UPDATE_CLASSROOM_SCHEDULE_FAIL],
    promise: (apiClient) => apiClient.post(`classroom/schedule/${id}`, params)
  };
}
