export const GET_SCHOOLS = '[Schools] GET_SCHOOLS';
export const GET_SCHOOLS_SUCCESS = '[Schools] GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAIL = '[Schools] GET_SCHOOLS_FAIL';

export const GET_SCHOOL = '[Schools] GET_SCHOOL';
export const GET_SCHOOL_SUCCESS = '[Schools] GET_SCHOOL_SUCCESS';
export const GET_SCHOOL_FAIL = '[Schools] GET_SCHOOL_FAIL';

export const GET_SCHOOL_TEACHERS = '[Schools] GET_SCHOOL_TEACHERS';
export const GET_SCHOOL_TEACHERS_SUCCESS = '[Schools] GET_SCHOOL_TEACHERS_SUCCESS';
export const GET_SCHOOL_TEACHERS_FAIL = '[Schools] GET_SCHOOL_TEACHERS_FAIL';

export const GET_SCHOOL_ADMINS = '[Schools] GET_SCHOOL_ADMINS';
export const GET_SCHOOL_ADMINS_SUCCESS = '[Schools] GET_SCHOOL_ADMINS_SUCCESS';
export const GET_SCHOOL_ADMINS_FAIL = '[Schools] GET_SCHOOL_ADMINS_FAIL';

export const GET_SCHOOL_STUDENTS = '[Schools] GET_SCHOOL_STUDENTS';
export const GET_SCHOOL_STUDENTS_SUCCESS = '[Schools] GET_SCHOOL_STUDENTS_SUCCESS';
export const GET_SCHOOL_STUDENTS_FAIL = '[Schools] GET_SCHOOL_STUDENTS_FAIL';

export const GET_SCHOOL_HOMEROOMS = '[Schools] GET_SCHOOL_HOMEROOMS';
export const GET_SCHOOL_HOMEROOMS_SUCCESS = '[Schools] GET_SCHOOL_HOMEROOMS_SUCCESS';
export const GET_SCHOOL_HOMEROOMS_FAIL = '[Schools] GET_SCHOOL_HOMEROOMS_FAIL';

export const GET_SCHOOL_CLASSROOMS = '[Schools] GET_SCHOOL_CLASSROOMS';
export const GET_SCHOOL_CLASSROOMS_SUCCESS = '[Schools] GET_SCHOOL_CLASSROOMS_SUCCESS';
export const GET_SCHOOL_CLASSROOMS_FAIL = '[Schools] GET_SCHOOL_CLASSROOMS_FAIL';

export const UPDATE = '[Schools] UPDATE';
export const UPDATE_SUCCESS = '[Schools] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Schools] UPDATE_FAIL';
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
 * Get school
 */
export function getSchool(params = {}) {
  return {
    types: [GET_SCHOOL, GET_SCHOOL_SUCCESS, GET_SCHOOL_FAIL],
    promise: (apiClient) => apiClient.get('school', Object.assign({}, params))
  };
}

/**
 * Update
 */
export function update(data, params = {}) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (apiClient) => apiClient.put('school', data, params)
  };
}
/**
 * School Teachers
 */
export function getSchoolTeachers(params = {}) {
    params.perPage = 0;
    return {
        types: [GET_SCHOOL_TEACHERS, GET_SCHOOL_TEACHERS_SUCCESS, GET_SCHOOL_TEACHERS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/teachers`, params)
    };
}
/**
 * School Admins
 */
export function getSchoolAdmins(params = {}) {
    params.perPage = 0;
    return {
        types: [GET_SCHOOL_ADMINS, GET_SCHOOL_ADMINS_SUCCESS, GET_SCHOOL_ADMINS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/admins`, params)
    };
}
/**
 * School Students
 */
export function getSchoolStudents(params = {}) {
    params.perPage = 0;
    return {
        types: [GET_SCHOOL_STUDENTS, GET_SCHOOL_STUDENTS_SUCCESS, GET_SCHOOL_STUDENTS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/students`, params)
    };
}
/**
 * School Homerooms
 */
export function getSchoolHomerooms(params = {}) {
    params.perPage = 0;
    return {
        types: [GET_SCHOOL_HOMEROOMS, GET_SCHOOL_HOMEROOMS_SUCCESS, GET_SCHOOL_HOMEROOMS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/homerooms`, params)
    };
}
/**
 * School Homerooms
 */
export function getSchoolClassrooms(params = {}) {
    params.perPage = 0;
    return {
        types: [GET_SCHOOL_CLASSROOMS, GET_SCHOOL_CLASSROOMS_SUCCESS, GET_SCHOOL_CLASSROOMS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/classrooms`, params)
    };
}