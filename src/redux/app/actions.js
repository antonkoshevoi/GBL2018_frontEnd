import SessionStorage from '../../services/SessionStorage';
import { saveSession } from '../../helpers/session';

export const LOAD = '[App] LOAD';
export const LOAD_SUCCESS_AUTHENTICATED = '[App] LOAD_SUCCESS_AUTHENTICATED';
export const LOAD_SUCCESS_UNAUTHENTICATED = '[App] LOAD_SUCCESS_UNAUTHENTICATED';
export const LOAD_FAIL = '[App] LOAD_FAIL';

export function load()
{
  const token = SessionStorage.get('token');
  const refreshToken = SessionStorage.get('refreshToken');
  if (token) {
    return {
      types: [LOAD, LOAD_SUCCESS_AUTHENTICATED, LOAD_FAIL],
      promise: (apiClient) => Promise.all([
        apiClient.get('user'),
        apiClient.get('user/threads')
      ])
    }
  } else if (refreshToken) {
    return {
      types: [LOAD, LOAD_SUCCESS_AUTHENTICATED, LOAD_FAIL],
      promise: (apiClient) => apiClient.post('session/refresh', {
        refreshToken
      }).then((result) => {
        saveSession(result.data, true);
        return Promise.all([
          apiClient.get('user')
        ]);
      })
    }
  }

  return {
    type: LOAD_SUCCESS_UNAUTHENTICATED,
  }
}