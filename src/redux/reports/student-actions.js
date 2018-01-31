export const GET_REPORT_DATA = '[Reports][Student] GET_REPORT_DATA';
export const GET_REPORT_DATA_SUCCESS = '[Reports][Student] GET_REPORT_DATA_SUCCESS';
export const GET_REPORT_DATA_FAIL = '[Reports][Student] GET_REPORT_DATA_FAIL';

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