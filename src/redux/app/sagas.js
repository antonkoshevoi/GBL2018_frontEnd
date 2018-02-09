import { all, put, takeLatest } from 'redux-saga/effects';
import {LOAD, LOAD_FAIL, LOAD_SUCCESS_AUTHENTICATED} from './actions';
import {refreshLogin, restoreLogin, restoreLoginFail} from '../auth/actions';
import { subscribe as subscribeToNotifications } from '../notifications/actions';
import { subscribe as subscribeToMessages } from '../messages/actions';
import { getUserSuccess } from '../user/actions';
import SessionStorage from '../../services/SessionStorage';
import {destroyTokenSession} from "../../helpers/session";

function* onLoad (action) {
  const token = SessionStorage.get('token');
  const refreshToken = SessionStorage.get('refreshToken');

  if (token || refreshToken) {
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


function* loadFail () {
    // destroyTokenSession();

    const userData = SessionStorage.get('userData');

    // if (userData) {
        yield put(restoreLoginFail());
    // }
}


const appSagas = all([
  takeLatest(LOAD, onLoad),
  takeLatest(LOAD_SUCCESS_AUTHENTICATED, afterLoadSuccess),
  takeLatest(LOAD_FAIL, loadFail),
]);

export default appSagas;