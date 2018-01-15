import {LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, SET_REDIRECT_URL} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  loginRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  initialLoad: false,
  redirectAfterLogin: null,
  isLoggedIn: false
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
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
      return state
        .set('loginRequest', state.get('loginRequest')
          .set('success', true)
          .remove('loading')
        ).set('isLoggedIn', true)
        .set('initialLoad', true);
    case LOGIN_FAIL:
      return state
        .set('loginRequest', state.get('loginRequest')
          .set('fail', true)
          .remove('loading')
        ).set('isLoggedIn', true)
        .set('initialLoad', true);

    case SET_REDIRECT_URL:
      return state
        .set('redirectAfterLogin', action.payload.uri);

    default:
      return state;
  }
}