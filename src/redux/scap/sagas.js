import { all } from 'redux-saga/effects';
import { 
    GET_RECORDS_FAIL,
    GET_ASSIGNED_RECORDS_FAIL,
    GET_RECORD_FAIL,
    GET_ASSIGNED_RECORD_FAIL,
    CREATE_FAIL,
    DELETE_FAIL,
    ASSIGN_TEACHERS_FAIL,
    DELETE_SUCCESS,
    CREATE_SUCCESS,
    UPDATE_SUCCESS,
    ASSIGN_TEACHERS_SUCCESS
} from './actions';

import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const scapSagas = all([
  yieldSuccessToasts({
      [DELETE_SUCCESS]: i18n.t('messages:deleted'),
      [CREATE_SUCCESS]: i18n.t('messages:scapTemplateCreated'),
      [UPDATE_SUCCESS]: i18n.t('messages:scapTemplateUpdated'),
      [ASSIGN_TEACHERS_SUCCESS]: i18n.t('messages:scapTemplateTeachersAssigned')
  }),    
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_ASSIGNED_RECORDS_FAIL,
    GET_RECORD_FAIL,
    GET_ASSIGNED_RECORD_FAIL,
    CREATE_FAIL,
    DELETE_FAIL,
    ASSIGN_TEACHERS_FAIL
  ])
]);

export default scapSagas;