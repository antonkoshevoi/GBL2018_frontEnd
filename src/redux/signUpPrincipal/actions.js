export const SIGN_UP = '[Sign Up Principal] SIGN_UP';
export const SIGN_UP_SUCCESS = '[Sign Up Principal] SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = '[Sign Up Principal] SIGN_UP_FAIL';
export const RESET_SIGN_UP_REQUEST = '[Sign Up Principal] RESET_SIGN_UP_REQUEST';

export function signUp (form, params = {}) {
  return {
    types: [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL],
    promise: (apiClient) => apiClient.post('signUp/principal', form, params)
  };
}
export function resetSignUpRequest () {
  return {
    type: RESET_SIGN_UP_REQUEST
  }
}