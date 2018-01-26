export const GET_USER = '[User] GET_USER';
export const GET_USER_SUCCESS = '[User] GET_USER_SUCCESS';
export const GET_USER_FAIL = '[User] GET_USER_FAIL';

export const UPDATE = '[User] UPDATE';
export const UPDATE_SUCCESS = '[User] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[User] UPDATE_FAIL';

export const CHANGE_PASSWORD = '[User] CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = '[User] CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = '[User] CHANGE_PASSWORD_FAIL';

export function getUser(params = {}) {
  return {
    types: [GET_USER, GET_USER_SUCCESS, GET_USER_FAIL],
    promise: (apiClient) => apiClient.get('user', params)
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