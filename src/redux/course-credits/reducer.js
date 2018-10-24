import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL,
    GIFT, GIFT_SUCCESS, GIFT_FAIL, RESET_GIFT_REQUST, 
    ASSIGN, ASSIGN_SUCCESS, ASSIGN_FAIL, RESET_ASSIGN_REQUST
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
  assignRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
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
     * Gift
     */    
    case GIFT:
        return state.set('giftRequest', initialState.get('giftRequest').set('loading', true));
    case GIFT_SUCCESS:
        return state.set('giftRequest', initialState.get('giftRequest').set('success', true));
    case GIFT_FAIL:
        return state.set('giftRequest', initialState.get('giftRequest').set('fail', true).set('errors', Immutable.fromJS(action.error.response.data.errors)));
    case RESET_GIFT_REQUST:
        return state.set('giftRequest', initialState.get('giftRequest'));
        
    /**
     * Assign
     */    
    case ASSIGN:
        return state.set('assignRequest', initialState.get('assignRequest').set('loading', true));
    case ASSIGN_SUCCESS:
        return state.set('assignRequest', initialState.get('assignRequest').set('success', true));
    case ASSIGN_FAIL:
        return state.set('assignRequest', initialState.get('assignRequest').set('fail', true).set('errors', Immutable.fromJS(action.error.response.data.errors)));
    case RESET_ASSIGN_REQUST:
        return state.set('assignRequest', initialState.get('assignRequest'));        
        
    /**
     * default
     */
    default:
      return state;
  }
}