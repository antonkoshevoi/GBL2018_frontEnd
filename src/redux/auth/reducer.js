import {
  INITIAL_LOGIN, INITIAL_LOGIN_FAIL, INITIAL_LOGIN_SUCCESS, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, LOGOUT_FAIL,
  LOGOUT_SUCCESS, RESTORE_LOGIN,
  SET_REDIRECT_URL
} from './actions';
import Immutable from 'immutable';
import { destroySession, saveSession } from '../../helpers/session';

const initialState = Immutable.fromJS({
  loginRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {},
    errorResponse: null
  },
  logoutRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  redirectAfterLogin: null,
  isLoggedIn: false
});

export default function reducer (state = initialState, action) {
  switch(action.type) {

    case RESTORE_LOGIN:
      return state.set('isLoggedIn', true);

    /**
     * Login
     */
    case LOGIN:
      return state
        .set('loginRequest', state.get('loginRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        ).set('isLoggedIn', false);
    case LOGIN_SUCCESS:
      saveSession(action.result.data);
      return state
        .set('loginRequest', state.get('loginRequest')
          .set('success', true)
          .remove('loading')
        ).set('isLoggedIn', true);
    case LOGIN_FAIL:
      return state
        .set('loginRequest', state.get('loginRequest')
          .set('fail', true)
          .remove('loading')
          .set('errors', action.error.response.data)
        ).set('isLoggedIn', true);

    /**
     * Logout
     */
    case LOGOUT:
      return state
        .set('logoutRequest', state.get('logoutRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case LOGOUT_SUCCESS:
      destroySession();
      return state
        .set('logoutRequest', state.get('logoutRequest')
          .set('success', true)
          .remove('loading')
        ).set('isLoggedIn', false);
    case LOGOUT_FAIL:
      return state
        .set('logoutRequest', state.get('logoutRequest')
          .set('fail', true)
          .remove('loading')
        );

    case SET_REDIRECT_URL:
      return state
        .set('redirectAfterLogin', action.payload.uri);

    default:
      return state;
  }
}