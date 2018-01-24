import {
  NEW_MESSAGE_RECEIVED, SELECT_THREAD,
  GET_THREADS, GET_THREADS_FAIL, GET_THREADS_SUCCESS
} from './actions';
import Immutable from 'immutable';
import { randColorName } from '../../helpers/colors';

const initialState = Immutable.fromJS({
  getThreadsRequest: {
    loading: false,
    success: false,
    fail: false
  },
  sendMessageRequest: {
    loading: false,
    success: false,
    fail: false
  },
  selectedThreadId: undefined,
  threads: {},
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
      const threads = {};
      for (let res of action.result.data) {
        if (res.private) {
          res.user.color = randColorName();
        } else {
          res.participants = res.participants.map(participant => ({
            ...participant,
            color: randColorName()
          }));
        }
        threads[res.id] = res;
      }
      return state
        .set('getThreadsRequest', state.get('getThreadsRequest')
          .set('success', true)
          .remove('loading')
        ).set('threads', Immutable.fromJS(threads))
        .set('selectedThreadId', action.result.data[0].id);
    case GET_THREADS_FAIL:
      return state
        .set('getThreadsRequest', state.get('getThreadsRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * Select thread
     */
    case SELECT_THREAD:
      return state.set('selectedThreadId', action.id);
    /**
     * New Message
     */
    case NEW_MESSAGE_RECEIVED:
      const threadId = action.message.threadId;
      const search = ['threads', `${threadId}`, 'messages'];

      return state
        .setIn(search, state.getIn(search)
          .unshift(Immutable.fromJS(action.message))
        );
    /**
     * default
     */
    default:
      return state;
  }
}