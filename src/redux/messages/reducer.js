import {
  NEW_MESSAGE_RECEIVED, SELECT_THREAD,
  GET_THREADS, GET_THREADS_FAIL, GET_THREADS_SUCCESS, SEND_NEW_MESSAGE, GET_AVAILABLE_USERS,
  GET_AVAILABLE_USERS_SUCCESS, GET_AVAILABLE_USERS_FAIL, CREATE_NEW_THREAD, CREATE_NEW_THREAD_SUCCESS,
  NEW_THREAD_CREATED
} from './actions';
import Immutable from 'immutable';
import {
  addColorsForParticipants, addIncomingMessageToQuery, addOutgoingMessageToQuery,
  buildMessagesQueue
} from '../../helpers/messages';

const initialState = Immutable.fromJS({
  getThreadsRequest: {
    loading: false,
    success: false,
    fail: false
  },
  createThreadRequest: {
    loading: false,
    success: false,
    fail: false
  },
  sendMessageRequest: {
    loading: false,
    success: false,
    fail: false
  },
  getAvailableUsersRequest: {
    loading: false,
    success: false,
    fail: false,
  },
  threads: {},
  availableUsers: [],
  recentMessages: {},
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     *  Threads
     */
    case GET_THREADS:
      return state
        .set('getThreadsRequest', state.get('getThreadsRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        ).set('threads', Immutable.Map());
    case GET_THREADS_SUCCESS:
      let threads = {};
      for (let res of action.result.data) {
        threads[res.id] = buildMessagesQueue(
          addColorsForParticipants(res)
        );
      }

      return state
        .set('getThreadsRequest', state.get('getThreadsRequest')
          .set('success', true)
          .remove('loading')
        ).set('threads', Immutable.fromJS(threads));
    case GET_THREADS_FAIL:
      return state
        .set('getThreadsRequest', state.get('getThreadsRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * New Thread
     */
    case CREATE_NEW_THREAD:
      return state
        .set('createThreadRequest', state.get('createThreadRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case CREATE_NEW_THREAD_SUCCESS:
      return state
        .set('createThreadRequest', state.get('createThreadRequest')
          .set('success', true)
          .remove('loading')
        ).set('threads', state.get('threads')
          .set(`${action.result.data.id}`, Immutable.fromJS(action.result.data))
        );
    /**
     * New Message
     */
    case SEND_NEW_MESSAGE:
      return state
        .setIn(['threads', `${action.threadId}`], Immutable.fromJS(
          addOutgoingMessageToQuery(
            state.getIn(['threads', `${action.threadId}`]).toJS(), action.messageBody
          )
        ));
    /**
     * New Message
     */
    case NEW_MESSAGE_RECEIVED:
      const threadId = action.message.threadId;

      if (!state.getIn(['threads', `${threadId}`])) {
        return state;
      }

      return state
        .setIn(['threads', `${threadId}`], Immutable.fromJS(
          addIncomingMessageToQuery(
            state.getIn(['threads', `${threadId}`]).toJS(), action.message
          )
        ));
    /**
     * New Thread
     */
    case NEW_THREAD_CREATED:
      return state.set('threads', state.get('threads')
        .set(`${action.thread.id}`, Immutable.fromJS(action.thread))
      );
    /**
     *  available users
     */
    case GET_AVAILABLE_USERS:
      return state
        .set('getAvailableUsersRequest', state.get('getAvailableUsersRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        ).set('availableUsers', Immutable.List());
    case GET_AVAILABLE_USERS_SUCCESS:
      return state
        .set('getAvailableUsersRequest', state.get('getAvailableUsersRequest')
          .set('success', true)
          .remove('loading')
        ).set('availableUsers', Immutable.fromJS(action.result.data));
    case GET_AVAILABLE_USERS_FAIL:
      return state
        .set('getAvailableUsersRequest', state.get('getAvailableUsersRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * default
     */
    default:
      return state;
  }
}