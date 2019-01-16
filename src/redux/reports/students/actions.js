export const GET_REPORT_DATA = '[Reports][Student] GET_REPORT_DATA';
export const GET_REPORT_DATA_SUCCESS = '[Reports][Student] GET_REPORT_DATA_SUCCESS';
export const GET_REPORT_DATA_FAIL = '[Reports][Student] GET_REPORT_DATA_FAIL';

export const GET_REPORT_DETAILS = '[Reports][Student] GET_REPORT_DETAILS';
export const GET_REPORT_DETAILS_SUCCESS = '[Reports][Student] GET_REPORT_DETAILS_SUCCESS';
export const GET_REPORT_DETAILS_FAIL = '[Reports][Student] GET_REPORT_DETAILS_FAIL';
export const RESET_GET_REPORT_DETAILS = '[Reports][Student] RESET_GET_REPORT_DETAILS';

export const GET_ATTEMPTS = '[Reports][Student] GET_ATTEMPTS';
export const GET_ATTEMPTS_SUCCESS = '[Reports][Student] GET_ATTEMPTS_SUCCESS';
export const GET_ATTEMPTS_FAIL = '[Reports][Student] GET_ATTEMPTS_FAIL';

/**
 * Get Student report
 *
 * @param id
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getReport(id, params = {}) {
    return {
        types: [GET_REPORT_DATA, GET_REPORT_DATA_SUCCESS, GET_REPORT_DATA_FAIL],
      promise: (apiClient) => apiClient.get(`students/reports/${id}`, params)
    };
}

/**
 * Get Student report
 *
 * @param id
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getReportDetails(studentId, classroomId) {
    return {
        types: [GET_REPORT_DETAILS, GET_REPORT_DETAILS_SUCCESS, GET_REPORT_DETAILS_FAIL],
        promise: (apiClient) => apiClient.get(`students/report-details/${studentId}/${classroomId}`)
    };
}

export function getAttempts(studentId, params = {}) {
    return {
        types: [GET_ATTEMPTS, GET_ATTEMPTS_SUCCESS, GET_ATTEMPTS_FAIL],
        promise: (apiClient) => apiClient.get(`reports/attempts-all/${studentId}`, params)
    };
}

export function resetGetReportDetails () {
  return {
    type: RESET_GET_REPORT_DETAILS
  }
}

