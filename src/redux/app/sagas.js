import { all, put, takeLatest } from 'redux-saga/effects';
import { LOAD, LOAD_SUCCESS_AUTHENTICATED } from './actions';
import { restoreLogin } from '../auth/actions';
import { getUserSucess } from '../user/actions';
import SessionStorage from '../../services/SessionStorage';

function* onLoad (action) {
  const token = SessionStorage.get('token');

  if (token) {
    yield put(restoreLogin());
  }
}

function* afterLoadSuccess (action) {
  if(action.result) {
    yield put (getUserSucess (action.result[0]));
  }
}

const appSagas = all([
  takeLatest(LOAD, onLoad),
  takeLatest(LOAD_SUCCESS_AUTHENTICATED, afterLoadSuccess),
]);

export default appSagas;