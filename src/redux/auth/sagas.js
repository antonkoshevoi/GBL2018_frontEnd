import { all, select, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { LOGIN_SUCCESS, 
    LOGIN_SUCCESS_REMEMBER, 
    LOGOUT_SUCCESS, 
    RESTORE_LOGIN, 
    RESET_PASSWORD_FAIL, 
    GET_RESET_PASSWORD_USER_FAIL,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS, 
    setCallback } from './actions';
import i18n from '../../configs/i18n';
import { selectRedirectAfterLogin, selectCallback } from "./selectors";
import { load } from '../app/actions';
import { resetGetUserRequest } from '../user/actions';
import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';

function* afterLoginSuccess() {
  let redirectTo = yield select( selectRedirectAfterLogin );
  redirectTo = redirectTo ? redirectTo : '/';

  const callback = yield select( selectCallback );

  if(typeof callback === 'function') {
    callback();
    yield put(setCallback(undefined))
  }

  yield put(load());
  yield put(push(redirectTo));
}

function* afterLoginWasRestored() {
  const callback = yield select( selectCallback );

  if(typeof callback === 'function') {
    callback();
    yield put(setCallback(undefined))
  }
}

function* afterLogoutSuccess() {
  yield put(resetGetUserRequest());
  yield put(push('/'));
}

const authSagas = all([
  yieldSuccessToasts({
    [UPDATE_PASSWORD_SUCCESS]: i18n.t('messages:passwordUpdatedLoginPlease')
  }),
  yieldErrorToasts([
    RESET_PASSWORD_FAIL, 
    GET_RESET_PASSWORD_USER_FAIL,
    UPDATE_PASSWORD_FAIL
  ]),    
  takeLatest(LOGIN_SUCCESS_REMEMBER, afterLoginSuccess),
  takeLatest(RESTORE_LOGIN, afterLoginWasRestored),
  takeLatest(LOGIN_SUCCESS, afterLoginSuccess),  
  takeLatest(LOGOUT_SUCCESS, afterLogoutSuccess)
]);

export default authSagas;