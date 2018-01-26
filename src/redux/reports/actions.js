export const GET_USER_SCHOOL_STUDENTS = '[Schools] GET_USER_SCHOOL_STUDENTS';
export const GET_USER_SCHOOL_STUDENTS_SUCCESS = '[Schools] GET_USER_SCHOOL_STUDENTS_SUCCESS';
export const GET_USER_SCHOOL_STUDENTS_FAIL = '[Schools] GET_USER_SCHOOL_STUDENTS_FAIL';

export const GET_USER_SCHOOL_HOMEROOMS = '[Schools] GET_USER_SCHOOL_HOMEROOMS';
export const GET_USER_SCHOOL_HOMEROOMS_SUCCESS = '[Schools] GET_USER_SCHOOL_HOMEROOMS_SUCCESS';
export const GET_USER_SCHOOL_HOMEROOMS_FAIL = '[Schools] GET_USER_SCHOOL_HOMEROOMS_FAIL';

export const GET_USER_SCHOOL_TEACHERS = '[Schools] GET_USER_SCHOOL_TEACHERS';
export const GET_USER_SCHOOL_TEACHERS_SUCCESS = '[Schools] GET_USER_SCHOOL_TEACHERS_SUCCESS';
export const GET_USER_SCHOOL_TEACHERS_FAIL = '[Schools] GET_USER_SCHOOL_TEACHERS_FAIL';

export const GET_USER_SCHOOL_ADMINS = '[Schools] GET_USER_SCHOOL_ADMINS';
export const GET_USER_SCHOOL_ADMINS_SUCCESS = '[Schools] GET_USER_SCHOOL_ADMINS_SUCCESS';
export const GET_USER_SCHOOL_ADMINS_FAIL = '[Schools] GET_USER_SCHOOL_ADMINS_FAIL';

export const GET_USER_SCHOOL = '[Schools] GET_USER_SCHOOL';
export const GET_USER_SCHOOL_SUCCESS = '[Schools] GET_USER_SCHOOL_SUCCESS';
export const GET_USER_SCHOOL_FAIL = '[Schools] GET_USER_SCHOOL_FAIL';

export const GET_SCHOOL_REPORT_STUDENT = '[Schools] GET_SCHOOL_REPORT_STUDENT';
export const GET_SCHOOL_REPORT_STUDENT_SUCCESS = '[Schools] GET_SCHOOL_REPORT_STUDENT_SUCCESS';
export const GET_SCHOOL_REPORT_STUDENT_FAIL = '[Schools] GET_SCHOOL_REPORT_STUDENT_FAIL';

export function getUserSchool(params = {}) {
    return {
        types: [GET_USER_SCHOOL, GET_USER_SCHOOL_SUCCESS, GET_USER_SCHOOL_FAIL],
        promise: (apiClient) => apiClient.get('school', Object.assign({}, params, {
            perPage: 0
        }))
    };
}
/**
 * User School Students
 */
export function getUserSchoolStudents(id) {
    return {
        types: [GET_USER_SCHOOL_STUDENTS, GET_USER_SCHOOL_STUDENTS_SUCCESS, GET_USER_SCHOOL_STUDENTS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/students/${id}`, {
            perPage: 0
        })
    };
}
/**
 * User School Homerooms
 */
export function getUserSchoolHomerooms(id) {
    return {
        types: [GET_USER_SCHOOL_HOMEROOMS, GET_USER_SCHOOL_HOMEROOMS_SUCCESS, GET_USER_SCHOOL_HOMEROOMS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/homerooms/${id}`, {
            perPage: 0
        })
    };
}
/**
 * User School Teachers
 */
export function getUserSchoolTeachers(id) {
    return {
        types: [GET_USER_SCHOOL_TEACHERS, GET_USER_SCHOOL_TEACHERS_SUCCESS, GET_USER_SCHOOL_TEACHERS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/teachers/${id}`, {
            perPage: 0
        })
    };
}
/**
 * User School Admins
 */
export function getUserSchoolAdmins(id) {
    return {
        types: [GET_USER_SCHOOL_ADMINS, GET_USER_SCHOOL_ADMINS_SUCCESS, GET_USER_SCHOOL_ADMINS_FAIL],
        promise: (apiClient) => apiClient.get(`schools/admins/${id}`, {
            perPage: 0
        })
    };
}
/**
 * School Report Student
 */
export function getSchoolReportStudent(id) {
    return {
        types: [GET_SCHOOL_REPORT_STUDENT, GET_SCHOOL_REPORT_STUDENT_SUCCESS, GET_SCHOOL_REPORT_STUDENT_FAIL],
        promise: (apiClient) => apiClient.get(`students/${id}`)
    };
}