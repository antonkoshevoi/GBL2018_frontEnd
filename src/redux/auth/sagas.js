import { all, select, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import { INITIAL_LOGIN_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './actions';
import { selectRedirectAfterLogin } from "./selectors";
import SessionStorage from '../../services/SessionStorage';

function* afterInitalLoginSuccess (action) {
  const { token, expiresAt, refreshToken } = action.result.data;

  const options = {
    expires: new Date(expiresAt * 1000)
  };

  SessionStorage.set('token', token, options);
  SessionStorage.set('tokenExpiresAt', options.expires, options);
  SessionStorage.set('refreshToken', refreshToken, options);
}

function* afterLoginSuccess (action) {

  const { token, expiresAt, refreshToken } = action.result.data;

  const options = {
    expires: new Date(expiresAt * 1000)
  };

  SessionStorage.set('token', token, options);
  SessionStorage.set('tokenExpiresAt', options.expires, options);
  SessionStorage.set('refreshToken', refreshToken, options);

  let redirectTo = yield select( selectRedirectAfterLogin );
  redirectTo = redirectTo ? redirectTo : '/';

  yield put(push(redirectTo));
}

function* afterLogoutSuccess (action) {
  SessionStorage.remove('token');
  SessionStorage.remove('tokenExpiresAt');
  SessionStorage.remove('refreshToken');

  yield put(push('/login'));
}

const authSagas = all([
  takeLatest(INITIAL_LOGIN_SUCCESS, afterInitalLoginSuccess),
  takeLatest(LOGIN_SUCCESS, afterLoginSuccess),
  takeLatest(LOGOUT_SUCCESS, afterLogoutSuccess)
]);

export default authSagas;