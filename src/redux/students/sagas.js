import { all, takeLatest } from 'redux-saga/effects';
import { BULK_UPLOAD_FAIL } from './actions';
import i18n from '../../configs/i18n';
import toastr from 'toastr';
import { getErrorMessage } from '../../helpers/utils';

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
]);

export default studentsSagas;