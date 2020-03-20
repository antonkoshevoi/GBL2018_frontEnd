import { all, put, takeLatest } from 'redux-saga/effects';
import {LOAD, LOAD_FAIL, LOAD_SUCCESS_AUTHENTICATED} from './actions';
import {restoreLogin, restoreLoginFail} from '../auth/actions';
import { getUserSuccess } from '../user/actions';
import SessionStorage from '../../services/SessionStorage';
import { subscribe as subscribeToMessages } from '../messages/actions';
//import {destroyTokenSession} from "../../helpers/session";

function* onLoad() {
  const token = SessionStorage.get('token');
  const refreshToken = SessionStorage.get('refreshToken');

  if (token || refreshToken) {
    yield put(restoreLogin());
  }

}

function* afterLoadSuccess (action) {
  if(action.result) {
    const userResults = action.result[0];          
    //let user reducer take care of response
    yield put ( subscribeToMessages(userResults.data.id) );
    yield put ( getUserSuccess(userResults) );
  }
}


function* loadFail () {
    // destroyTokenSession();

    //const userData = SessionStorage.get('userData');

    // if (userData) {
        yield put(restoreLoginFail());
    // }
}


const appSagas = all([
  takeLatest(LOAD, onLoad),
  takeLatest(LOAD_SUCCESS_AUTHENTICATED, afterLoadSuccess),
  takeLatest(LOAD_FAIL, loadFail)
]);

export default appSagas;