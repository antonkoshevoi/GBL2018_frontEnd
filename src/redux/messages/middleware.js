import { NEW_MESSAGE_RECEIVED, SUBSCRIBE, SUBSCRIBE_FAIL } from './actions';
import LiveService from '../../services/LiveService';

export default function messagesMiddleware() {
    return ({getState, dispatch}) => {
        return next => action => {

            const {type, userId, ...rest} = action;

            console.log('messagesMiddleware userId: ' + userId);
            console.log('messagesMiddleware type: ' + type);
            if (type !== SUBSCRIBE) {
                console.log('messagesMiddleware next');
                return next(action);
            } else {
                console.log('messagesMiddleware SUBSCRIBE!');
            }
            
            if (!userId) {
                console.log('messagesMiddleware SUBSCRIBE_FAIL');
                return next({...rest, type: SUBSCRIBE_FAIL});
            }            

            LiveService.messages(userId, message => {
                console.log('messagesMiddleware NEW_MESSAGE_RECEIVED');
                console.log('userId: ' + userId);
                console.log(message);
                dispatch({type: NEW_MESSAGE_RECEIVED, message})
            });
            /*
             LiveService.threads(userId, thread => {
             dispatch({type: NEW_THREAD_CREATED, thread})
             });*/
        };
    };
}