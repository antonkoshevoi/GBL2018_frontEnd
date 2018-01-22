import { all } from 'redux-saga/effects';
import {
  CREATE_FAIL, CREATE_SUCCESS, GET_RECORDS_FAIL,
  GET_SINGLE_RECORD_FAIL, UPDATE_FAIL,
  UPDATE_SUCCESS, DELETE_FAIL, DELETE_SUCCESS
} from './actions';
import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const teachersSagas = all([
  yieldSuccessToasts({
    [CREATE_SUCCESS]: i18n.t('messages:created'),
    [UPDATE_SUCCESS]: i18n.t('messages:updated'),
    [DELETE_SUCCESS]: i18n.t('messages:deleted'),
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_SINGLE_RECORD_FAIL,
    CREATE_FAIL,
    UPDATE_FAIL,
    DELETE_FAIL
  ]),
]);

export default teachersSagas;