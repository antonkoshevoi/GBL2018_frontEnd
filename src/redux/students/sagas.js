import { all, takeLatest } from 'redux-saga/effects';
import {
  BULK_UPLOAD_FAIL, BULK_UPLOAD_SUCCESS, CREATE_FAIL, CREATE_SUCCESS, GET_RECORDS_FAIL,
  GET_SINGLE_RECORD_FAIL, UPDATE_FAIL,
  UPDATE_SUCCESS
} from './actions';
import { getErrorMessage, yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';
import toastr from 'toastr';

function* afterBulkUploadFailed (action) {
  if(typeof action.error.response === 'undefined') {
    toastr.error(
      i18n.t('messages:errors:canceled')
    );
  } else {
    toastr.error(
      getErrorMessage(action.error.response)
    );
  }
}

const studentsSagas = all([
  takeLatest(BULK_UPLOAD_FAIL, afterBulkUploadFailed),
  yieldSuccessToasts({
    [CREATE_SUCCESS]: i18n.t('messages:created'),
    [UPDATE_SUCCESS]: i18n.t('messages:updated'),
    [BULK_UPLOAD_SUCCESS]: i18n.t('messages:uploaded')
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_SINGLE_RECORD_FAIL,
    CREATE_FAIL,
    UPDATE_FAIL
  ]),
]);

export default studentsSagas;