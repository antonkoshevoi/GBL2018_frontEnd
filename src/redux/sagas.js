import { all } from 'redux-saga/effects';
import appSagas from './app/sagas';
import authSagas from './auth/sagas';
import studentsSagas from './students/sagas';
import teachersSagas from './teachers/sagas';
import administrationSagas from './administration/sagas';
import homeroomsSagas from './homerooms/sagas';
import classroomsSagas from './classrooms/sagas';

function* rootSaga () {
  yield all([,
    appSagas,
    authSagas,
    studentsSagas,
    teachersSagas,
    administrationSagas,
    homeroomsSagas,
    classroomsSagas
  ])
}

export default rootSaga;