import {
    INITIAL_LOGIN, INITIAL_LOGIN_FAIL, INITIAL_LOGIN_SUCCESS, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS,
    SET_REDIRECT_URL
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  loginRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {},
    errorResponse: null
  },
  initialLoad: false,
  redirectAfterLogin: null,
  isLoggedIn: false
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Initial login
     */
    case INITIAL_LOGIN:
      return state
        .set('isLoggedIn', false)
        .set('initialLoad', false);
    case INITIAL_LOGIN_SUCCESS:
      return state
        .set('isLoggedIn', true)
        .set('initialLoad', true);
    case INITIAL_LOGIN_FAIL:
      return state
        .set('initialLoad', true);

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
        console.log(state.get('errors'));
        return state
        .set('loginRequest', state.get('loginRequest'))
          .set('fail', true)
          .set('errors',action.error.response.data)
          .remove('loading')
          .set('initialLoad', true);

    case SET_REDIRECT_URL:
      return state
        .set('redirectAfterLogin', action.payload.uri);

    default:
      return state;
  }
}