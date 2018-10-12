import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, 
    GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL, RESET_GET_RECORD_REQUEST,
    CREATE, CREATE_SUCCESS, CREATE_FAIL, RESET_CREATE_REQUEST, 
    GET_STUDENT_REQUESTS, GET_STUDENT_REQUESTS_SUCCESS, GET_STUDENT_REQUESTS_FAIL, 
    ACCEPT_STUDENT, ACCEPT_STUDENT_SUCCESS, ACCEPT_STUDENT_FAIL,
    DECLINE_STUDENT, DECLINE_STUDENT_SUCCESS, DECLINE_STUDENT_FAIL, 
    DELETE_STUDENT_REQUST, DELETE_STUDENT_REQUST_SUCCESS, DELETE_STUDENT_REQUST_FAIL, 
    SENT_STUDENT_REQUEST, SENT_STUDENT_REQUEST_SUCCESS, SENT_STUDENT_REQUEST_FAIL, 
    RESET_SENT_STUDENT_REQUEST, RESET_STUDENT_REQUEST
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
  },
  getRecordRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    record: {}
  },
  getStudentRequestsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
  }, 
  createRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },
  studentStatusRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}    
  },
  sentStudentRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}    
  }
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Get records
     */
    case GET_RECORDS:
      return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('loading', true).set('records', Immutable.List()));
    case GET_RECORDS_SUCCESS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('success', true)
          .set('records', Immutable.fromJS(action.result.data))
          .remove('loading')
        );
    case GET_RECORDS_FAIL:
      return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('fail', true));

    /**
     * Get student requests
     */
    case GET_STUDENT_REQUESTS:
      return state
        .set('getStudentRequestsRequest', initialState.get('getStudentRequestsRequest').set('loading', true).set('records', Immutable.List()));
    case GET_STUDENT_REQUESTS_SUCCESS:
      return state
        .set('getStudentRequestsRequest', initialState.get('getStudentRequestsRequest').set('success', true).set('records', Immutable.fromJS(action.result.data)));
    case GET_STUDENT_REQUESTS_FAIL:
      return state.set('getStudentRequestsRequest', initialState.get('getStudentRequestsRequest').set('fail', true));

    /**
     * Get single record
     */
    case GET_RECORD:
      return state.set('getRecordRequest', initialState.get('getRecordRequest').set('loading', true));
    case GET_RECORD_SUCCESS:
      return state
        .set('getRecordRequest', initialState.get('getRecordRequest').set('success', true).set('record', Immutable.fromJS(action.result.data)));
    case GET_RECORD_FAIL:
      return state.set('getRecordRequest', initialState.get('getRecordRequest').set('fail', true));
    case RESET_GET_RECORD_REQUEST:
      return state.set('getRecordRequest', initialState.get('getRecordRequest'));

    /**
     * Link to parent
     */ 
    case SENT_STUDENT_REQUEST:
      return state.set('sentStudentRequest', initialState.get('sentStudentRequest').set('loading', true));  
    case SENT_STUDENT_REQUEST_SUCCESS:        
       return state.set('sentStudentRequest', initialState.get('sentStudentRequest').set('success', true));       
    case SENT_STUDENT_REQUEST_FAIL:
      return state.set('sentStudentRequest', initialState.get('sentStudentRequest')
              .set('fail', true)
              .set('errorCode', action.error.response.data.code)
              .set('errorMessage', action.error.response.data.message)
              .set('errors', action.error.response.data.errors ? Immutable.fromJS(action.error.response.data.errors) : undefined));
    case RESET_SENT_STUDENT_REQUEST:
      return state.set('sentStudentRequest', initialState.get('sentStudentRequest'));
  
    /**
     * Link to parent
     */
    case ACCEPT_STUDENT:
    case DECLINE_STUDENT:
    case DELETE_STUDENT_REQUST:        
      return state.set('studentStatusRequest', initialState.get('studentStatusRequest').set('loading', true));
    case ACCEPT_STUDENT_SUCCESS:
    case DECLINE_STUDENT_SUCCESS:
    case DELETE_STUDENT_REQUST_SUCCESS:                  
       return state.set('studentStatusRequest', initialState.get('studentStatusRequest').set('success', true));
    case ACCEPT_STUDENT_FAIL:
    case DECLINE_STUDENT_FAIL:        
    case DELETE_STUDENT_REQUST_FAIL:         
      return state.set('studentStatusRequest', initialState.get('studentStatusRequest').set('fail', true));
    case RESET_STUDENT_REQUEST:
      return state.set('studentStatusRequest', initialState.get('studentStatusRequest'));
  
    /**
     * Create
     */
    case CREATE:
      return state.set('createRequest', initialState.get('createRequest').set('loading', true));
    case CREATE_SUCCESS:
      return state.set('createRequest', initialState.get('createRequest').set('success', true));
    case CREATE_FAIL:      
      return state
        .set('createRequest', state.get('createRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', action.error.response.data.errors ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_CREATE_REQUEST:
      return state.set('createRequest', initialState.get('createRequest'));

    /**
     * default
     */
    default:
      return state;
  }
}