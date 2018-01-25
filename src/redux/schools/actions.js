export const GET_SCHOOLS = '[Schools] GET_SCHOOLS';
export const GET_SCHOOLS_SUCCESS = '[Schools] GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAIL = '[Schools] GET_SCHOOLS_FAIL';

export const GET_SCHOOL_TEACHERS = '[Schools] GET_SCHOOL_TEACHERS';
export const GET_SCHOOL_TEACHERS_SUCCESS = '[Schools] GET_SCHOOL_TEACHERS_SUCCESS';
export const GET_SCHOOL_TEACHERS_FAIL = '[Schools] GET_SCHOOL_TEACHERS_FAIL';

export const GET_SCHOOL_STUDENTS = '[Schools] GET_SCHOOL_STUDENTS';
export const GET_SCHOOL_STUDENTS_SUCCESS = '[Schools] GET_SCHOOL_STUDENTS_SUCCESS';
export const GET_SCHOOL_STUDENTS_FAIL = '[Schools] GET_SCHOOL_STUDENTS_FAIL';

export const GET_SCHOOL_HOMEROOMS = '[Schools] GET_SCHOOL_HOMEROOMS';
export const GET_SCHOOL_HOMEROOMS_SUCCESS = '[Schools] GET_SCHOOL_HOMEROOMS_SUCCESS';
export const GET_SCHOOL_HOMEROOMS_FAIL = '[Schools] GET_SCHOOL_HOMEROOMS_FAIL';

export const GET_USER_SCHOOL = '[Schools] GET_USER_SCHOOL';
export const GET_USER_SCHOOL_SUCCESS = '[Schools] GET_USER_SCHOOL_SUCCESS';
export const GET_USER_SCHOOL_FAIL = '[Schools] GET_USER_SCHOOL_FAIL';

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
 * Get schools
 */
export function getUserSchool(params = {}) {
    return {
        types: [GET_USER_SCHOOL, GET_USER_SCHOOL_SUCCESS, GET_USER_SCHOOL_FAIL],
        promise: (apiClient) => apiClient.get('school', Object.assign({}, params, {
            perPage: 0
        }))
    };
}
/**
 * School Teachers
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
 * School Students
 */
export function getSchoolStudents(id) {
    return {
        types: [GET_SCHOOL_STUDENTS, GET_SCHOOL_STUDENTS_SUCCESS, GET_SCHOOL_STUDENTS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/students/${id}`, {
            perPage: 0
        })
    };
}
/**
 * School Homerooms
 */
export function getSchoolHomerooms(id) {
    return {
        types: [GET_SCHOOL_HOMEROOMS, GET_SCHOOL_HOMEROOMS_SUCCESS, GET_SCHOOL_HOMEROOMS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/homerooms/${id}`, {
            perPage: 0
        })
    };
}