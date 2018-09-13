import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, 
    GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL, RESET_GET_RECORD_REQUEST,
    GET_ASSIGNED_RECORDS, GET_ASSIGNED_RECORDS_SUCCESS, GET_ASSIGNED_RECORDS_FAIL,
    GET_ASSIGNED_RECORD, GET_ASSIGNED_RECORD_SUCCESS, GET_ASSIGNED_RECORD_FAIL,
    GET_RESULTS_RECORDS, GET_RESULTS_RECORDS_SUCCESS, GET_RESULTS_RECORDS_FAIL, RESET_RESULTS_RECORDS_REQUEST,
    GET_RESULTS_DETAILS_RECORD, GET_RESULTS_DETAILS_RECORD_SUCCESS, GET_RESULTS_DETAILS_RECORD_FAIL,
    CREATE, CREATE_SUCCESS, CREATE_FAIL, RESET_CREATE_REQUEST,
    UPDATE, UPDATE_SUCCESS, UPDATE_FAIL, RESET_UPDATE_REQUEST,
    DELETE, DELETE_SUCCESS, DELETE_FAIL,
    ASSIGN_TEACHERS, ASSIGN_TEACHERS_SUCCESS, ASSIGN_TEACHERS_FAIL, RESET_ASSIGN_TEACHERS_REQUEST,
    ADD_ANSWERS, ADD_ANSWERS_SUCCESS, ADD_ANSWERS_FAIL, RESET_ADD_ANSWERS_REQUEST
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    records: Immutable.List(),
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
      totalPages: 1
    }    
  },
  getResultRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    records: Immutable.List(),
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
      totalPages: 1
    }    
  },
  getResultDetailsRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    record: null,
  },  
  getRecordRequest: {
    loading: false,
    success: false,
    fail: false,    
    record: null
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
    fail: false
  },
  assignTeachersRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null
  },
  addAnswersRequest: {
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
    case GET_ASSIGNED_RECORDS:
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('loading', true));
    case GET_RECORDS_SUCCESS:
    case GET_ASSIGNED_RECORDS_SUCCESS:
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest')
                .set('success', true)
                .set('pagination', Immutable.fromJS(action.result.meta.pagination))
                .set('records', Immutable.fromJS(action.result.data)));        
    case GET_RECORDS_FAIL:
    case GET_ASSIGNED_RECORDS_FAIL:
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('fail', true));

    /**
     * Get result records
     */
    case GET_RESULTS_RECORDS:
        return state.set('getResultRecordsRequest', initialState.get('getResultRecordsRequest').set('loading', true));
    case GET_RESULTS_RECORDS_SUCCESS:
        return state.set('getResultRecordsRequest', initialState.get('getResultRecordsRequest')
                .set('success', true)
                .set('pagination', Immutable.fromJS(action.result.meta.pagination))
                .set('records', Immutable.fromJS(action.result.data)));
    case GET_RESULTS_RECORDS_FAIL:
        return state.set('getResultRecordsRequest', initialState.get('getResultRecordsRequest').set('fail', true));
    case RESET_RESULTS_RECORDS_REQUEST:
        return state.set('getResultRecordsRequest', initialState.get('getResultRecordsRequest'));
        
    /**
     * Get single record
     */
    case GET_RECORD:
    case GET_ASSIGNED_RECORD:
    case GET_RESULTS_DETAILS_RECORD:
        return state.set('getRecordRequest', initialState.get('getRecordRequest').set('loading', true));
    case GET_RECORD_SUCCESS:
    case GET_ASSIGNED_RECORD_SUCCESS:
    case GET_RESULTS_DETAILS_RECORD_SUCCESS:
        return state
        .set('getRecordRequest', state.get('getRecordRequest')
          .set('success', true)
          .set('loading', false)
          .set('record', Immutable.fromJS(action.result.data))
        );
    case GET_RECORD_FAIL:
    case GET_ASSIGNED_RECORD_FAIL:
    case GET_RESULTS_DETAILS_RECORD_FAIL:
        return state.set('getRecordRequest', initialState.get('getRecordRequest').set('fail', true));
    case RESET_GET_RECORD_REQUEST:
        return state.set('getRecordRequest', initialState.get('getRecordRequest'));
        
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
          .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_CREATE_REQUEST:
      return state.set('createRequest', initialState.get('createRequest'));

    /**
     * Update
     */
    case UPDATE:
        return state.set('updateRequest', initialState.get('updateRequest').set('loading', true));
    case UPDATE_SUCCESS:
        return state.set('updateRequest', initialState.get('updateRequest').set('success', true));
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
        return state.set('deleteRequest', initialState.get('deleteRequest').set('loading', true));
    case DELETE_SUCCESS:
        return state.set('deleteRequest', initialState.get('deleteRequest').set('success', true));
    case DELETE_FAIL:
        return state.set('deleteRequest', initialState.get('deleteRequest').set('fail', true));

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
     * Add answers
     */
    case ADD_ANSWERS:
        return state.set('addAnswersRequest', initialState.get('addAnswersRequest').set('loading', true));
    case ADD_ANSWERS_SUCCESS:
        return state.set('addAnswersRequest', initialState.get('addAnswersRequest').set('success', true));
    case ADD_ANSWERS_FAIL:      
      return state
        .set('addAnswersRequest', state.get('addAnswersRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_ADD_ANSWERS_REQUEST:
      return state.set('addAnswersRequest', initialState.get('addAnswersRequest'));      
    /**
     * default
     */
    default:
      return state;
  }
}