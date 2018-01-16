export const GET_USER = '[User] GET_USER';
export const GET_USER_SUCCESS = '[User] GET_USER_SUCCESS';
export const GET_USER_FAIL = '[User] GET_USER_FAIL';

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