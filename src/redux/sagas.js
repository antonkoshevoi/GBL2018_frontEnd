import { all } from 'redux-saga/effects';
import appSagas from './app/sagas';
import authSagas from './auth/sagas';
import parentSignUpSagas from './signUpParent/sagas';
import principalSignUpSagas from './signUpPrincipal/sagas';
import studentsSagas from './students/sagas';
import teachersSagas from './teachers/sagas';
import administrationSagas from './administration/sagas';
import homeroomsSagas from './homerooms/sagas';
import classroomsSagas from './classrooms/sagas';
import messagesSagas from './messages/sagas';
import userSagas from './user/sagas';
import storeSagas from './store/sagas';
import invitationsSagas from './invitations/sagas';
import schoolSagas from './schools/sagas';
import subscriptionSagas from './subscriptions/sagas';
import scapSagas from './scap/sagas';
import parentsSagas from './parents/sagas';

function* rootSaga () {
  yield all([
    appSagas,
    authSagas,
    parentSignUpSagas,
    principalSignUpSagas,
    studentsSagas,
    teachersSagas,
    administrationSagas,
    homeroomsSagas,
    classroomsSagas,    
    messagesSagas,
    userSagas,
    storeSagas,
    invitationsSagas,
    schoolSagas,
    subscriptionSagas,
    scapSagas,
    parentsSagas
  ])
}

export default rootSaga;