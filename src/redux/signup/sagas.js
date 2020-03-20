import { all, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import { load } from '../app/actions';
import { SIGNUP_PARENT_SUCCESS, SIGNUP_PRINCIPAL_SUCCESS } from './actions';
import { restoreLogin } from '../auth/actions';

function* onSuccess() {
  yield put(restoreLogin());
}

function* onSuccessPrincipal() {
  yield put(restoreLogin());
  yield put(load());
  yield put(push('/dashboard'));
}

const signupSagas = all([
  takeLatest(SIGNUP_PARENT_SUCCESS, onSuccess),
  takeLatest(SIGNUP_PRINCIPAL_SUCCESS, onSuccessPrincipal)
]);

export default signupSagas;