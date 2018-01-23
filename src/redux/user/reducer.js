import {
  GET_USER, GET_USER_SUCCESS, GET_USER_FAIL,
  UPDATE, UPDATE_SUCCESS, UPDATE_FAIL, RESET_UPDATE_REQUEST
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  roles: [],
  permissions: [],
  getUserRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  updateRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
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
        .set('permissions', Immutable.List())
        .set('roles', Immutable.List());
    case GET_USER_SUCCESS:
      return state
        .set('getUserRequest', state.get('getUserRequest')
          .set('success', true)
          .remove('loading')
        ).set('userData', Immutable.fromJS(action.result.data)
          .remove('permissions')
          .remove('roles')
        ).set('permissions', Immutable.fromJS(action.result.data.permissions))
        .set('roles', Immutable.fromJS(action.result.data.roles));
    case GET_USER_FAIL:
      return state
        .set('getUserRequest', state.get('getUserRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * Update
     */
    case UPDATE:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case UPDATE_SUCCESS:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('loading', false)
          .set('success', true)
        ).set('userData', Immutable.fromJS(action.result.data));
    case UPDATE_FAIL:
      const errorData = action.error.response.data;
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', errorData.code)
          .set('errorMessage', errorData.message)
          .set('errors', errorData.code === 422 ? Immutable.fromJS(errorData.errors) : undefined)
        );
    case RESET_UPDATE_REQUEST:
      return state
        .set('updateRequest', initialState.get('updateRequest'));
    /**
     * default
     */
    default:
      return state;
  }
}