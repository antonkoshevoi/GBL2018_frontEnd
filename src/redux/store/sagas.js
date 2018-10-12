import { all, takeLatest,put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  GET_RECORDS_FAIL,
  GET_SINGLE_RECORD_FAIL,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_SUCCESS,
  GET_CART_RECORDS_FAIL, SET_SHIPPING_BILLING_INFO, setToStoreContact,
} from './actions';
import {yieldErrorToasts, yieldSuccessToasts} from '../../helpers/utils';
import i18n from '../../configs/i18n';

function* yieldSuccessCardAdd (action) {
  yield put(push('/store/shopping-cart'));
}

function* yieldsContactInfo ({payload}) {
  yield put(setToStoreContact(payload))
}

const storeSagas = all([
  yieldSuccessToasts({
    [ADD_TO_CART_SUCCESS]: i18n.t('messages:store:cartAdded'),
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