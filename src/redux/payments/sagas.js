import { all, takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import SessionStorage from '../../services/SessionStorage';
import { yieldErrorToasts } from '../../helpers/utils';
import { saveSession } from '../../helpers/session';
import { restoreLogin } from '../auth/actions';
import { load } from '../app/actions';
import i18n from '../../configs/i18n';
import toastr from 'toastr';

import {
  CREATE_CHECK_PAYMENT_SUCCESS, CREATE_CC_PAYMENT_SUCCESS, EXECUTE_PAYPAL_PAYMENT_SUCCESS, CREATE_FREE_CHECKOUT_SUCCESS,
  CREATE_PAYPAL_PAYMENT_FAIL, EXECUTE_PAYPAL_PAYMENT_FAIL, CREATE_CHECK_PAYMENT_FAIL, 
  CREATE_CC_PAYMENT_FAIL, CREATE_FREE_CHECKOUT_FAIL, GET_INVOICE_FAIL
} from './actions';

function* onSuccessPayment (action) {
    
    yield put(() => {
        SessionStorage.remove('invoiceNo');
        SessionStorage.remove('discountCode');        
    });
    
    if (action.result.data.token) {
        yield put(() => saveSession(action.result.data));
        yield put(restoreLogin());
        yield put(load());        
    }
    if (action.result.data.isDigital) {
        SessionStorage.remove('invoiceNo', {path: '/'});
                
        yield toastr.success(i18n.t('messages:paymentMade'));        
  
        yield put(push('/downloads'));
    }
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