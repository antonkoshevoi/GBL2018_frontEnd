import { NEW_MESSAGE_RECEIVED, MESSAGE_REMOVED, SUBSCRIBE, SUBSCRIBE_FAIL } from './actions';
import { LOGOUT_SUCCESS } from '../auth/actions';
import LiveService from '../../services/LiveService';

export default function messagesMiddleware() {
    return ({getState, dispatch}) => {
        return next => action => {

            const {type, userId, ...rest} = action;

            if (type !== SUBSCRIBE) {
                if (type === LOGOUT_SUCCESS) {
                    console.log('messagesMiddleware LOGOUT_SUCCESS');
                    LiveService.disconnect();
                }
                return next(action);
            }
            
            if (!userId) {                
                return next({...rest, type: SUBSCRIBE_FAIL});
            }            

            LiveService.messages(userId, (message) => {
                console.log('messagesMiddleware NEW_MESSAGE_RECEIVED');
                dispatch({type: NEW_MESSAGE_RECEIVED, message})
            }, (message) => {
                console.log('messagesMiddleware MESSAGE_REMOVED');
                dispatch({type: MESSAGE_REMOVED, message})
            });
        };
    };
}