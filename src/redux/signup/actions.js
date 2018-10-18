export const VALIDATE_PARENT = '[Signup] VALIDATE_PARENT';
export const VALIDATE_PARENT_SUCCESS = '[Signup] VALIDATE_PARENT_SUCCESS';
export const VALIDATE_PARENT_FAIL = '[Signup] VALIDATE_PARENT_FAIL';
export const RESET_VALIDATE_PARENT_REQUEST = '[Signup] RESET_VALIDATE_PARENT_REQUEST';

export const SIGNUP_PARENT = '[Signup] SIGNUP_PARENT';
export const SIGNUP_PARENT_SUCCESS = '[Signup] SIGNUP_PARENT_SUCCESS';
export const SIGNUP_PARENT_FAIL = '[Signup] SIGNUP_PARENT_FAIL';

export const SIGNUP_PRINCIPAL = '[Signup] SIGNUP_PRINCIPAL';
export const SIGNUP_PRINCIPAL_SUCCESS = '[Signup] SIGNUP_PRINCIPAL_SUCCESS';
export const SIGNUP_PRINCIPAL_FAIL = '[Signup] SIGNUP_PRINCIPAL_FAIL';

export const RESET_SIGNUP_REQUEST = '[Signup] RESET_SIGNUP_REQUEST';

/**
 * validate step 1
 */
export function validate(form, params = {}) {
  return {
    types: [VALIDATE_PARENT, VALIDATE_PARENT_SUCCESS, VALIDATE_PARENT_FAIL],
    promise: (apiClient) => apiClient.post('signUp/parent/validate/1', form, params)
  };
}

export function resetValidateRequest () {
  return {
    type: RESET_VALIDATE_PARENT_REQUEST
  }
}

export function signUpParent (form, params = {}) {
  return {
    types: [SIGNUP_PARENT, SIGNUP_PARENT_SUCCESS, SIGNUP_PARENT_FAIL],
    promise: (apiClient) => apiClient.post('signUp/parent', form, params)
  };
}

export function signUpPrincipal (form, params = {}) {
  return {
    types: [SIGNUP_PRINCIPAL, SIGNUP_PRINCIPAL_SUCCESS, SIGNUP_PRINCIPAL_FAIL],
    promise: (apiClient) => apiClient.post('signUp/principal', form, params)
  };
}

export function resetSignUpRequest () {
  return {
    type: RESET_SIGNUP_REQUEST
  }
}