export const GET_CHARTS_DATA = '[Reports][Classroom] GET_CHARTS_DATA';
export const GET_CHARTS_DATA_SUCCESS = '[Reports][Classroom] GET_CHARTS_DATA_SUCCESS';
export const GET_CHARTS_DATA_FAIL = '[Reports][Classroom] GET_CHARTS_DATA_FAIL';

export const GET_ROSTER_STATISTIC = '[Reports][Classroom] GET_ROSTER_STATISTIC';
export const GET_ROSTER_STATISTIC_SUCCESS = '[Reports][Classroom] GET_ROSTER_STATISTIC_SUCCESS';
export const GET_ROSTER_STATISTIC_FAIL = '[Reports][Classroom] GET_ROSTER_STATISTIC_FAIL';

export const GET_STUDENTS = '[Reports][Classroom] GET_STUDENTS';
export const GET_STUDENTS_SUCCESS = '[Reports][Classroom] GET_STUDENTS_SUCCESS';
export const GET_STUDENTS_FAIL = '[Reports][Classroom] GET_STUDENTS_FAIL';

/**
 * @param id
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getCharts(id, params = {}) {
  return {
    types: [GET_CHARTS_DATA, GET_CHARTS_DATA_SUCCESS, GET_CHARTS_DATA_FAIL],
    promise: (apiClient) => apiClient.get(`reports/classrooms/charts/${id}`, params)
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
    promise: (apiClient) => apiClient.get(`reports/classrooms/roster-statistic/${id}`, params)
  };
}

/**
 * @param id
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getStudents(id, params = {}) {
  return {
    types: [GET_STUDENTS, GET_STUDENTS_SUCCESS, GET_STUDENTS_FAIL],
    promise: (apiClient) => apiClient.get(`reports/classrooms/students/${id}`, params)
  };
}