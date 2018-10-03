import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import {
  CREATE_FAIL, 
  CREATE_SUCCESS, 
  DELETE_RECORD_FAIL, 
  DELETE_RECORD_SUCCESS, 
  GET_RECORDS_FAIL,
  GET_SINGLE_RECORD_FAIL
} from './actions';
import { all } from 'redux-saga/effects';
import i18n from '../../configs/i18n';
import { ACCEPT_FAIL, DECLINE_FAIL } from './actions';

const invitationsSagas = all([
  yieldSuccessToasts({
    [CREATE_SUCCESS]: i18n.t('messages:created'),
    [DELETE_RECORD_SUCCESS]: i18n.t('messages:deleted'),
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_SINGLE_RECORD_FAIL,
    CREATE_FAIL,
    DELETE_RECORD_FAIL,
    DECLINE_FAIL,
    ACCEPT_FAIL
  ]),
]);

export default invitationsSagas;