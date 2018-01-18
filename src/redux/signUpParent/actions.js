export const VALIDATE_STEP_1 = '[Sign Up Parent] VALIDATE_STEP_1';
export const STEP_1_VALIDATED = '[Sign Up Parent] STEP_1_VALIDATED';
export const STEP_1_FAILED = '[Sign Up Parent] STEP_1_FAILED';
export const RESET_STEP_1_REQUEST = '[Sign Up Parent] RESET_STEP_1_REQUEST';

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