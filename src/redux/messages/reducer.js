import {
    GET_MESSAGE, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAIL, RESET_GET_MESSAGE_REQUEST,
    GET_MESSAGES, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAIL,  
    SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL, RESET_SEND_MESSAGE_REQUEST,
    READ_MESSAGES, READ_MESSAGES_SUCCESS, READ_MESSAGES_FAIL,
    UPDATE_MESSAGE, UPDATE_MESSAGE_SUCCESS, UPDATE_MESSAGE_FAIL, RESET_UPDATE_MESSAGE_REQUEST,
    REPLY_MESSAGE, REPLY_MESSAGE_SUCCESS, REPLY_MESSAGE_FAIL, RESET_REPLY_MESSAGE_REQUEST,
    DELETE_MESSAGE, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAIL, RESET_DELETE_MESSAGE_REQUEST,   
    GET_UNREAD_MESSAGES, GET_UNREAD_MESSAGES_SUCCESS, GET_UNREAD_MESSAGES_FAIL,
    VIEW_MESSAGE, VIEW_MESSAGE_SUCCESS, VIEW_MESSAGE_FAIL,    
    GET_GROUPS, GET_GROUPS_SUCCESS, GET_GROUPS_FAIL,
    GET_GROUP, GET_GROUP_SUCCESS, GET_GROUP_FAIL, RESET_GET_GROUP_REQUEST,
    CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL, RESET_CREATE_GROUP_REQUEST,
    UPDATE_GROUP, UPDATE_GROUP_SUCCESS, UPDATE_GROUP_FAIL, RESET_UPDATE_GROUP_REQUEST,
    DELETE_GROUP, DELETE_GROUP_SUCCESS, DELETE_GROUP_FAIL, RESET_DELETE_GROUP_REQUEST
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
  updateMessageRequest: {
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
  },
  replyMessageRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: []
  },
  getGroupsRequest: {    
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
  getGroupRequest: {    
    loading: false,
    success: false,
    fail: false,
    record: {} 
  },
  createGroupRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: []
  },
  updateGroupRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: []
  },
  deleteGroupRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: []
  },    
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
        
    case UPDATE_MESSAGE:
        return state.set('updateMessageRequest', initialState.get('updateMessageRequest').set('loading', true));
    case UPDATE_MESSAGE_SUCCESS:
        return state.set('updateMessageRequest', initialState.get('updateMessageRequest').set('success', true));        
    case UPDATE_MESSAGE_FAIL:        
      return state
        .set('updateMessageRequest', state.get('updateMessageRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_UPDATE_MESSAGE_REQUEST:
        return state.set('updateMessageRequest', initialState.get('updateMessageRequest'));        
    
    case REPLY_MESSAGE:
        return state.set('replyMessageRequest', initialState.get('replyMessageRequest').set('loading', true));
    case REPLY_MESSAGE_SUCCESS:
        return state.set('replyMessageRequest', initialState.get('replyMessageRequest').set('success', true));
    case REPLY_MESSAGE_FAIL:        
      return state
        .set('replyMessageRequest', state.get('replyMessageRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_REPLY_MESSAGE_REQUEST:
        return state.set('replyMessageRequest', initialState.get('replyMessageRequest'));        
        
    case DELETE_MESSAGE:    
        return state.set('deleteRecordRequest', initialState.get('deleteRecordRequest').set('loading', true));
    case DELETE_MESSAGE_SUCCESS:    
        return state.set('deleteRecordRequest', initialState.get('deleteRecordRequest').set('success', true));
    case DELETE_MESSAGE_FAIL:    
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
        
    case GET_MESSAGES:    
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('loading', true));    
    case GET_MESSAGES_SUCCESS:    
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest')
                .set('success', true)
                .set('pagination', Immutable.fromJS(action.result.meta.pagination))
                .set('records', Immutable.fromJS(action.result.data)));           
    case GET_MESSAGES_FAIL:   
        return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('fail', true));    
    
    case READ_MESSAGES:        
    case GET_UNREAD_MESSAGES:    
        return state.set('getUnreadMessagesRequest', initialState.get('getUnreadMessagesRequest').set('loading', true));
    case READ_MESSAGES_SUCCESS:        
    case GET_UNREAD_MESSAGES_SUCCESS:    
        return state.set('getUnreadMessagesRequest', initialState.get('getUnreadMessagesRequest')
                .set('success', true)                
                .set('records', Immutable.fromJS(action.result.data)));
    case READ_MESSAGES_FAIL:        
    case GET_UNREAD_MESSAGES_FAIL:    
        return state.set('getUnreadMessagesRequest', initialState.get('getUnreadMessagesRequest').set('fail', true));            
    
    /**
     * Get single group
     */
    case GET_GROUP:
      return state.set('getGroupRequest', initialState.get('getGroupRequest').set('loading', true).set('record', {}));
    case GET_GROUP_SUCCESS:
      return state.set('getGroupRequest', initialState.get('getGroupRequest').set('success', true).set('record', Immutable.fromJS(action.result.data)));
    case GET_GROUP_FAIL:
      return state.set('getGroupRequest', initialState.get('getGroupRequest').set('fail', true));
    case RESET_GET_GROUP_REQUEST:
      return state
        .set('getGroupRequest', initialState.get('getGroupRequest'));

    /**
     * Get groups
     */
    case GET_GROUPS:
      return state.set('getGroupsRequest', initialState.get('getGroupsRequest').set('loading', true).set('record', {}));
    case GET_GROUPS_SUCCESS:
        return state.set('getGroupsRequest', initialState.get('getGroupsRequest')
                .set('success', true)
                .set('pagination', Immutable.fromJS(action.result.meta.pagination))
                .set('records', Immutable.fromJS(action.result.data))); 
    case GET_GROUPS_FAIL:
      return state.set('getGroupsRequest', initialState.get('getGroupsRequest').set('fail', true));
       
    /**
     *  Create group
     */
    case CREATE_GROUP:
        return state.set('createGroupRequest', initialState.get('createGroupRequest').set('loading', true));
    case CREATE_GROUP_SUCCESS:
        return state.set('createGroupRequest', initialState.get('createGroupRequest').set('success', true));
    case CREATE_GROUP_FAIL:        
      return state
        .set('createGroupRequest', state.get('createGroupRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );
    case RESET_CREATE_GROUP_REQUEST:
        return state.set('createGroupRequest', initialState.get('createGroupRequest'));
        
    /**
     *  Update group
     */
    case UPDATE_GROUP:
        return state.set('updateGroupRequest', initialState.get('updateGroupRequest').set('loading', true));
    case UPDATE_GROUP_SUCCESS:
        return state.set('updateGroupRequest', initialState.get('updateGroupRequest').set('success', true));
    case UPDATE_GROUP_FAIL:        
      return state
        .set('updateGroupRequest', state.get('updateGroupRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );
    case RESET_UPDATE_GROUP_REQUEST:
        return state.set('updateGroupRequest', initialState.get('updateGroupRequest')); 
    
    /**
     *  Delete group
     */
    case DELETE_GROUP:
        return state.set('deleteGroupRequest', initialState.get('deleteGroupRequest').set('loading', true));
    case DELETE_GROUP_SUCCESS:
        return state.set('deleteGroupRequest', initialState.get('deleteGroupRequest').set('success', true));
    case DELETE_GROUP_FAIL:        
      return state.set('deleteGroupRequest', initialState.get('deleteGroupRequest').set('fail', true));
    case RESET_DELETE_GROUP_REQUEST:
        return state.set('deleteGroupRequest', initialState.get('deleteGroupRequest')); 
    
    /**
     * default
     */
    default:
      return state;
  }
}