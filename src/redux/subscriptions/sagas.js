import { all } from 'redux-saga/effects';
import { GET_RECORDS_FAIL, GET_RECORD_FAIL, SUBSCRIBE_STUDENT_SUCCESS, UNSUBSCRIBE_STUDENT_SUCCESS } from './actions';
import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const subscriptionSagas = all([
  yieldSuccessToasts({
    [SUBSCRIBE_STUDENT_SUCCESS]: i18n.t('messages:studentSubscribedToCourse'),
    [UNSUBSCRIBE_STUDENT_SUCCESS]: i18n.t('messages:studentUnsubscribeFromCourse')
  }),    
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_RECORD_FAIL
  ])
]);

export default subscriptionSagas;