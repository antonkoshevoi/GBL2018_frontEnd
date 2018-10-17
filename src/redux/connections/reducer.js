import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL,
    GET_RECEIVED_RECORDS, GET_RECEIVED_RECORDS_SUCCESS, GET_RECEIVED_RECORDS_FAIL,
    GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL, RESET_GET_RECORD_REQUEST, 
    CREATE, CREATE_SUCCESS, CREATE_FAIL, RESET_CREATE_REQUEST, 
    ACCEPT, ACCEPT_SUCCESS, ACCEPT_FAIL, 
    ACCEPT_PUBLIC, ACCEPT_PUBLIC_SUCCESS, ACCEPT_PUBLIC_FAIL, 
    DECLINE, DECLINE_SUCCESS, DECLINE_FAIL, RESET_CHANGE_STATUS_REQUEST, 
    DELETE, DELETE_SUCCESS, DELETE_FAIL, RESET_DELETE_REQUEST
} from './actions';
import Immutable from 'immutable';
import { saveSession } from '../../helpers/session';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {},
    pagination: {
      page: 1,
      perPage: 25,
      total: 0,
      totalPages: 1
    }    
  },
  getReceivedRecordsRequest: {
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
  createRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },
  changeStatusRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}    
  },
  deleteRequest: {
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


    case GET_RECEIVED_RECORDS:
      return state.set('getReceivedRecordsRequest', initialState.get('getReceivedRecordsRequest').set('loading', true).set('records', Immutable.List()));
    case GET_RECEIVED_RECORDS_SUCCESS:
      return state
        .set('getReceivedRecordsRequest', state.get('getReceivedRecordsRequest')
          .set('success', true)
          .set('records', Immutable.fromJS(action.result.data))
          .remove('loading')
        );
    case GET_RECEIVED_RECORDS_FAIL:
      return state.set('getReceivedRecordsRequest', initialState.get('getReceivedRecordsRequest').set('fail', true));

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
     * Accept / Decline
     */
    case ACCEPT:
    case ACCEPT_PUBLIC:
    case DECLINE:         
      return state.set('changeStatusRequest', initialState.get('changeStatusRequest').set('loading', true));
    case ACCEPT_SUCCESS:    
    case DECLINE_SUCCESS:    
       return state.set('changeStatusRequest', initialState.get('changeStatusRequest').set('success', true));
    case ACCEPT_PUBLIC_SUCCESS:        
        saveSession(action.result.data);
        return state.set('changeStatusRequest', initialState.get('changeStatusRequest').set('success', true));
    case ACCEPT_FAIL:
    case ACCEPT_PUBLIC_FAIL:
    case DECLINE_FAIL:               
      return state.set('changeStatusRequest', initialState.get('changeStatusRequest').set('fail', true));  
    case RESET_CHANGE_STATUS_REQUEST:
      return state.set('changeStatusRequest', initialState.get('changeStatusRequest'));
      
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
     * Delete
     */
    case DELETE:        
      return state.set('deleteRequest', initialState.get('deleteRequest').set('loading', true));
    case DELETE_SUCCESS:
       return state.set('deleteRequest', initialState.get('deleteRequest').set('success', true));     
    case DELETE_FAIL:         
      return state.set('deleteRequest', initialState.get('deleteRequest').set('fail', true));
    case RESET_DELETE_REQUEST:
      return state.set('deleteRequest', initialState.get('deleteRequest'));
  
    /**
     * default
     */
    default:
      return state;
  }
}