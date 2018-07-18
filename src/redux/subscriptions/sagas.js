import { all } from 'redux-saga/effects';
import { GET_RECORDS_FAIL, GET_RECORD_FAIL } from './actions';
import { yieldErrorToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const subscriptionSagas = all([
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_RECORD_FAIL
  ])
]);

export default subscriptionSagas;