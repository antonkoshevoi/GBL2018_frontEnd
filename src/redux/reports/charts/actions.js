export const GET_CHARTS_DATA = '[Reports][Charts] GET_CHARTS_DATA';
export const GET_CHARTS_DATA_SUCCESS = '[Reports][Charts] GET_CHARTS_DATA_SUCCESS';
export const GET_CHARTS_DATA_FAIL = '[Reports][Charts] GET_CHARTS_DATA_FAIL';

/**
 * Get charts data
 *
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getCharts(params = {}) {
  return {
    types: [GET_CHARTS_DATA, GET_CHARTS_DATA_SUCCESS, GET_CHARTS_DATA_FAIL],
    promise: (apiClient) => apiClient.get(`reports/charts`, params)
  };
}