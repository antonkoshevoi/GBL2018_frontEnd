import { all } from 'redux-saga/effects';
import appSagas from './app/sagas';
import authSagas from './auth/sagas';
import studentsSagas from './students/sagas';

function* rootSaga () {
  yield all([,
    appSagas,
    authSagas,
    studentsSagas
  ])
}

export default rootSaga;