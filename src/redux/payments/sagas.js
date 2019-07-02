import { all, takeLatest, put } from 'redux-saga/effects';
import SessionStorage from '../../services/SessionStorage';

import {
  CREATE_CHECK_PAYMENT_SUCCESS, CREATE_CC_PAYMENT_SUCCESS, EXECUTE_PAYPAL_PAYMENT_SUCCESS, CREATE_FREE_CHECKOUT_SUCCESS,
  CREATE_PAYPAL_PAYMENT_FAIL, EXECUTE_PAYPAL_PAYMENT_FAIL, CREATE_CHECK_PAYMENT_FAIL, CREATE_CC_PAYMENT_FAIL, CREATE_FREE_CHECKOUT_FAIL, GET_INVOICE_FAIL
} from './actions';

import {yieldErrorToasts} from '../../helpers/utils';

function* onSuccessPayment () {
  yield put(() => {
    SessionStorage.remove('invoiceNo', {path: '/'});
    SessionStorage.remove('discountCode', {path: '/'});    
  });
}

const paymentsSagas = all([
  takeLatest(CREATE_CHECK_PAYMENT_SUCCESS, onSuccessPayment),
  takeLatest(CREATE_CC_PAYMENT_SUCCESS, onSuccessPayment),
  takeLatest(EXECUTE_PAYPAL_PAYMENT_SUCCESS, onSuccessPayment),
  takeLatest(CREATE_FREE_CHECKOUT_SUCCESS, onSuccessPayment),
  yieldErrorToasts([
    CREATE_PAYPAL_PAYMENT_FAIL, 
    EXECUTE_PAYPAL_PAYMENT_FAIL, 
    CREATE_CHECK_PAYMENT_FAIL, 
    CREATE_CC_PAYMENT_FAIL, 
    CREATE_FREE_CHECKOUT_FAIL, 
    GET_INVOICE_FAIL
  ])
]);

export default paymentsSagas;