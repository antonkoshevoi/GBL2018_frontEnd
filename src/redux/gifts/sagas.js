import { all } from 'redux-saga/effects';

import {
    GET_RECORDS_FAIL,
    GET_RECORD_FAIL,
    GIFT_COURSE_SUCCESS,
    GIFT_SUBSCRIPTION_SUCCESS,
    GIFT_FAIL,
    DELETE_SUCCESS,
    DELETE_FAIL,    
    ACCEPT_SUCCESS,
    ACCEPT_FAIL,
    DECLINE_SUCCESS,
    DECLINE_FAIL
} from './actions';

import {yieldErrorToasts, yieldSuccessToasts} from '../../helpers/utils';
import i18n from '../../configs/i18n';

const giftsSagas = all([
  yieldSuccessToasts({
    [GIFT_COURSE_SUCCESS]: i18n.t('messages:courseCreditDonated'),
    [GIFT_SUBSCRIPTION_SUCCESS]: i18n.t('messages:subscriptionDonated'),
    [DELETE_SUCCESS]: i18n.t('messages:giftDeleted'),
    [DECLINE_SUCCESS]: i18n.t('messages:giftDeclined'),
    [ACCEPT_SUCCESS]: i18n.t('messages:giftAccepted')
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_RECORD_FAIL,
    GIFT_FAIL,
    DELETE_FAIL,
    ACCEPT_FAIL,
    DECLINE_FAIL
  ])
]);

export default giftsSagas;