import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from './actions';

const initialState = {
  login: {
    user: null,
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  }
};

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Login
     */
    case LOGIN:
      return {
        ...state,
        loading: true,
        success: false,
        fail: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      };
    case LOGIN_FAIL:
      console.log('qwe');
      return {
        ...state,
        loading: false,
        fail: true
      };

    default:
      return state;
  }
}