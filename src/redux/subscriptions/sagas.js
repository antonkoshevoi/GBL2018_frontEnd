import { all } from 'redux-saga/effects';
import { 
    GET_RECORDS_FAIL, 
    GET_RECORD_FAIL, 
    GET_STUDENTS_RECORDS_FAIL, 
    GET_USER_RECORDS_FAIL, 
    SUBSCRIBE_FAIL, 
    UNSUBSCRIBE_FAIL, 
    GET_INVOICE_FAIL, 
    SUBSCRIBE_STUDENT_FAIL, 
    UNSUBSCRIBE_STUDENT_FAIL, 
    GET_PAYMENTS_FAIL,
    SUBSCRIBE_STUDENT_SUCCESS, 
    UNSUBSCRIBE_STUDENT_SUCCESS,
    UNSUBSCRIBE_SUCCESS
} from './actions';

import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const subscriptionSagas = all([
  yieldSuccessToasts({
    [SUBSCRIBE_STUDENT_SUCCESS]: i18n.t('messages:studentSubscribedToCourse'),
    [UNSUBSCRIBE_STUDENT_SUCCESS]: i18n.t('messages:studentUnsubscribedFromCourse'),
    [UNSUBSCRIBE_SUCCESS]: i18n.t('messages:subscriptionCancelled')    
  }),    
  yieldErrorToasts([
    GET_RECORDS_FAIL, 
    GET_RECORD_FAIL, 
    GET_STUDENTS_RECORDS_FAIL, 
    GET_USER_RECORDS_FAIL, 
    GET_PAYMENTS_FAIL,
    SUBSCRIBE_FAIL, 
    UNSUBSCRIBE_FAIL, 
    GET_INVOICE_FAIL, 
    SUBSCRIBE_STUDENT_FAIL, 
    UNSUBSCRIBE_STUDENT_FAIL    
  ])
]);

export default subscriptionSagas;