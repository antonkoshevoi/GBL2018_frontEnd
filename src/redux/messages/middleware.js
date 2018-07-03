import { NEW_MESSAGE_RECEIVED, NEW_THREAD_CREATED, SUBSCRIBE, SUBSCRIBE_FAIL } from './actions';
import LiveService from '../../services/LiveService';

export default function messagesMiddleware() {
  return ({getState, dispatch}) => {
    return next => action => {

      const { type, userId, ...rest } = action;

      if ( type !== SUBSCRIBE) {
        return next(action);
      }

      if (!userId) {
        return next({...rest, type: SUBSCRIBE_FAIL});
      }

      LiveService.messages(userId, message => {
        console.log("Messages middleware triggered: ", message);
        dispatch({type: NEW_MESSAGE_RECEIVED, message})
      });

      LiveService.threads(userId, thread => {
        console.log("Messages middleware triggered: ", thread);
        dispatch({type: NEW_THREAD_CREATED, thread})
      });
    };
  };
}