import {
  GET_USER, GET_USER_SUCCESS, GET_USER_FAIL
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  permissions: [],
  getUserRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  userData: {
    username: undefined,
    firstName: undefined,
    lastName: undefined,
  }
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Get records
     */
    case GET_USER:
      return state
        .set('getUserRequest', state.get('getUserRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        ).set('userData', Immutable.Map())
        .set('permissions', Immutable.List());
    case GET_USER_SUCCESS:
      return state
        .set('getUserRequest', state.get('getUserRequest')
          .set('success', true)
          .remove('loading')
        ).set('userData', Immutable.fromJS(action.result.data)
          .remove('permissions')
        ).set('permissions', Immutable.fromJS(action.result.data.permissions));
    case GET_USER_FAIL:
      return state
        .set('getUserRequest', state.get('getUserRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * default
     */
    default:
      return state;
  }
}