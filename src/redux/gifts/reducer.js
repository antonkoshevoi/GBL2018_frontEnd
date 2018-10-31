import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL,
    GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL, RESET_GET_RECORD_REQUEST,
    GIFT, GIFT_COURSE_SUCCESS, GIFT_SUBSCRIPTION_SUCCESS, GIFT_FAIL, RESET_GIFT_REQUST, 
    DELETE, DELETE_SUCCESS, DELETE_FAIL, RESET_DELETE_REQUEST,
    ACCEPT, ACCEPT_SUCCESS, ACCEPT_FAIL, 
    DECLINE, DECLINE_SUCCESS, DECLINE_FAIL, RESET_CHANGE_STATUS_REQUEST
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {},
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
      totalPages: 1
    }    
  },
  giftRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  deleteRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  changeStatusRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },   
  getRecordRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    record: {}
  }  
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Get records
     */
    case GET_RECORDS:
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest')
                .set('loading', true)
                .set('records', Immutable.List()));
    case GET_RECORDS_SUCCESS:      
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest')
                .set('success', true)
                .set('records', Immutable.fromJS(action.result.data))
                .set('pagination', Immutable.fromJS(action.result.meta.pagination)));
    case GET_RECORDS_FAIL:
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest')
                .set('fail', true)
                .set('records', Immutable.List()));

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
     * Gift
     */    
    case GIFT:
        return state.set('giftRequest', initialState.get('giftRequest').set('loading', true));
    case GIFT_COURSE_SUCCESS:
    case GIFT_SUBSCRIPTION_SUCCESS:
        return state.set('giftRequest', initialState.get('giftRequest').set('success', true));
    case GIFT_FAIL:
        return state.set('giftRequest', initialState.get('giftRequest').set('fail', true).set('errors', Immutable.fromJS(action.error.response.data.errors)));
    case RESET_GIFT_REQUST:
        return state.set('giftRequest', initialState.get('giftRequest'));
                   
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
     * Accept / Decline
     */
    case ACCEPT:    
    case DECLINE:         
        return state.set('changeStatusRequest', initialState.get('changeStatusRequest').set('loading', true));
    case ACCEPT_SUCCESS:    
    case DECLINE_SUCCESS:    
        return state.set('changeStatusRequest', initialState.get('changeStatusRequest').set('success', true));
    case ACCEPT_FAIL:    
    case DECLINE_FAIL:               
        return state.set('changeStatusRequest', initialState.get('changeStatusRequest').set('fail', true)); 
    case RESET_CHANGE_STATUS_REQUEST:
        return state.set('changeStatusRequest', initialState.get('changeStatusRequest'));
  
    /**
     * default
     */
    default:
        return state;
  }
}