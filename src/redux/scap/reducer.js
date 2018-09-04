import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, 
    GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL, RESET_GET_RECORD_REQUEST,
    CREATE, CREATE_SUCCESS, CREATE_FAIL, RESET_CREATE_REQUEST,
    UPDATE, UPDATE_SUCCESS, UPDATE_FAIL, RESET_UPDATE_REQUEST,
    DELETE, DELETE_SUCCESS, DELETE_FAIL,
    ASSIGN_TEACHERS, ASSIGN_TEACHERS_SUCCESS, ASSIGN_TEACHERS_FAIL, RESET_ASSIGN_TEACHERS_REQUEST
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    records: []
  },
  getRecordRequest: {
    loading: false,
    success: false,
    fail: false,    
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
  updateRequest: {
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
    errorCode: null
  },
  assignTeachersRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null
  },    
  pagination: {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1
  }  
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Get records
     */
    case GET_RECORDS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', true)
          .set('records', Immutable.List())
          .remove('success')
          .remove('fail')
        );
    case GET_RECORDS_SUCCESS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
            .set('success', true)
            .set('records', Immutable.fromJS(action.result.data))
            .remove('loading')
        );
    case GET_RECORDS_FAIL:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * Get single record
     */
    case GET_RECORD:
      return state
        .set('getRecordRequest', state.get('getRecordRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('record')
        );
    case GET_RECORD_SUCCESS:
      return state
        .set('getRecordRequest', state.get('getRecordRequest')
          .set('success', true)
          .set('loading', false)
          .set('record', Immutable.fromJS(action.result.data))
        );
    case GET_RECORD_FAIL:
      return state
        .set('getRecordRequest', state.get('getRecordRequest')
          .set('loading', false)
          .set('fail', true)
        );
         
    /**
     * Create
     */
    case CREATE:
      return state
        .set('createRequest', state.get('createRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case CREATE_SUCCESS:
      return state
        .set('createRequest', state.get('createRequest')
          .set('loading', false)
          .set('success', true)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case CREATE_FAIL:      
      return state
        .set('createRequest', state.get('createRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_CREATE_REQUEST:
      return state.set('createRequest', initialState.get('createRequest'));

    /**
     * Update
     */
    case UPDATE:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case UPDATE_SUCCESS:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('loading', false)
          .set('success', true)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case UPDATE_FAIL:      
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_UPDATE_REQUEST:
      return state.set('updateRequest', initialState.get('updateRequest'));
      
    /**
     * Delete
     */
    case DELETE:
      return state
        .set('deleteRequest', state.get('deleteRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)          
          .remove('errorMessage')
          .remove('errorCode')
        );
    case DELETE_SUCCESS:
      return state
        .set('deleteRequest', state.get('deleteRequest')
          .set('loading', false)
          .set('success', true)
        );
    case DELETE_FAIL:
      return state
        .set('deleteRequest', state.get('deleteRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
        );

    /**
     * Assign teacher
     */
    case ASSIGN_TEACHERS:
      return state.set('assignTeachersRequest', initialState.get('assignTeachersRequest').set('loading', true));
    case ASSIGN_TEACHERS_SUCCESS:
        return state.set('assignTeachersRequest', initialState.get('assignTeachersRequest').set('success', true));
    case ASSIGN_TEACHERS_FAIL:      
      return state
        .set('assignTeachersRequest', state.get('assignTeachersRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)          
        );
    case RESET_ASSIGN_TEACHERS_REQUEST:
      return state.set('assignTeachersRequest', initialState.get('assignTeachersRequest'));
      
    /**
     * default
     */
    default:
      return state;
  }
}