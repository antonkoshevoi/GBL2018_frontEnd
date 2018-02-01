export const GET_CHARTS_DATA = '[Reports][Dashboard] GET_CHARTS_DATA';
export const GET_CHARTS_DATA_SUCCESS = '[Reports][Dashboard] GET_CHARTS_DATA_SUCCESS';
export const GET_CHARTS_DATA_FAIL = '[Reports][Dashboard] GET_CHARTS_DATA_FAIL';

export const GET_ROSTER_STATISTIC = '[Reports][Dashboard] GET_ROSTER_STATISTIC';
export const GET_ROSTER_STATISTIC_SUCCESS = '[Reports][Dashboard] GET_ROSTER_STATISTIC_SUCCESS';
export const GET_ROSTER_STATISTIC_FAIL = '[Reports][Dashboard] GET_ROSTER_STATISTIC_FAIL';

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

/**
 * Get roster statistic
 *
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getRosterStatistic(params = {}) {
  return {
    types: [GET_ROSTER_STATISTIC, GET_ROSTER_STATISTIC_SUCCESS, GET_ROSTER_STATISTIC_FAIL],
    promise: (apiClient) => apiClient.get(`reports/roster-statistic`, params)
  };
}