import { all } from 'redux-saga/effects';
import appSagas from './app/sagas';
import authSagas from './auth/sagas';
import signupSagas from './signup/sagas';
import studentsSagas from './students/sagas';
import teachersSagas from './teachers/sagas';
import parentsSagas from './parents/sagas';
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
import studentParentsSagas from './student-parents/sagas';
import connectionsSagas from './connections/sagas';
import courseCreditsSagas from './course-credits/sagas';
import giftsSagas from './gifts/sagas';
import paymentsSagas from './payments/sagas';

function* rootSaga () {
  yield all([
    appSagas,
    authSagas,
    signupSagas,    
    studentsSagas,
    teachersSagas,
    administrationSagas,
    parentsSagas,
    homeroomsSagas,
    classroomsSagas,    
    messagesSagas,
    userSagas,
    storeSagas,
    invitationsSagas,
    schoolSagas,
    subscriptionSagas,
    scapSagas,
    studentParentsSagas,
    connectionsSagas,
    courseCreditsSagas,
    paymentsSagas,
    giftsSagas
  ])
}

export default rootSaga;