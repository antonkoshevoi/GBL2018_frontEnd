import Immutable from "immutable";
import {SIGN_UP, SIGN_UP_FAIL, SIGN_UP_SUCCESS, STEP_1_FAILED, STEP_1_VALIDATED, VALIDATE_STEP_1} from './actions';

const initialState = Immutable.fromJS({
  validateStep1Request: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
  },
  signUpRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {
      step1: {},
      step2: {}
    }
  }
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Validate step 1
     */
    case VALIDATE_STEP_1:
      return state
        .set('validateStep1Request', state.get('validateStep1Request')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('errors', Immutable.Map())
        );
    case STEP_1_VALIDATED:
      return state
        .set('validateStep1Request', state.get('validateStep1Request')
          .set('success', true)
          .set('loading', false)
        );
    case STEP_1_FAILED:
      let errors = {};

      if (typeof action.error.response !== 'undefined' && action.error.response.status === 422) {
        errors = action.error.response.data.errors;
      }

      return state
        .set('validateStep1Request', state.get('validateStep1Request')
          .set('fail', true)
          .set('loading', false)
          .set('errors', Immutable.fromJS(errors))
        );
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
      return state
        .set('signUpRequest', state.get('signUpRequest')
          .set('success', true)
          .set('loading', false)
        );
    case SIGN_UP_FAIL:
      let signUpErrors = {
        step1: {},
        step2: {}
      };

      if (typeof action.error.response !== 'undefined' && action.error.response.status === 422) {
        if (typeof action.error.response.data.errors.step1 !== 'undefined') {
          signUpErrors.step1 = action.error.response.data.errors.step1;
        }
        if (typeof action.error.response.data.errors.step2 !== 'undefined') {
          signUpErrors.step2 = action.error.response.data.errors.step2;
        }
      }

      return state
        .set('signUpRequest', state.get('signUpRequest')
          .set('fail', true)
          .set('loading', false)
          .set('errors', Immutable.fromJS(signUpErrors))
        );
    default:
      return state;
  }
}