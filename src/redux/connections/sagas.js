import { all, put, takeLatest } from 'redux-saga/effects';

import {
    GET_RECORDS_FAIL, 
    GET_RECORD_FAIL, 
    CREATE_SUCCESS, CREATE_FAIL,
    ACCEPT_SUCCESS, ACCEPT_FAIL, 
    ACCEPT_PUBLIC_SUCCESS, ACCEPT_PUBLIC_FAIL, 
    DECLINE_SUCCESS, DECLINE_FAIL, 
    DELETE_SUCCESS, DELETE_FAIL
} from './actions';
import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';
import { restoreLogin } from '../auth/actions';

function* onSuccess (action) {    
    yield put(restoreLogin());
}

const connectionsSagas = all([ 
  takeLatest(ACCEPT_PUBLIC_SUCCESS, onSuccess),
  yieldSuccessToasts({
    [CREATE_SUCCESS]: i18n.t('messages:connectionRequestHasBeenSent'),            
    [ACCEPT_SUCCESS]: i18n.t('messages:connectionRequestIsAccepted'),       
    [DECLINE_SUCCESS]: i18n.t('messages:connectionRequestIsDeclined'),
    [DELETE_SUCCESS]: i18n.t('messages:connectionRequestIsDeleted')
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL, 
    GET_RECORD_FAIL,
    CREATE_FAIL, 
    ACCEPT_FAIL, 
    ACCEPT_PUBLIC_FAIL,
    DECLINE_FAIL, 
    DELETE_FAIL
  ])
]);

export default connectionsSagas;