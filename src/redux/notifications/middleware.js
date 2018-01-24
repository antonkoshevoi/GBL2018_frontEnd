import { NEW_NOTIFICATION, SUBSCRIBE, SUBSCRIBE_FAIL } from './actions';
import LiveService from '../../services/LiveService';

export default function notificationsMiddleware() {
  return ({getState, dispatch}) => {
    return next => action => {

      const { type, userId, ...rest } = action;

      if ( type !== SUBSCRIBE) {
        return next(action);
      }

      if (!userId) {
        return next({...rest, type: SUBSCRIBE_FAIL});
      }

      LiveService.notifications(userId, notification => {
        dispatch({type: NEW_NOTIFICATION, notification})
      });
    };
  };
}