import {
  GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL,
  GET_RECORD, GET_RECORD_FAIL, GET_RECORD_SUCCESS, RESET_GET_RECORD_REQUEST,
  SUBSCRIBE, SUBSCRIBE_FAIL, SUBSCRIBE_SUCCESS, RESET_SUBSCRIBE_REQUEST
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false
  },
  getRecordRequest: {
    loading: false,
    success: false,
    fail: false,    
    record: {}
  },
  subscribeRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,    
    errors: {}
  },  
  records: []
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
          .remove('success')
          .remove('fail')
        ).set('records', Immutable.List());
    case GET_RECORDS_SUCCESS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('success', true).remove('loading')
        ).set('records', Immutable.fromJS(action.result.data));
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
    case RESET_GET_RECORD_REQUEST:
      return state
        .set('getRecordRequest', initialState.get('getRecordRequest'));
   
   
    case SUBSCRIBE:
      return state
        .set('subscribeRequest', state.get('subscribeRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case SUBSCRIBE_SUCCESS:
      return state
        .set('subscribeRequest', state.get('subscribeRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)
        );
    case SUBSCRIBE_FAIL:
      const errorData = action.error.response.data;
      return state
        .set('subscribeRequest', state.get('subscribeRequest')
          .set('loading', false)          
          .set('fail', true)          
          .set('errorMessage', errorData.message)
          .set('errors', Immutable.fromJS(errorData.errors))
        );
    case RESET_SUBSCRIBE_REQUEST:
      return state
        .set('subscribeRequest', initialState.get('subscribeRequest'));
           
    /**
     * default
     */
    default:
      return state;
  }
}