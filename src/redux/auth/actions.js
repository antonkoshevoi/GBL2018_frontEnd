import SessionStorage from '../../services/SessionStorage';

export const INITIAL_LOGIN = '[Auth] INITIAL_LOGIN';
export const INITIAL_LOGIN_SUCCESS = '[Auth] INITIAL_LOGIN_SUCCESS';
export const INITIAL_LOGIN_FAIL = '[Auth] INITIAL_LOGIN_FAIL';

export const RESTORE_LOGIN = '[Auth] RESTORE_LOGIN';
export const RESTORE_LOGIN_FAIL = '[Auth] RESTORE_LOGIN_FAIL';

export const LOGIN = '[Auth] LOGIN';
export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
export const LOGIN_SUCCESS_REMEMBER = '[Auth] LOGIN_SUCCESS_REMEMBER';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';

export const LOGOUT = '[Auth] LOGOUT';
export const LOGOUT_SUCCESS = '[Auth] LOGOUT_SUCCESS';
export const LOGOUT_FAIL = '[Auth] LOGOUT_FAIL';

export const SET_REDIRECT_URL = '[Auth] SET_REDIRECT_URL';
export const SET_CALLBACK = '[Auth] SET_CALLBACK';

export const RESET_PASSWORD = '[Auth] RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = '[Auth] RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = '[Auth] RESET_PASSWORD_FAIL';

export const GET_RESET_PASSWORD_USER = '[Auth] GET_RESET_PASSWORD_USER';
export const GET_RESET_PASSWORD_USER_SUCCESS = '[Auth] GET_RESET_PASSWORD_USER_SUCCESS';
export const GET_RESET_PASSWORD_USER_FAIL = '[Auth] GET_RESET_PASSWORD_USER_FAIL';

export const UPDATE_PASSWORD = '[Auth] UPDATE_PASSWORD';
export const UPDATE_PASSWORD_SUCCESS = '[Auth] UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAIL = '[Auth] UPDATE_PASSWORD_FAIL';
export const RESET_UPDATE_PASSWORD_REQUEST = '[Auth] RESET_UPDATE_PASSWORD_REQUEST';

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

export function resetPassword(username) {
  return {
    types: [RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL],
    promise: (apiClient) => apiClient.post('auth/reset-password', {
      username: username
    }, {}, {
      'Authorization': null
    })
  }
}

export function getResetPasswordUser(id, hash) {
  return {
    types: [GET_RESET_PASSWORD_USER, GET_RESET_PASSWORD_USER_SUCCESS, GET_RESET_PASSWORD_USER_FAIL],
    promise: (apiClient) => apiClient.get(`auth/reset-password/${id}/${hash}`, {}, {}, {
      'Authorization': null
    })
  }
}

export function updatePassword(data = {}) {
  return {
    types: [UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL],
    promise: (apiClient) => apiClient.post(`auth/update-password`, data, {}, {
      'Authorization': null
    })
  }
}

export function resetUpdatePasswordRequest() {
  return {
    type: RESET_UPDATE_PASSWORD_REQUEST
  };
}



export function restoreLogin () {
  return {
    type: RESTORE_LOGIN
  };
}

export function restoreLoginFail () {
    const userData = SessionStorage.get('userData');
    return {
        type: RESTORE_LOGIN_FAIL,
        payload:userData
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

/**
 * where to redirect after login
 */
export function setCallback (callback) {
  return {
    type: SET_CALLBACK,
    payload: {
      callback
    }
  };
}