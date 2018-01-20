export const GET_SCHOOL_TEACHERS = '[Homerooms] GET_SCHOOL_TEACHERS';
export const GET_SCHOOL_TEACHERS_SUCCESS = '[Homerooms] GET_SCHOOL_TEACHERS_SUCCESS';
export const GET_SCHOOL_TEACHERS_FAIL = '[Homerooms] GET_SCHOOL_TEACHERS_FAIL';

export const GET_SCHOOL_STUDENTS = '[Homerooms] GET_SCHOOL_STUDENTS';
export const GET_SCHOOL_STUDENTS_SUCCESS = '[Homerooms] GET_SCHOOL_STUDENTS_SUCCESS';
export const GET_SCHOOL_STUDENTS_FAIL = '[Homerooms] GET_SCHOOL_STUDENTS_FAIL';

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