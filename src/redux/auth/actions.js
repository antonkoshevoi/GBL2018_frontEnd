import Cookies from 'universal-cookie';

export const LOGIN = '[Auth] LOGIN';
export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';

export const INITIAL_LOGIN = '[Auth] INITIAL_LOGIN';
export const INITIAL_LOGIN_SUCCESS = '[Auth] INITIAL_LOGIN_SUCCESS';
export const INITIAL_LOGIN_FAIL = '[Auth] INITIAL_LOGIN_FAIL';

export const SET_REDIRECT_URL = '[Auth] SET_REDIRECT_URL';

/**
 * Login
 */
export function login(username, password) {
    console.log("_____LOGIN");
    return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (apiClient) => apiClient.post('session', {
      username, password
    })
  }
}


export function refreshLogin() {
  const cookies = new Cookies();
    console.log("_____INITIAL_LOGIN");
  const refreshToken = cookies.get('refreshToken');

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