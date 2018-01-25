import SessionStorage from '../../services/SessionStorage';

export const INITIAL_LOGIN = '[Auth] INITIAL_LOGIN';
export const INITIAL_LOGIN_SUCCESS = '[Auth] INITIAL_LOGIN_SUCCESS';
export const INITIAL_LOGIN_FAIL = '[Auth] INITIAL_LOGIN_FAIL';

export const RESTORE_LOGIN = '[Auth] RESTORE_LOGIN';

export const LOGIN = '[Auth] LOGIN';
export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
export const LOGIN_SUCCESS_REMEMBER = '[Auth] LOGIN_SUCCESS_REMEMBER';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';

export const LOGOUT = '[Auth] LOGOUT';
export const LOGOUT_SUCCESS = '[Auth] LOGOUT_SUCCESS';
export const LOGOUT_FAIL = '[Auth] LOGOUT_FAIL';

export const SET_REDIRECT_URL = '[Auth] SET_REDIRECT_URL';

/**
 * Login
 */
export function login(username, password, remember) {
  const types = remember ? [LOGIN, LOGIN_SUCCESS_REMEMBER, LOGIN_FAIL] : [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL];

  return {
    types: types,
    promise: (apiClient) => apiClient.post('session', {
      username, password
    }, {}, {
      'Authorization': null
    })
  }
}
export function restoreLogin () {
  return {
    type: RESTORE_LOGIN
  };
}
export function refreshLogin() {
  const refreshToken = SessionStorage.get('refreshToken');

  if (refreshToken) {
    return {
      types: [INITIAL_LOGIN, INITIAL_LOGIN_SUCCESS, INITIAL_LOGIN_FAIL],
      promise: (apiClient) => apiClient.post('session/refresh', {
        refreshToken
      })
    };
  }

  return {
    type: INITIAL_LOGIN_FAIL
  };
}

/**
 * Logout
 */
export function logout() {
  const token = SessionStorage.get('token');

  if (token) {
    return {
      types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
      promise: (apiClient) => apiClient.post('session/destroy')
    };
  }

  return {
    type: LOGOUT_SUCCESS
  };
}

/**
 * where to redirect after login
 */
export function setRedirectUrl (uri) {
  return {
    type: SET_REDIRECT_URL,
    payload: {
      uri
    }
  };
}