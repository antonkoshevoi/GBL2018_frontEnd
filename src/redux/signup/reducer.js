import Immutable from 'immutable';
import {
    VALIDATE_PARENT, VALIDATE_PARENT_SUCCESS, VALIDATE_PARENT_FAIL, RESET_VALIDATE_PARENT_REQUEST, 
    SIGNUP_PARENT, SIGNUP_PARENT_SUCCESS, SIGNUP_PARENT_FAIL, 
    SIGNUP_PRINCIPAL, SIGNUP_PRINCIPAL_SUCCESS, SIGNUP_PRINCIPAL_FAIL,
    RESET_SIGNUP_REQUEST    
} from './actions';
import { saveSession } from '../../helpers/session';

const initialState = Immutable.fromJS({
  validateRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
  },
  signUpRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
  }
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Validate
     */
    case VALIDATE_PARENT:
      return state.set('validateRequest', initialState.get('validateRequest').set('loading', true));
    case VALIDATE_PARENT_SUCCESS:
      return state.set('validateRequest', initialState.get('validateRequest').set('success', true));
    case VALIDATE_PARENT_FAIL:
      return state
        .set('validateRequest', state.get('validateRequest')
          .set('fail', true)
          .set('loading', false)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );
    case RESET_VALIDATE_PARENT_REQUEST:
        return state.set('validateRequest', initialState.get('validateRequest'));
    /**
     * Sign Up
     */
    case SIGNUP_PARENT:
    case SIGNUP_PRINCIPAL:
      return state.set('signUpRequest', initialState.get('signUpRequest').set('loading', true));
    case SIGNUP_PARENT_SUCCESS:
    case SIGNUP_PRINCIPAL_SUCCESS:
      saveSession(action.result.data);
      return state.set('signUpRequest', initialState.get('signUpRequest').set('success', true));
    case SIGNUP_PARENT_FAIL:
    case SIGNUP_PRINCIPAL_FAIL:
      return state
        .set('signUpRequest', state.get('signUpRequest')
          .set('fail', true)
          .set('loading', false)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );
    case RESET_SIGNUP_REQUEST:
        return state.set('signUpRequest', initialState.get('signUpRequest'));
    default:
      return state;
  }
}