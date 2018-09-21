
export const GET_SCHOOL_REPORT_STUDENT = '[Schools] GET_SCHOOL_REPORT_STUDENT';
export const GET_SCHOOL_REPORT_STUDENT_SUCCESS = '[Schools] GET_SCHOOL_REPORT_STUDENT_SUCCESS';
export const GET_SCHOOL_REPORT_STUDENT_FAIL = '[Schools] GET_SCHOOL_REPORT_STUDENT_FAIL';

/**
 * School Report Student
 */
export function getSchoolReportStudent(id) {
    return {
        types: [GET_SCHOOL_REPORT_STUDENT, GET_SCHOOL_REPORT_STUDENT_SUCCESS, GET_SCHOOL_REPORT_STUDENT_FAIL],
        promise: (apiClient) => apiClient.get(`students/${id}`)
    };
}
