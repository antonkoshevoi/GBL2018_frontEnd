import Immutable from 'immutable';
import { SIGN_UP, SIGN_UP_FAIL, SIGN_UP_SUCCESS } from './actions';
import { saveSession } from '../../helpers/session';

const initialState = Immutable.fromJS({
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
     * Sign Up
     */
    case SIGN_UP:
      return state
        .set('signUpRequest', state.get('signUpRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('errors', initialState.get('signUpRequest').get('errors'))
        );
    case SIGN_UP_SUCCESS:
      saveSession(action.result.data);
      return state
        .set('signUpRequest', state.get('signUpRequest')
          .set('success', true)
          .set('loading', false)
        );
    case SIGN_UP_FAIL:
      let errors = {};

      if (typeof action.error.response !== 'undefined' && action.error.response.status === 422) {
        errors = action.error.response.data.errors;
      }

      return state
        .set('signUpRequest', state.get('signUpRequest')
          .set('fail', true)
          .set('loading', false)
          .set('errors', Immutable.fromJS(errors))
        );
    default:
      return state;
  }
}