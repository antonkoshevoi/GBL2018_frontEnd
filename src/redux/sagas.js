import { all } from 'redux-saga/effects';
import loginSagas from './auth/sagas';

function* rootSaga () {
  yield all([
    loginSagas
  ])
}

export default rootSaga;