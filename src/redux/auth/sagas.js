import { all, select, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import { LOGIN_SUCCESS } from './actions';
import { selectRedirectAfterLogin } from "./selectors";
import Cookies from 'universal-cookie';

function* afterLoginSuccess (action) {

  const { token, expiresAt, refreshToken } = action.result.data;

  const cookies = new Cookies();

  const options = {
    expires: new Date(expiresAt * 1000)
  };

  cookies.set('token', token, options);
  cookies.set('tokenExpiresAt', options.expires, options);
  cookies.set('refreshToken', refreshToken, options);

  let redirectTo = yield select( selectRedirectAfterLogin );
  redirectTo = redirectTo ? redirectTo : '/';

  yield put(push(redirectTo));
}

const authSagas = all([
  takeLatest(LOGIN_SUCCESS, afterLoginSuccess)
]);

export default authSagas;