import { all, put, takeLatest } from 'redux-saga/effects';

import {
    GET_RECORDS_FAIL, 
    GET_RECORD_FAIL,
    CREATE_SUCCESS, CREATE_FAIL, 
    GET_STUDENTS_FAIL,
    GET_STUDENT_REQUESTS_FAIL, 
    ACCEPT_STUDENT_SUCCESS, ACCEPT_STUDENT_FAIL,
    ACCEPT_STUDENT_PUBLIC_SUCCESS, ACCEPT_STUDENT_PUBLIC_FAIL,
    DECLINE_STUDENT_SUCCESS, DECLINE_STUDENT_FAIL, 
    DELETE_STUDENT_REQUST_SUCCESS, DELETE_STUDENT_REQUST_FAIL, 
    SENT_STUDENT_REQUEST_SUCCESS, SENT_STUDENT_REQUEST_FAIL    
} from './actions';
import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';
import { restoreLogin } from '../auth/actions';

function* onSuccess (action) {    
    yield put(restoreLogin());
}

const studentParentsSagas = all([ 
  takeLatest(ACCEPT_STUDENT_PUBLIC_SUCCESS, onSuccess),
  yieldSuccessToasts({
    [CREATE_SUCCESS]: i18n.t('messages:parentAccountCreated'),            
    [SENT_STUDENT_REQUEST_SUCCESS]: i18n.t('messages:requestHasBeenSent'),    
    [ACCEPT_STUDENT_SUCCESS]: i18n.t('messages:studentRequestIsAccepted'),
    [ACCEPT_STUDENT_PUBLIC_SUCCESS]: i18n.t('messages:studentRequestIsAccepted'),
    [DECLINE_STUDENT_SUCCESS]: i18n.t('messages:studentRequestIsDeclined'),
    [DELETE_STUDENT_REQUST_SUCCESS]: i18n.t('messages:studentRequestIsDeleted'),
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL, 
    GET_RECORD_FAIL,
    CREATE_FAIL, 
    GET_STUDENTS_FAIL,
    GET_STUDENT_REQUESTS_FAIL, 
    ACCEPT_STUDENT_FAIL,
    DECLINE_STUDENT_FAIL, 
    DELETE_STUDENT_REQUST_FAIL, 
    SENT_STUDENT_REQUEST_FAIL,
    ACCEPT_STUDENT_PUBLIC_FAIL
  ])
]);

export default studentParentsSagas;