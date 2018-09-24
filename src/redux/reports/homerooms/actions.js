export const GET_CHARTS_DATA = '[Reports][Homeroom] GET_CHARTS_DATA';
export const GET_CHARTS_DATA_SUCCESS = '[Reports][Homeroom] GET_CHARTS_DATA_SUCCESS';
export const GET_CHARTS_DATA_FAIL = '[Reports][Homeroom] GET_CHARTS_DATA_FAIL';

export const GET_ROSTER_STATISTIC = '[Reports][Homeroom] GET_ROSTER_STATISTIC';
export const GET_ROSTER_STATISTIC_SUCCESS = '[Reports][Homeroom] GET_ROSTER_STATISTIC_SUCCESS';
export const GET_ROSTER_STATISTIC_FAIL = '[Reports][Homeroom] GET_ROSTER_STATISTIC_FAIL';

/**
 * @param id
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getCharts(id, params = {}) {
  return {
    types: [GET_CHARTS_DATA, GET_CHARTS_DATA_SUCCESS, GET_CHARTS_DATA_FAIL],
    promise: (apiClient) => apiClient.get(`reports/homerooms/charts/${id}`, params)
  };
}

/**
 * @param id
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getRosterStatistic(id, params = {}) {
  return {
    types: [GET_ROSTER_STATISTIC, GET_ROSTER_STATISTIC_SUCCESS, GET_ROSTER_STATISTIC_FAIL],
    promise: (apiClient) => apiClient.get(`reports/homerooms/roster-statistic/${id}`, params)
  };
}
