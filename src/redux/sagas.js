import { all } from 'redux-saga/effects';
import appSagas from './app/sagas';
import authSagas from './auth/sagas';

function* rootSaga () {
  yield all([,
    appSagas,
    authSagas
  ])
}

export default rootSaga;