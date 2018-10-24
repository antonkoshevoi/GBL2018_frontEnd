export const GET_RECORDS = '[CourseCredits] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[CourseCredits] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[CourseCredits] GET_RECORDS_FAIL';

export const GIFT = '[CourseCredits] GIFT';
export const GIFT_SUCCESS = '[CourseCredits] GIFT_SUCCESS';
export const GIFT_FAIL = '[CourseCredits] GIFT_FAIL';
export const RESET_GIFT_REQUST = '[CourseCredits] RESET_GIFT_REQUST';

export const ASSIGN = '[CourseCredits] ASSIGN';
export const ASSIGN_SUCCESS = '[CourseCredits] ASSIGN_SUCCESS';
export const ASSIGN_FAIL = '[CourseCredits] ASSIGN_FAIL';
export const RESET_ASSIGN_REQUST = '[CourseCredits] RESET_ASSIGN_REQUST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('unassigned-items', params)
  };
}

export function giftCourseCredit(params = {}) {
  return {
    types: [GIFT, GIFT_SUCCESS, GIFT_FAIL],
    promise: (apiClient) => apiClient.post('unassigned-items/gift', params)
  };
}

export function resetGiftCourseCreditRequest() {
  return {
    type: RESET_GIFT_REQUST
  };
}

export function assignCourseCredit(params = {}) {
  return {
    types: [ASSIGN, ASSIGN_SUCCESS, ASSIGN_FAIL],
    promise: (apiClient) => apiClient.post('unassigned-items/assign', params)
  };
}

export function resetAssignCourseCreditRequest() {
  return {
    type: RESET_ASSIGN_REQUST
  };
}
