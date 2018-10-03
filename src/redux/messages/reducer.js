import {
    GET_MESSAGE, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAIL, RESET_GET_MESSAGE_REQUEST,
    SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL, RESET_SEND_MESSAGE_REQUEST,
    GET_SENT_MESSAGES, GET_SENT_MESSAGES_SUCCESS, GET_SENT_MESSAGES_FAIL,
    GET_DRAFT_MESSAGES, GET_DRAFT_MESSAGES_SUCCESS, GET_DRAFT_MESSAGES_FAIL,
    GET_INBOX_MESSAGES, GET_INBOX_MESSAGES_SUCCESS, GET_INBOX_MESSAGES_FAIL,
    DELETE_MESSAGE, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAIL, RESET_DELETE_MESSAGE_REQUEST,
    DELETE_DRAFT_MESSAGE, DELETE_DRAFT_MESSAGE_SUCCESS, DELETE_DRAFT_MESSAGE_FAIL,
    GET_UNREAD_MESSAGES, GET_UNREAD_MESSAGES_SUCCESS, GET_UNREAD_MESSAGES_FAIL,
    VIEW_MESSAGE, VIEW_MESSAGE_SUCCESS, VIEW_MESSAGE_FAIL,
    RESET_GET_MESSAGES_REQUEST
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordRequest: {
    loading: false,
    success: false,
    fail: false,    
    record: {}
  },
  deleteRecordRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: []
  },  
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    records: Immutable.List(),
    pagination: {
      page: 1,
      perPage: 25,
      total: 0,
      totalPages: 1
    }    
  },
  getUnreadMessagesRequest: {
    loading: false,
    success: false,
    fail: false,
    records: Immutable.List(),
    total: 0    
  },  
  sendMessageRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: []
  }
});

export default function reducer (state = initialState, action) {
  switch(action.type) {

    /**
     *  send message
     */
    case SEND_MESSAGE:
        return state.set('sendMessageRequest', initialState.get('sendMessageRequest').set('loading', true));
    case SEND_MESSAGE_SUCCESS:
        return state.set('sendMessageRequest', initialState.get('sendMessageRequest').set('success', true));
    case SEND_MESSAGE_FAIL:        
      return state
        .set('sendMessageRequest', state.get('sendMessageRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_SEND_MESSAGE_REQUEST:
        return state.set('sendMessageRequest', initialState.get('sendMessageRequest'));
        
    case DELETE_MESSAGE:
    case DELETE_DRAFT_MESSAGE:
        return state.set('deleteRecordRequest', initialState.get('deleteRecordRequest').set('loading', true));
    case DELETE_MESSAGE_SUCCESS:
    case DELETE_DRAFT_MESSAGE_SUCCESS:
        return state.set('deleteRecordRequest', initialState.get('deleteRecordRequest').set('success', true));
    case DELETE_MESSAGE_FAIL:
    case DELETE_DRAFT_MESSAGE_FAIL:
      return state
        .set('deleteRecordRequest', state.get('deleteRecordRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_DELETE_MESSAGE_REQUEST:
        return state.set('deleteRecordRequest', initialState.get('deleteRecordRequest'));        

    case GET_MESSAGE:
    case VIEW_MESSAGE:
        return state.set('getRecordRequest', initialState.get('getRecordRequest').set('loading', true));
    case GET_MESSAGE_SUCCESS:
    case VIEW_MESSAGE_SUCCESS:
        return state
        .set('getRecordRequest', state.get('getRecordRequest')
          .set('success', true)
          .set('loading', false)
          .set('record', Immutable.fromJS(action.result.data))
        );
    case GET_MESSAGE_FAIL:
    case VIEW_MESSAGE_FAIL:
        return state.set('getRecordRequest', initialState.get('getRecordRequest').set('fail', true));
    case RESET_GET_MESSAGE_REQUEST:
        return state.set('getRecordRequest', initialState.get('getRecordRequest'));
        
    case GET_SENT_MESSAGES:
    case GET_DRAFT_MESSAGES:
    case GET_INBOX_MESSAGES:
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('loading', true));
    case GET_SENT_MESSAGES_SUCCESS:
    case GET_DRAFT_MESSAGES_SUCCESS:
    case GET_INBOX_MESSAGES_SUCCESS:
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest')
                .set('success', true)
                .set('pagination', Immutable.fromJS(action.result.meta.pagination))
                .set('records', Immutable.fromJS(action.result.data)));        
    case GET_SENT_MESSAGES_FAIL:
    case GET_DRAFT_MESSAGES_FAIL:
    case GET_INBOX_MESSAGES_FAIL:
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('fail', true));
        
    case RESET_GET_MESSAGES_REQUEST: 
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest'));
    
    case GET_UNREAD_MESSAGES:    
        return state.set('getUnreadMessagesRequest', initialState.get('getUnreadMessagesRequest').set('loading', true));
    case GET_UNREAD_MESSAGES_SUCCESS:    
        return state.set('getUnreadMessagesRequest', initialState.get('getUnreadMessagesRequest')
                .set('success', true)
                .set('total', action.result.data.total)
                .set('records', Immutable.fromJS(action.result.data.messages)));        
    case GET_UNREAD_MESSAGES_FAIL:    
        return state.set('getUnreadMessagesRequest', initialState.get('getUnreadMessagesRequest').set('fail', true));
    
    /**
     * default
     */
    default:
      return state;
  }
}