import {
    GET_MESSAGE, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAIL, RESET_GET_MESSAGE_REQUEST,
    GET_MESSAGES, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAIL,
    GET_PRIVATE_CHATS, GET_PRIVATE_CHATS_SUCCESS, GET_PRIVATE_CHATS_FAIL,
    GET_GROUP_CHATS, GET_GROUP_CHATS_SUCCESS, GET_GROUP_CHATS_FAIL,
    GET_CHAT_MESSAGES, GET_CHAT_MESSAGES_SUCCESS, GET_CHAT_MESSAGES_FAIL,
    SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAIL, RESET_SEND_MESSAGE_REQUEST,
    SEND_CHAT_MESSAGE, SEND_CHAT_MESSAGE_SUCCESS, SEND_CHAT_MESSAGE_FAIL, RESET_SEND_CHAT_MESSAGE_REQUEST,
    READ_MESSAGES, READ_MESSAGES_SUCCESS, READ_MESSAGES_FAIL,
    UPDATE_MESSAGE, UPDATE_MESSAGE_SUCCESS, UPDATE_MESSAGE_FAIL, RESET_UPDATE_MESSAGE_REQUEST,    
    DELETE_MESSAGE, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAIL, RESET_DELETE_MESSAGE_REQUEST,   
    DELETE_CHAT_MESSAGE, DELETE_CHAT_MESSAGE_SUCCESS, DELETE_CHAT_MESSAGE_FAIL,
    GET_UNREAD_MESSAGES, GET_UNREAD_MESSAGES_SUCCESS, GET_UNREAD_MESSAGES_FAIL,
    VIEW_MESSAGE, VIEW_MESSAGE_SUCCESS, VIEW_MESSAGE_FAIL,    
    GET_GROUPS, GET_GROUPS_SUCCESS, GET_GROUPS_FAIL,
    GET_GROUP, GET_GROUP_SUCCESS, GET_GROUP_FAIL, RESET_GET_GROUP_REQUEST,
    CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL, RESET_CREATE_GROUP_REQUEST,
    UPDATE_GROUP, UPDATE_GROUP_SUCCESS, UPDATE_GROUP_FAIL, RESET_UPDATE_GROUP_REQUEST,
    DELETE_GROUP, DELETE_GROUP_SUCCESS, DELETE_GROUP_FAIL, RESET_DELETE_GROUP_REQUEST,
    NEW_MESSAGE_RECEIVED, MESSAGE_REMOVED
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
    id: null,
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
  getPrivateChatsRequest: {    
    loading: false,
    success: false,
    fail: false,
    records: Immutable.List()
  },
  getGroupChatsRequest: {    
    loading: false,
    success: false,
    fail: false,
    records: Immutable.List()
  },  
  getChatMessagesRequest: {    
    loading: false,
    success: false,
    fail: false,
    chatId: null,
    records: Immutable.List()
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

function updateUnread(state, number = 1, isPrivate = false) {
    let unreadMessages  = state.get('getUnreadMessagesRequest').get('records').toJS();    
    unreadMessages = unreadMessages.map(record => {            
        if (record.type === 'chats') {
            record.count = record.count + number;
            if (isPrivate) {
                record.countPrivate = record.countPrivate + number;
            } else {
                record.countGroup = record.countGroup + number;
            }
        }
        return record;
    });
    return Immutable.fromJS(unreadMessages);
}

export default function reducer (state = initialState, action) {
  switch(action.type) {

    case NEW_MESSAGE_RECEIVED: {
        let chatId          = action.message.chatId;
        let recordsKey      = action.message.isPrivate ? 'getPrivateChatsRequest' : 'getGroupChatsRequest';
        let chatsRecords    = state.get(recordsKey).get('records').toJS();
        let chatMessages    = state.get('getChatMessagesRequest').get('records').toJS();
        let newMessage      = 0;
        console.log('Reducer - New Message: chatId = ' + chatId);
        
        if (action.message.newChat) {
            if (chatId !== state.get('getChatMessagesRequest').get('chatId')) {
                chatsRecords.unshift(action.message);
            } else {
                chatMessages.push(action.message.message);
            }
            newMessage ++;
        } else {
            chatsRecords = chatsRecords.map(record => {
                if (record.chatId === chatId) {
                    if (state.get('getChatMessagesRequest').get('chatId') === chatId) {
                        chatMessages.push(action.message);
                    } else {
                        record.newMessages ++;
                        newMessage ++;
                    }
                    record.lastActivity = action.message.created;
                }
                return record;
            });
        }

        return state.set(recordsKey, state.get(recordsKey).set('records', Immutable.fromJS(chatsRecords).sort(
                (a, b) => (a.get('lastActivity') < b.get('lastActivity'))
            )))
            .set('getChatMessagesRequest', state.get('getChatMessagesRequest').set('records', Immutable.fromJS(chatMessages)))
            .set('getUnreadMessagesRequest', state.get('getUnreadMessagesRequest').set('records', updateUnread(state, newMessage, action.message.isPrivate)));
    }
    
    case MESSAGE_REMOVED: {        
        if (state.get('getChatMessagesRequest').get('chatId') === action.message.chatId) {
            let chatMessages  = state.get('getChatMessagesRequest').get('records').toJS();            
            
            chatMessages = chatMessages.map(record => {
                if (record.id === action.message.id) {
                    record.removed = true;
                }
                return record;
            });            
            return state.set('getChatMessagesRequest', state.get('getChatMessagesRequest').set('records', Immutable.fromJS(chatMessages)));            
        }
        return state;
    }
    /**
     *  send message
     */
    case SEND_MESSAGE:
    case SEND_CHAT_MESSAGE:
        return state.set('sendMessageRequest', initialState.get('sendMessageRequest').set('loading', true));
    case SEND_MESSAGE_SUCCESS:
        return state.set('sendMessageRequest', initialState.get('sendMessageRequest').set('success', true));
    case SEND_CHAT_MESSAGE_SUCCESS:   
        let messages = state.get('getChatMessagesRequest').get('records').toJS();
        
        messages.push(action.result.data);
        
        return state
                .set('getChatMessagesRequest', state.get('getChatMessagesRequest').set('records', Immutable.fromJS(messages)))
                .set('sendMessageRequest', initialState.get('sendMessageRequest').set('success', true));    
    case SEND_MESSAGE_FAIL:
    case SEND_CHAT_MESSAGE_FAIL:        
      return state
        .set('sendMessageRequest', state.get('sendMessageRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined)
        );
    case RESET_SEND_MESSAGE_REQUEST:
    case RESET_SEND_CHAT_MESSAGE_REQUEST:
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
        
    case DELETE_CHAT_MESSAGE:
        return state.set('deleteRecordRequest', initialState.get('deleteRecordRequest').set('loading', true).set('id', action.messageId));    
    case DELETE_MESSAGE:    
        return state.set('deleteRecordRequest', initialState.get('deleteRecordRequest').set('loading', true));    
    case DELETE_CHAT_MESSAGE_SUCCESS: {
        let messages = state.get('getChatMessagesRequest').get('records').filter(function(item) {                
            return item.get('id') !== action.messageId;
        });
        return state.set('deleteRecordRequest', initialState.get('deleteRecordRequest').set('success', true).set('id', null))
                    .set('getChatMessagesRequest', state.get('getChatMessagesRequest').set('records', messages));                      
    }
    case DELETE_MESSAGE_SUCCESS:
        return state.set('deleteRecordRequest', initialState.get('deleteRecordRequest').set('success', true));    
    case DELETE_MESSAGE_FAIL:
    case DELETE_CHAT_MESSAGE_FAIL:
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
                    
    case GET_PRIVATE_CHATS:    
        return state.set('getPrivateChatsRequest', initialState.get('getPrivateChatsRequest').set('loading', true));    
    case GET_PRIVATE_CHATS_SUCCESS:    
        return state.set('getPrivateChatsRequest', initialState.get('getPrivateChatsRequest')
                .set('success', true)                
                .set('records', Immutable.fromJS(action.result.data).sort(
                    (a, b) => (a.get('lastActivity') < b.get('lastActivity'))
                )));           
    case GET_PRIVATE_CHATS_FAIL:   
        return state.set('getPrivateChatsRequest', initialState.get('getPrivateChatsRequest').set('fail', true));
        
    case GET_GROUP_CHATS:    
        return state.set('getGroupChatsRequest', initialState.get('getGroupChatsRequest').set('loading', true));    
    case GET_GROUP_CHATS_SUCCESS:    
        return state.set('getGroupChatsRequest', initialState.get('getGroupChatsRequest')
                .set('success', true)                
                .set('records', Immutable.fromJS(action.result.data).sort(
                    (a, b) => (a.get('lastActivity') < b.get('lastActivity'))
                )));           
    case GET_GROUP_CHATS_FAIL:   
        return state.set('getGroupChatsRequest', initialState.get('getGroupChatsRequest').set('fail', true));
    
    case GET_CHAT_MESSAGES:    
        return state.set('getChatMessagesRequest', initialState.get('getChatMessagesRequest').set('loading', true));    
    case GET_CHAT_MESSAGES_SUCCESS:
        let readMessages = 0;
        let isPrivate    = (action.chatId.indexOf('private') > -1);
        let chatKey      = isPrivate ? 'getPrivateChatsRequest' : 'getGroupChatsRequest';
        let records = state.get(chatKey).get('records').toJS().map(record => {            
            if (record.chatId === action.chatId) {
                readMessages = record.newMessages;
                record.newMessages = 0;                
            }
            return record;
        });            
                                                                                                                                
        action.result.data.reverse();
                                                                                                                                
        return state.set(chatKey, state.get(chatKey).set('records',  Immutable.fromJS(records)))
                .set('getUnreadMessagesRequest', state.get('getUnreadMessagesRequest').set('records', updateUnread(state, - readMessages, isPrivate)))
                .set('getChatMessagesRequest', initialState.get('getChatMessagesRequest')
                .set('success', true)
                .set('chatId', action.chatId)                
                .set('records', Immutable.fromJS(action.result.data)));    
    
    case GET_CHAT_MESSAGES_FAIL:   
        return state.set('getChatMessagesRequest', initialState.get('getChatMessagesRequest').set('fail', true));            
    
    case READ_MESSAGES:        
    case GET_UNREAD_MESSAGES:    
        return state.set('getUnreadMessagesRequest', state.get('getUnreadMessagesRequest').set('loading', true).set('fail', false));
    case READ_MESSAGES_SUCCESS:        
    case GET_UNREAD_MESSAGES_SUCCESS:    
        return state.set('getUnreadMessagesRequest', state.get('getUnreadMessagesRequest')
                .set('loading', false)
                .set('fail', false)
                .set('success', true)                
                .set('records', Immutable.fromJS(action.result.data)));
    case READ_MESSAGES_FAIL:        
    case GET_UNREAD_MESSAGES_FAIL:    
        return state.set('getUnreadMessagesRequest', state.get('getUnreadMessagesRequest').set('loading', false).set('success', false).set('fail', true));            
    
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