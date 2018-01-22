import { all, select, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './actions';
import { selectRedirectAfterLogin } from "./selectors";
import { load } from '../app/actions';

function* afterLoginSuccess (action) {
  let redirectTo = yield select( selectRedirectAfterLogin );
  redirectTo = redirectTo ? redirectTo : '/';

  yield put(load());
  yield put(push(redirectTo));
}

function* afterLogoutSuccess (action) {
  yield put(push('/login'));
}

const authSagas = all([
  // takeLatest(INITIAL_LOGIN_SUCCESS, afterInitialLoginSuccess),
  takeLatest(LOGIN_SUCCESS, afterLoginSuccess),
  takeLatest(LOGOUT_SUCCESS, afterLogoutSuccess)
]);

export default authSagas;