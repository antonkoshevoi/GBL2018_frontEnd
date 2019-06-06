import { all, takeLatest, put } from 'redux-saga/effects';
import {
  UPDATE_FAIL, UPDATE_SUCCESS,
  CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS,
  GET_USER_SUCCESS
} from './actions';
import { updateShoppingCartCount } from '../store/actions';
import { updateUnreadMessages } from '../messages/actions';

import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

function* yieldSuccessGetUser(action) {
    yield put(updateShoppingCartCount(action.result.data.cartItems));
    yield put(updateUnreadMessages(action.result.data.newMessagesCount));    
}

const userSagas = all([
  yieldSuccessToasts({
    [UPDATE_SUCCESS]: i18n.t('messages:profileUpdated'),
    [CHANGE_PASSWORD_SUCCESS]: i18n.t('messages:passwordChanged'),
  }),
  yieldErrorToasts([
    UPDATE_FAIL,
    CHANGE_PASSWORD_FAIL
  ]),
  takeLatest(GET_USER_SUCCESS, yieldSuccessGetUser)
]);

export default userSagas;