export const VALIDATE_STEP_1 = '[Sign Up Parent] VALIDATE_STEP_1';
export const STEP_1_VALIDATED = '[Sign Up Parent] STEP_1_VALIDATED';
export const STEP_1_FAILED = '[Sign Up Parent] STEP_1_FAILED';
export const RESET_STEP_1_REQUEST = '[Sign Up Parent] RESET_STEP_1_REQUEST';

export const SIGN_UP = '[Sign Up Parent] SIGN_UP';
export const SIGN_UP_SUCCESS = '[Sign Up Parent] SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = '[Sign Up Parent] SIGN_UP_FAIL';
export const RESET_SIGN_UP_REQUEST = '[Sign Up Parent] RESET_SIGN_UP_REQUEST';

/**
 * validate step 1
 */
export function validateStep1 (form, params = {}) {
  return {
    types: [VALIDATE_STEP_1, STEP_1_VALIDATED, STEP_1_FAILED],
    promise: (apiClient) => apiClient.post('signUp/parent/validate/1', form, params)
  };
}
export function resetStep1Request () {
  return {
    type: RESET_STEP_1_REQUEST
  }
}

export function signUp (form, params = {}) {
  return {
    types: [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL],
    promise: (apiClient) => apiClient.post('signUp/parent', form, params)
  };
}
export function resetSignUpRequest () {
  return {
    type: RESET_SIGN_UP_REQUEST
  }
}