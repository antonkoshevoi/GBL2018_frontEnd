import { all, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import { SIGN_UP_SUCCESS } from './actions';
import { restoreLogin } from '../auth/actions';
import { load } from '../app/actions';

function* onSuccess (action) {
  yield put(restoreLogin());
  yield put(load());
  yield put(push('/dashboard'));
}

const principalSignUpSagas = all([
  takeLatest(SIGN_UP_SUCCESS, onSuccess),
]);

export default principalSignUpSagas;