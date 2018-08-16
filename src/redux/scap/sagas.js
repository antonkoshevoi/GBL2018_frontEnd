import { all } from 'redux-saga/effects';
import { 
    GET_RECORDS_FAIL, 
    GET_RECORD_FAIL
} from './actions';

import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const scapSagas = all([
  yieldSuccessToasts({
  }),    
  yieldErrorToasts([
    GET_RECORDS_FAIL, 
    GET_RECORD_FAIL
  ])
]);

export default scapSagas;