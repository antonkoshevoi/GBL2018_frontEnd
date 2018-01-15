import { all, select, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import { INITIAL_LOGIN_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './actions';
import { selectRedirectAfterLogin } from "./selectors";
import SessionStorage from '../../services/SessionStorage';

function* afterLoginSuccess (action) {
  let redirectTo = yield select( selectRedirectAfterLogin );
  redirectTo = redirectTo ? redirectTo : '/';

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