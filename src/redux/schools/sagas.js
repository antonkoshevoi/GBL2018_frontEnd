import { all } from 'redux-saga/effects';
import {
  UPDATE_FAIL, UPDATE_SUCCESS,
} from './actions';
import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const schoolSagas = all([
  yieldSuccessToasts({
    [UPDATE_SUCCESS]: i18n.t('messages:profileUpdated'),
  }),
  yieldErrorToasts([
    UPDATE_FAIL,
  ]),
]);

export default schoolSagas;