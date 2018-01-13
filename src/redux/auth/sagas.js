import { put, takeLatest  } from 'redux-saga/effects';
import { LOGIN, loginFail } from './actions';

function* login(action) {
  yield put(loginFail());
  // action.promise()
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     yield put(loginFail());
  //   });

  try {


    // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
  } catch (e) {
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

const loginSagas = [
  takeLatest(LOGIN, login)
];

export default loginSagas;