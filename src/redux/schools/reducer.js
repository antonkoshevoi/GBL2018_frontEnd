import {
  GET_SCHOOL_TEACHERS, GET_SCHOOL_TEACHERS_SUCCESS, GET_SCHOOL_TEACHERS_FAIL,
  GET_SCHOOL_STUDENTS, GET_SCHOOL_STUDENTS_SUCCESS, GET_SCHOOL_STUDENTS_FAIL,
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getSchoolTeachersRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
  },
  getSchoolStudentsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
  },
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * School Teachers
     */
    case GET_SCHOOL_TEACHERS:
      return state
        .set('getSchoolTeachersRequest', state.get('getSchoolTeachersRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('records')
        );
    case GET_SCHOOL_TEACHERS_SUCCESS:
      return state
        .set('getSchoolTeachersRequest', state.get('getSchoolTeachersRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
        );
    case GET_SCHOOL_TEACHERS_FAIL:
      return state
        .set('getSchoolTeachersRequest', state.get('getSchoolTeachersRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * School Students
     */
    case GET_SCHOOL_STUDENTS:
      return state
        .set('getSchoolStudentsRequest', state.get('getSchoolStudentsRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('records')
        );
    case GET_SCHOOL_STUDENTS_SUCCESS:
      return state
        .set('getSchoolStudentsRequest', state.get('getSchoolStudentsRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
        );
    case GET_SCHOOL_STUDENTS_FAIL:
      return state
        .set('getSchoolStudentsRequest', state.get('getSchoolStudentsRequest')
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