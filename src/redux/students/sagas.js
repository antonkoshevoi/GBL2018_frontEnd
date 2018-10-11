import { all, takeLatest } from 'redux-saga/effects';
import {
  BULK_UPLOAD_FAIL, BULK_UPLOAD_SUCCESS, CREATE_FAIL, CREATE_SUCCESS, GET_RECORDS_FAIL,
  GET_SINGLE_RECORD_FAIL, UPDATE_FAIL,
  UPDATE_SUCCESS, DELETE_FAIL, DELETE_SUCCESS,
  GET_PARENT_FAIL, LINK_TO_PARENT_FAIL, CREATE_PARENT_FAIL,
  CREATE_PARENT_SUCCESS, LINK_TO_PARENT_SUCCESS,
  ACCEPT_STUDENT_SUCCESS,  ACCEPT_STUDENT_FAIL,
  DECLINE_STUDENT_SUCCESS, DECLINE_STUDENT_FAIL,
  DELETE_STUDENT_REQUST_SUCCESS, DELETE_STUDENT_REQUST_FAIL  
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
    [BULK_UPLOAD_SUCCESS]: i18n.t('messages:uploaded'),
    [DELETE_SUCCESS]: i18n.t('messages:deleted'),
    [CREATE_PARENT_SUCCESS]: i18n.t('messages:requestHasBeenSent'),
    [LINK_TO_PARENT_SUCCESS]: i18n.t('messages:parentAccountCreated'),
    [ACCEPT_STUDENT_SUCCESS]: i18n.t('messages:studentRequestIsAccepted'),
    [DECLINE_STUDENT_SUCCESS]: i18n.t('messages:studentRequestIsDeclined'),
    [DELETE_STUDENT_REQUST_SUCCESS]: i18n.t('messages:studentRequestIsDeleted')
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_SINGLE_RECORD_FAIL,
    CREATE_FAIL,
    UPDATE_FAIL,
    DELETE_FAIL,
    GET_PARENT_FAIL, 
    LINK_TO_PARENT_FAIL, 
    CREATE_PARENT_FAIL,
    ACCEPT_STUDENT_FAIL,
    DECLINE_STUDENT_FAIL,
    DELETE_STUDENT_REQUST_FAIL
  ]),
]);

export default studentsSagas;