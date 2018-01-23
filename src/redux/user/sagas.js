import { all } from 'redux-saga/effects';
import {
  UPDATE_FAIL, UPDATE_SUCCESS,
  CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS
} from './actions';
import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const userSagas = all([
  yieldSuccessToasts({
    [UPDATE_SUCCESS]: i18n.t('messages:profileUpdated'),
    [CHANGE_PASSWORD_SUCCESS]: i18n.t('messages:passwordChanged'),
  }),
  yieldErrorToasts([
    UPDATE_FAIL,
    CHANGE_PASSWORD_FAIL
  ]),
]);

export default userSagas;