import { all, takeLatest,put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  GET_RECORDS_FAIL,
  GET_SINGLE_RECORD_FAIL,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_SUCCESS,
  GET_CART_RECORDS_FAIL, SET_SHIPPING_BILLING_INFO, setToStoreContact,


} from './actions';
import {getErrorMessage, yieldErrorToasts, yieldSuccessToasts} from '../../helpers/utils';
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

function* yieldSuccessCardAdd (action) {
  yield put(push('/store/shopping-cart'));
}

function* yieldsContactInfo ({payload}) {

  yield put(setToStoreContact(payload))
}


const storeSagas = all([
  yieldSuccessToasts({
    [ADD_TO_CART_SUCCESS]: i18n.t('store:cartAdded'),
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_SINGLE_RECORD_FAIL,
    ADD_TO_CART_FAIL,
    GET_CART_RECORDS_FAIL
  ]),
  takeLatest(ADD_TO_CART_SUCCESS, yieldSuccessCardAdd),
  takeLatest(SET_SHIPPING_BILLING_INFO, yieldsContactInfo)
]);

export default storeSagas;