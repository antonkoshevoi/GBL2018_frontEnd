import {
  GET_USER_SCHOOL, GET_USER_SCHOOL_SUCCESS, GET_USER_SCHOOL_FAIL,
  GET_USER_SCHOOL_STUDENTS, GET_USER_SCHOOL_STUDENTS_SUCCESS, GET_USER_SCHOOL_STUDENTS_FAIL,
  GET_USER_SCHOOL_HOMEROOMS, GET_USER_SCHOOL_HOMEROOMS_SUCCESS, GET_USER_SCHOOL_HOMEROOMS_FAIL,
  GET_USER_SCHOOL_TEACHERS, GET_USER_SCHOOL_TEACHERS_SUCCESS, GET_USER_SCHOOL_TEACHERS_FAIL,
  GET_USER_SCHOOL_ADMINS, GET_USER_SCHOOL_ADMINS_SUCCESS, GET_USER_SCHOOL_ADMINS_FAIL,
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getUserSchoolStudentsRequest: {
      loading: false,
      success: false,
      fail: false,
      errorResponse: null,
      records: {}
  },
  getUserSchoolHomeroomsRequest: {
      loading: false,
      success: false,
      fail: false,
      errorResponse: null,
      records: {}
  },
getUserSchoolTeachersRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
},
getUserSchoolAdminsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
},
  school: []
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Get User School
     */
    case GET_USER_SCHOOL:
        return state
            .set('school', Immutable.List());
    case GET_USER_SCHOOL_SUCCESS:
        return state
            .set('school', Immutable.fromJS(action.result.data));
    case GET_USER_SCHOOL_FAIL:
        return state;
      /**
       * User School Students
       */
      case GET_USER_SCHOOL_STUDENTS:
          return state
              .set('getUserSchoolStudentsRequest', state.get('getUserSchoolStudentsRequest')
                  .set('loading', true)
                  .set('success', false)
                  .set('fail', false)
                  .set('records', Immutable.List())
              );
      case GET_USER_SCHOOL_STUDENTS_SUCCESS:
          return state
              .set('getUserSchoolStudentsRequest', state.get('getUserSchoolStudentsRequest')
                  .set('success', true)
                  .set('loading', false)
                  .set('records', Immutable.fromJS(action.result.data))
              );
      case GET_USER_SCHOOL_STUDENTS_FAIL:
          return state
              .set('getUserSchoolStudentsRequest', state.get('getUserSchoolStudentsRequest')
                  .set('loading', false)
                  .set('fail', true)
              );

      /**
       * User School Homerooms
       */
      case GET_USER_SCHOOL_HOMEROOMS:
          return state
              .set('getUserSchoolHomeroomsRequest', state.get('getUserSchoolHomeroomsRequest')
                  .set('loading', true)
                  .set('success', false)
                  .set('fail', false)
                  .set('records', Immutable.List())
              );
      case GET_USER_SCHOOL_HOMEROOMS_SUCCESS:
          return state
              .set('getUserSchoolHomeroomsRequest', state.get('getUserSchoolHomeroomsRequest')
                  .set('success', true)
                  .set('loading', false)
                  .set('records', Immutable.fromJS(action.result.data))
              );
      case GET_USER_SCHOOL_HOMEROOMS_FAIL:
          return state
              .set('getUserSchoolHomeroomsRequest', state.get('getUserSchoolHomeroomsRequest')
                  .set('loading', false)
                  .set('fail', true)
              );
      /**
       * User School Teachers
       */
      case GET_USER_SCHOOL_TEACHERS:
          return state
              .set('getUserSchoolTeachersRequest', state.get('getUserSchoolTeachersRequest')
                  .set('loading', true)
                  .set('success', false)
                  .set('fail', false)
                  .set('records', Immutable.List())
              );
      case GET_USER_SCHOOL_TEACHERS_SUCCESS:
          return state
              .set('getUserSchoolTeachersRequest', state.get('getUserSchoolTeachersRequest')
                  .set('success', true)
                  .set('loading', false)
                  .set('records', Immutable.fromJS(action.result.data))
              );
      case GET_USER_SCHOOL_TEACHERS_FAIL:
          return state
              .set('getUserSchoolTeachersRequest', state.get('getUserSchoolTeachersRequest')
                  .set('loading', false)
                  .set('fail', true)
              );
      /**
       * User School Admins
       */
      case GET_USER_SCHOOL_ADMINS:
          return state
              .set('getUserSchoolAdminsRequest', state.get('getUserSchoolAdminsRequest')
                  .set('loading', true)
                  .set('success', false)
                  .set('fail', false)
                  .set('records', Immutable.List())
              );
      case GET_USER_SCHOOL_ADMINS_SUCCESS:
          return state
              .set('getUserSchoolAdminsRequest', state.get('getUserSchoolAdminsRequest')
                  .set('success', true)
                  .set('loading', false)
                  .set('records', Immutable.fromJS(action.result.data))
              );
      case GET_USER_SCHOOL_ADMINS_FAIL:
          return state
              .set('getUserSchoolAdminsRequest', state.get('getUserSchoolAdminsRequest')
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