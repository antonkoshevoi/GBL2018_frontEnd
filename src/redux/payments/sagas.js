import { all, takeLatest, put } from 'redux-saga/effects';
import SessionStorage from '../../services/SessionStorage';

import {
  CREATE_CHECK_PAYMENT_SUCCESS, CREATE_CC_PAYMENT_SUCCESS, EXECUTE_PAYPAL_PAYMENT_SUCCESS
} from './actions';

function* onSuccessPayment () {
  yield put(() => {
    SessionStorage.remove('invoiceNo', {path: '/'});
    SessionStorage.remove('discountCode', {path: '/'});    
  });
}

const paymentsSagas = all([
  takeLatest(CREATE_CHECK_PAYMENT_SUCCESS, onSuccessPayment),
  takeLatest(CREATE_CC_PAYMENT_SUCCESS, onSuccessPayment),
  takeLatest(EXECUTE_PAYPAL_PAYMENT_SUCCESS, onSuccessPayment)
]);

export default paymentsSagas;