export const GET_USER = '[User] GET_USER';
export const GET_USER_SUCCESS = '[User] GET_USER_SUCCESS';
export const GET_USER_FAIL = '[User] GET_USER_FAIL';
export const RESET_GET_USER_REQUEST = '[User] RESET_GET_USER_REQUEST';

export const UPDATE = '[User] UPDATE';
export const UPDATE_SUCCESS = '[User] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[User] UPDATE_FAIL';

export const CHANGE_PASSWORD = '[User] CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = '[User] CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = '[User] CHANGE_PASSWORD_FAIL';
export const RESET_CHANGE_PASSWORD_REQUEST = '[User] RESET_CHANGE_PASSWORD_REQUEST';

export const CHANGE_IMAGE = '[User] CHANGE_IMAGE';
export const CHANGE_IMAGE_SUCCESS = '[User] CHANGE_IMAGE_SUCCESS';
export const CHANGE_IMAGE_FAIL = '[User] CHANGE_IMAGE_FAIL';

export function getUser(params = {}) {
  return {
    types: [GET_USER, GET_USER_SUCCESS, GET_USER_FAIL],
    promise: (apiClient) => apiClient.get('user', params)
  };
}

export function resetGetUserRequest() {
  return {
    type: RESET_GET_USER_REQUEST
  };
}

export function getUserSuccess (result) {
  return {
    type: GET_USER_SUCCESS,
    result
  }
}

/**
 * Update
 */
export function update(data, params = {}) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (apiClient) => apiClient.put('user', data, params)
  };
}

/**
 * Change Password
 */
export function changePassword(data, params = {}) {
  return {
    types: [CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL],
    promise: (apiClient) => apiClient.post('user/password', data, params)
  };
}

export function resetChangePasswordRequest() {
  return {
    type: RESET_CHANGE_PASSWORD_REQUEST    
  };
}

export function changeImage(data, params = {}) {
  return {
    types: [CHANGE_IMAGE, CHANGE_IMAGE_SUCCESS, CHANGE_IMAGE_FAIL],
    promise: (apiClient) => apiClient.post('user/image', data, params)
  };
}