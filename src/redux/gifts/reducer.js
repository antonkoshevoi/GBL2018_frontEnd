import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL,
    GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL, RESET_GET_RECORD_REQUEST,
    GIFT, GIFT_SUCCESS, GIFT_FAIL, RESET_GIFT_REQUEST,
    GIFT_SUBSCRIPTION, GIFT_SUBSCRIPTION_SUCCESS, GIFT_SUBSCRIPTION_FAIL, RESET_GIFT_SUBSCRIPTION_REQUEST,
    PUBLIC_GIFT, PUBLIC_GIFT_SUCCESS, PUBLIC_GIFT_FAIL, RESET_PUBLIC_GIFT_REQUEST, 
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
  giftSubscriptionRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },  
  publicGiftRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    record: {}
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
    case GIFT_SUCCESS:    
        return state.set('giftRequest', initialState.get('giftRequest').set('success', true));
    case GIFT_FAIL:
        return state.set('giftRequest', initialState.get('giftRequest').set('fail', true).set('errors', Immutable.fromJS(action.error.response.data.errors)));
    case RESET_GIFT_REQUEST:
        return state.set('giftRequest', initialState.get('giftRequest'));
        
    /**
     * Gift
     */    
    case GIFT_SUBSCRIPTION:
        return state.set('giftSubscriptionRequest', initialState.get('giftSubscriptionRequest').set('loading', true));    
    case GIFT_SUBSCRIPTION_SUCCESS:
        return state.set('giftSubscriptionRequest', initialState.get('giftSubscriptionRequest').set('success', true));
    case GIFT_SUBSCRIPTION_FAIL:
        return state.set('giftSubscriptionRequest', initialState.get('giftSubscriptionRequest').set('fail', true).set('errors', Immutable.fromJS(action.error.response.data.errors)));
    case RESET_GIFT_SUBSCRIPTION_REQUEST:
        return state.set('giftSubscriptionRequest', initialState.get('giftSubscriptionRequest'));        
                    
    /**
     * Public Gift
     */
    case PUBLIC_GIFT:
      return state.set('publicGiftRequest', initialState.get('publicGiftRequest').set('loading', true));
    case PUBLIC_GIFT_SUCCESS:
      return state
        .set('publicGiftRequest', initialState.get('publicGiftRequest').set('success', true).set('record', Immutable.fromJS(action.result.data)));
    case PUBLIC_GIFT_FAIL:
        const giftData      = action.error.response.data;
        const giftErrors    = Immutable.fromJS(giftData.errors);
      
        return state.set('publicGiftRequest', initialState.get('giftRequest')
                .set('fail', true)
                .set('errors', (giftErrors.size ? giftErrors : Immutable.fromJS(giftData))));              
    case RESET_PUBLIC_GIFT_REQUEST:
      return state.set('publicGiftRequest', initialState.get('publicGiftRequest'));
  
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