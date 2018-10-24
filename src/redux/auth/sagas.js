import { all, select, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { LOGIN_SUCCESS, LOGIN_SUCCESS_REMEMBER, LOGOUT_SUCCESS, RESTORE_LOGIN, setCallback } from './actions';
import { selectRedirectAfterLogin, selectCallback } from "./selectors";
import { load } from '../app/actions';
import { resetGetUserRequest } from '../user/actions';

function* afterLoginSuccess (action) {
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

function* afterLoginWasRestored (action) {
  const callback = yield select( selectCallback );

  if(typeof callback === 'function') {
    callback();
    yield put(setCallback(undefined))
  }
}

function* afterLogoutSuccess (action) {
  yield put(resetGetUserRequest());
  yield put(push('/dashboard'));
}

const authSagas = all([
  // takeLatest(INITIAL_LOGIN_SUCCESS, afterInitialLoginSuccess),
  takeLatest(LOGIN_SUCCESS_REMEMBER, afterLoginSuccess),
  takeLatest(RESTORE_LOGIN, afterLoginWasRestored),
  takeLatest(LOGIN_SUCCESS, afterLoginSuccess),
  takeLatest(LOGOUT_SUCCESS, afterLogoutSuccess)
]);

export default authSagas;