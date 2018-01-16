import SessionStorage from '../../services/SessionStorage';

export const LOAD = '[App] LOAD';
export const LOAD_SUCCESS_AUTHENTICATED = '[App] LOAD_SUCCESS_AUTHENTICATED';
export const LOAD_SUCCESS_UNAUTHENTICATED = '[App] LOAD_SUCCESS_UNAUTHENTICATED';
export const LOAD_FAIL = '[App] LOAD_FAIL';

export function load()
{
  const token = SessionStorage.get('token');

  if (token) {
    return {
      types: [LOAD, LOAD_SUCCESS_AUTHENTICATED, LOAD_FAIL],
      promise: (apiClient) => Promise.all([
        apiClient.get('user')
      ])
    }
  }

  return {
    type: LOAD_SUCCESS_UNAUTHENTICATED,
  }
}