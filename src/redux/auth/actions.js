import { post } from '../../services/ApiClient';

export const LOGIN = '[Auth] LOGIN';
export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';

/**
 * Login
 */
export function login (username, password) {
  return {
    type: LOGIN,
    promise: () => post('session', {
      username, password
    })
  };
}
// export function loginSuccess (data) {
//   return {
//     type: LOGIN_SUCCESS,
//     promise: () => post('session', {
//       username, password
//     })
//   };
// }
export function loginFail () {
  return {
    type: LOGIN_FAIL
  };
}