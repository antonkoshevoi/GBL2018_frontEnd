import { NEW_MESSAGE_RECEIVED, MESSAGE_REMOVED, SUBSCRIBE, SUBSCRIBE_FAIL } from './actions';
import { LOGOUT_SUCCESS } from '../auth/actions';
import LiveService from '../../services/LiveService';

export default function messagesMiddleware() {
    return ({dispatch}) => {
        return next => action => {

            const {type, userId, ...rest} = action;

            if (type !== SUBSCRIBE) {
                if (type === LOGOUT_SUCCESS) {
                    LiveService.disconnect();
                }
                return next(action);
            }
            
            if (!userId) {                
                return next({...rest, type: SUBSCRIBE_FAIL});
            }            

            LiveService.messages(userId, (message) => {
                dispatch({type: NEW_MESSAGE_RECEIVED, message})
            }, (message) => {                
                dispatch({type: MESSAGE_REMOVED, message})
            });
        };
    };
}