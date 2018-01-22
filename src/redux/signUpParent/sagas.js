import { all, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_SUCCESS } from './actions';
import { restoreLogin } from '../auth/actions';

function* onSuccess (action) {
  yield put(restoreLogin());
}

const parentSignUpSagas = all([
  takeLatest(SIGN_UP_SUCCESS, onSuccess),
]);

export default parentSignUpSagas;