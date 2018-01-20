import { all } from 'redux-saga/effects';
import {
  CREATE_FAIL, CREATE_SUCCESS, GET_RECORDS_FAIL, GET_SCHOOLS_FAIL,
  GET_SINGLE_RECORD_FAIL, UPDATE_FAIL, BULK_UPLOAD_SUCCESS,
  UPDATE_SUCCESS, BULK_UPLOAD_FAIL
} from './actions';
import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const homeroomSagas = all([
  yieldSuccessToasts({
    [CREATE_SUCCESS]: i18n.t('messages:created'),
    [UPDATE_SUCCESS]: i18n.t('messages:updated'),
    [BULK_UPLOAD_SUCCESS]: i18n.t('messages:uploaded')
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_SINGLE_RECORD_FAIL,
    GET_SCHOOLS_FAIL,
    CREATE_FAIL,
    UPDATE_FAIL,
    BULK_UPLOAD_FAIL
  ]),
]);

export default homeroomSagas;