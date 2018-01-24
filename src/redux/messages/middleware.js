import { NEW_MESSAGE_RECEIVED, SUBSCRIBE, SUBSCRIBE_FAIL } from './actions';
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
        dispatch({type: NEW_MESSAGE_RECEIVED, message})
      });
    };
  };
}