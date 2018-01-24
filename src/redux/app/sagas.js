import { all, put, takeLatest } from 'redux-saga/effects';
import { LOAD, LOAD_SUCCESS_AUTHENTICATED } from './actions';
import { restoreLogin } from '../auth/actions';
import { subscribe as subscribeToNotifications } from '../notifications/actions';
import { subscribe as subscribeToMessages } from '../messages/actions';
import { getUserSuccess } from '../user/actions';
import SessionStorage from '../../services/SessionStorage';

function* onLoad (action) {
  const token = SessionStorage.get('token');

  if (token) {
    yield put(restoreLogin());
  }
}

function* afterLoadSuccess (action) {
  if(action.result) {
    const userResults = action.result[0];

    //subscribe to user's notifications & messages channels
    yield put ( subscribeToNotifications(userResults.data.id) );
    yield put ( subscribeToMessages(userResults.data.id) );
    //let user reducer take care of response
    yield put ( getUserSuccess(userResults) );
  }
}

const appSagas = all([
  takeLatest(LOAD, onLoad),
  takeLatest(LOAD_SUCCESS_AUTHENTICATED, afterLoadSuccess),
]);

export default appSagas;