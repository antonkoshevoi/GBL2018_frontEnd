import {
  GET_SCHOOL_REPORT_STUDENT, GET_SCHOOL_REPORT_STUDENT_SUCCESS, GET_SCHOOL_REPORT_STUDENT_FAIL
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    getStudentForReportRequest: {
        loading: false,
        success: false,
        fail: false,
        errorResponse: null,
        record: {}
    },
    school: {
        loading: false,
        success: false,
        fail: false,
        errorResponse: null,
        records: {}
    }
});

export default function reducer (state = initialState, action) {
  switch(action.type) {

    /**
     * Get School Report Student
     */
    case GET_SCHOOL_REPORT_STUDENT:
      return state
          .set('getStudentForReportRequest', state.get('getStudentForReportRequest')
              .set('loading', true)
              .set('success', false)
              .set('fail', false)
              .set('record', Immutable.List())
          );
    case GET_SCHOOL_REPORT_STUDENT_SUCCESS:
      return state
          .set('getStudentForReportRequest', state.get('getStudentForReportRequest')
              .set('success', true)
              .set('loading', false)
              .set('record', Immutable.fromJS(action.result.data))
          );
    case GET_SCHOOL_REPORT_STUDENT_FAIL:
      return state
          .set('getStudentForReportRequest', state.get('getStudentForReportRequest')
              .set('loading', false)
              .set('fail', true)
          );

    /**
     * default
     */
    default:
      return state;
  }
}