import {all, takeLatest, put} from 'redux-saga/effects';
import {
  CREATE_FAIL, CREATE_SUCCESS, GET_RECORDS_FAIL,
  GET_SINGLE_RECORD_FAIL, UPDATE_FAIL,
  UPDATE_SUCCESS, DELETE_FAIL, DELETE_SUCCESS,
  BULK_UPLOAD_SUCCESS, BULK_UPLOAD_FAIL,
  ASSIGN_STUDENT_SUCCESS, ASSIGN_STUDENT_FAIL, ASSIGN_DEMO_STUDENT_SUCCESS, ASSIGN_DEMO_STUDENT_FAIL,
  GET_RECORD_FOR_ASSIGN_STUDENTS_FAIL, GET_CLASSROOM_SCHEDULE_FAIL, CLASSROOM_SCHEDULE_LESSON_FAIL, UPDATE_CLASSROOM_SCHEDULE_FAIL,
  UPDATE_CLASSROOM_SCHEDULE_SUCCESS
} from './actions';
import {yieldErrorToasts, yieldSuccessToasts} from '../../helpers/utils';
import i18n from '../../configs/i18n';
import {getCartRecords} from "../store/actions";

function* yieldSuccessClassAdd() {
  yield put(getCartRecords());
}

const classroomsSagas = all([
  yieldSuccessToasts({
    [CREATE_SUCCESS]: i18n.t('messages:created'),
    [UPDATE_SUCCESS]: i18n.t('messages:updated'),
    [BULK_UPLOAD_SUCCESS]: i18n.t('messages:uploaded'),
    [DELETE_SUCCESS]: i18n.t('messages:deleted'),
    [ASSIGN_STUDENT_SUCCESS]: i18n.t('messages:classrooms:assigned:students'),
    [ASSIGN_DEMO_STUDENT_SUCCESS]: i18n.t('messages:classrooms:assigned:demoStudent'),
    [UPDATE_CLASSROOM_SCHEDULE_SUCCESS]: i18n.t('messages:classrooms:scheduleUpdated')    
  }),
  yieldErrorToasts([
    GET_RECORDS_FAIL,
    GET_SINGLE_RECORD_FAIL,
    CREATE_FAIL,
    DELETE_FAIL,
    UPDATE_FAIL,
    ASSIGN_STUDENT_FAIL,
    ASSIGN_DEMO_STUDENT_FAIL,
    BULK_UPLOAD_FAIL,
    GET_RECORD_FOR_ASSIGN_STUDENTS_FAIL,
    GET_CLASSROOM_SCHEDULE_FAIL,    
    UPDATE_CLASSROOM_SCHEDULE_FAIL,
    CLASSROOM_SCHEDULE_LESSON_FAIL
  ]),
  takeLatest(CREATE_SUCCESS, yieldSuccessClassAdd)

]);

export default classroomsSagas;