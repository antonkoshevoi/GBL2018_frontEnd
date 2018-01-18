import Immutable from "immutable";
import { STEP_1_FAILED, STEP_1_VALIDATED, VALIDATE_STEP_1 } from './actions';

const initialState = Immutable.fromJS({
  form: {},
  validateStep1Request: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
  },
  validateStep2Request: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
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
          .set('success', true)
          .set('fail', true)
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

      console.log(action.error.response);
      if (typeof action.error.response !== 'undefined' && action.error.response.status === 400) {

      }

      return state
        .set('loginRequest', state.get('loginRequest')
          .set('fail', true)
          .set('loading', false)
          .set('errors', action.error.response.data)
        );
    default:
      return state;
  }
}