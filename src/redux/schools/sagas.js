import { all } from 'redux-saga/effects';
import {
    UPDATE_FAIL, 
    GET_SCHOOLS_FAIL,
    GET_SCHOOL_FAIL,
    GET_SCHOOL_TEACHERS_FAIL,
    GET_SCHOOL_STUDENTS_FAIL,
    GET_SCHOOL_HOMEROOMS_FAIL,
    GET_SCHOOL_CLASSROOMS_FAIL,
    UPDATE_SUCCESS,
} from './actions';
import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const schoolSagas = all([
  yieldSuccessToasts({
    [UPDATE_SUCCESS]: i18n.t('messages:profileUpdated')
  }),
  yieldErrorToasts([
    UPDATE_FAIL, 
    GET_SCHOOLS_FAIL,
    GET_SCHOOL_FAIL,
    GET_SCHOOL_TEACHERS_FAIL,
    GET_SCHOOL_STUDENTS_FAIL,
    GET_SCHOOL_HOMEROOMS_FAIL,
    GET_SCHOOL_CLASSROOMS_FAIL
  ])
]);

export default schoolSagas;
    
