export const GET_CHARTS_DATA = '[Reports][Dashboard] GET_CHARTS_DATA';
export const GET_CHARTS_DATA_SUCCESS = '[Reports][Dashboard] GET_CHARTS_DATA_SUCCESS';
export const GET_CHARTS_DATA_FAIL = '[Reports][Dashboard] GET_CHARTS_DATA_FAIL';

export const GET_ROSTER_STATISTIC = '[Reports][Dashboard] GET_ROSTER_STATISTIC';
export const GET_ROSTER_STATISTIC_SUCCESS = '[Reports][Dashboard] GET_ROSTER_STATISTIC_SUCCESS';
export const GET_ROSTER_STATISTIC_FAIL = '[Reports][Dashboard] GET_ROSTER_STATISTIC_FAIL';

export const GET_STUDENTS = '[Reports][Dashboard] GET_STUDENTS';
export const GET_STUDENTS_SUCCESS = '[Reports][Dashboard] GET_STUDENTS_SUCCESS';
export const GET_STUDENTS_FAIL = '[Reports][Dashboard] GET_STUDENTS_FAIL';

export const GET_HOMEROOMS = '[Reports][Dashboard] GET_HOMEROOMS';
export const GET_HOMEROOMS_SUCCESS = '[Reports][Dashboard] GET_HOMEROOMS_SUCCESS';
export const GET_HOMEROOMS_FAIL = '[Reports][Dashboard] GET_HOMEROOMS_FAIL';

export const GET_CLASSROOMS = '[Reports][Dashboard] GET_CLASSROOMS';
export const GET_CLASSROOMS_SUCCESS = '[Reports][Dashboard] GET_CLASSROOMS_SUCCESS';
export const GET_CLASSROOMS_FAIL = '[Reports][Dashboard] GET_CLASSROOMS_FAIL';

/**
 * Get charts data
 *
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getCharts(params = {}) {
  return {
    types: [GET_CHARTS_DATA, GET_CHARTS_DATA_SUCCESS, GET_CHARTS_DATA_FAIL],
    promise: (apiClient) => apiClient.get('reports/charts', params)
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
    promise: (apiClient) => apiClient.get('reports/roster-statistic', params)
  };
}

/**
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getStudents(params = {}) {
  return {
    types: [GET_STUDENTS, GET_STUDENTS_SUCCESS, GET_STUDENTS_FAIL],
    promise: (apiClient) => apiClient.get('reports/students', params)
  };
}
/**
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getHomerooms(params = {}) {
  return {
    types: [GET_HOMEROOMS, GET_HOMEROOMS_SUCCESS, GET_HOMEROOMS_FAIL],
    promise: (apiClient) => apiClient.get('reports/homerooms', params)
  };
}
/**
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getClassrooms(params = {}) {
  return {
    types: [GET_CLASSROOMS, GET_CLASSROOMS_SUCCESS, GET_CLASSROOMS_FAIL],
    promise: (apiClient) => apiClient.get('reports/classrooms', params)
  };
}