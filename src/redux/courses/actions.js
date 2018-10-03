
export const GET_STORE_RECORDS = '[Courses] GET_STORE_RECORDS';
export const GET_STORE_RECORDS_SUCCESS = '[Courses] GET_STORE_RECORDS_SUCCESS';
export const GET_STORE_RECORDS_FAIL = '[Courses] GET_STORE_RECORDS_FAIL';

export const GET_DEMO_COURSES = '[Classrooms] GET_DEMO_COURSES';
export const GET_DEMO_COURSES_SUCCESS = '[Classrooms] GET_DEMO_COURSES_SUCCESS';
export const GET_DEMO_COURSES_FAIL = '[Classrooms] GET_DEMO_COURSES_FAIL';

export function getStoreRecords(params = {}) {
  return {
    types: [GET_STORE_RECORDS, GET_STORE_RECORDS_SUCCESS, GET_STORE_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('store/all', params)
  };
}

/**
 * Courses
 */
export function getDemoCourses(params = {}) {
  return {
    types: [GET_DEMO_COURSES, GET_DEMO_COURSES_SUCCESS, GET_DEMO_COURSES_FAIL],
    promise: (apiClient) => apiClient.get(`courses/demo`, params)
  };
}
