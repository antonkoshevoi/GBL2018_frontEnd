import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, 
    GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL, RESET_GET_RECORD_REQUEST,
    CREATE, CREATE_SUCCESS, CREATE_FAIL, RESET_CREATE_REQUEST
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
     * default
     */
    default:
      return state;
  }
}