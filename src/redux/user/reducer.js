import {
  GET_USER, GET_USER_SUCCESS, GET_USER_FAIL, RESET_GET_USER_REQUEST,
  UPDATE, UPDATE_SUCCESS, UPDATE_FAIL,
  CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL,
  CHANGE_IMAGE, CHANGE_IMAGE_SUCCESS, CHANGE_IMAGE_FAIL
} from './actions';
import Immutable from 'immutable';
import {saveUserDataSession} from "../../helpers/session";

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
  changePasswordRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },
  changeImageRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },  
  userData: {
    id: undefined,
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
        saveUserDataSession(action.result.data)
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
    case RESET_GET_USER_REQUEST:
      return state
        .set('getUserRequest', initialState.get('getUserRequest')).set('userData', Immutable.Map())
        .set('permissions', Immutable.List())
        .set('roles', Immutable.List()); 
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
    /**
     * Change Password
     */
    case CHANGE_PASSWORD:
      return state
        .set('changePasswordRequest', state.get('changePasswordRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case CHANGE_PASSWORD_SUCCESS:
      return state
        .set('changePasswordRequest', state.get('changePasswordRequest')
          .set('loading', false)
          .set('success', true)
        );
    case CHANGE_PASSWORD_FAIL:
      const changePasswordError = action.error.response.data;
      return state
        .set('changePasswordRequest', state.get('changePasswordRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', changePasswordError.code)
          .set('errorMessage', changePasswordError.message)
          .set('errors', changePasswordError.code === 422 ? Immutable.fromJS(changePasswordError.errors) : undefined)
        );
    /**
     * Change Image
     */
    case CHANGE_IMAGE:
      return state
        .set('changeImageRequest', state.get('changeImageRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case CHANGE_IMAGE_SUCCESS:
      return state
        .set('changeImageRequest', state.get('changeImageRequest')
          .set('loading', false)
          .set('success', true)
        );
    case CHANGE_IMAGE_FAIL:
      const changeImageError = action.error.response.data;
      return state
        .set('changeImageRequest', state.get('changeImageRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', changeImageError.code)
          .set('errorMessage', changeImageError.message)
          .set('errors', changeImageError.code === 422 ? Immutable.fromJS(changeImageError.errors) : undefined)
        );
    /**
     * default
     */
    default:
      return state;
  }
}