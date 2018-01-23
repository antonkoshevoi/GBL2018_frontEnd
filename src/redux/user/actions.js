export const GET_USER = '[User] GET_USER';
export const GET_USER_SUCCESS = '[User] GET_USER_SUCCESS';
export const GET_USER_FAIL = '[User] GET_USER_FAIL';

export const UPDATE = '[User] UPDATE';
export const UPDATE_SUCCESS = '[User] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[User] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[User] RESET_UPDATE_REQUEST';

export function getUser(params = {}) {
  return {
    types: [GET_USER, GET_USER_SUCCESS, GET_USER_FAIL],
    promise: (apiClient) => apiClient.get('user', params)
  };
}

export function getUserSucess (result) {
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
export function resetUpdateRequest () {
  return {
    type: RESET_UPDATE_REQUEST
  }
}