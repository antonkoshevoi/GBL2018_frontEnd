import {
  GET_STORE_RECORDS, GET_STORE_RECORDS_SUCCESS, GET_STORE_RECORDS_FAIL,
    GET_DEMO_COURSES, GET_DEMO_COURSES_SUCCESS, GET_DEMO_COURSES_FAIL,
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getStoreRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: []
  },
  getCoursesRequest: {
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
     * Get store records
     */
    case GET_STORE_RECORDS:
      return state
        .set('getStoreRecordsRequest', state.get('getStoreRecordsRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('records', Immutable.List())
        );
    case GET_STORE_RECORDS_SUCCESS:
      return state
        .set('getStoreRecordsRequest', state.get('getStoreRecordsRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
        );
    case GET_STORE_RECORDS_FAIL:
      return state
        .set('getStoreRecordsRequest', state.get('getStoreRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * Courses
     */    
    case GET_DEMO_COURSES:
      return state
        .set('getCoursesRequest', state.get('getCoursesRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('records')
        );    
    case GET_DEMO_COURSES_SUCCESS:
      return state
        .set('getCoursesRequest', state.get('getCoursesRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
        );    
    case GET_DEMO_COURSES_FAIL:
      return state
        .set('getCoursesRequest', state.get('getCoursesRequest')
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