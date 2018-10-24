import { all } from 'redux-saga/effects';

import {
    GET_RECORDS_FAIL,
    GIFT_SUCCESS, GIFT_FAIL, 
    ASSIGN_SUCCESS, ASSIGN_FAIL
} from './actions';

import {yieldErrorToasts, yieldSuccessToasts} from '../../helpers/utils';
import i18n from '../../configs/i18n';

const courseCreditsSagas = all([
  yieldSuccessToasts({
    [GIFT_SUCCESS]: i18n.t('messages:courseCreditDonated'),
    [ASSIGN_SUCCESS]: i18n.t('messages:courseCreditAssigned')
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GIFT_FAIL,
    ASSIGN_FAIL
  ])
]);

export default courseCreditsSagas;