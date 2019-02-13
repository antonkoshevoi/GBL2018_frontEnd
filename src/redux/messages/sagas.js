import { all } from 'redux-saga/effects';
import {
    SEND_MESSAGE_FAIL,
    UPDATE_MESSAGE_FAIL,
    GET_MESSAGE_FAIL,
    DELETE_MESSAGE_FAIL, 
    GET_UNREAD_MESSAGES_FAIL,
    VIEW_MESSAGE_FAIL,
    SEND_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_SUCCESS,
    
    CREATE_GROUP_SUCCESS, 
    UPDATE_GROUP_SUCCESS, 
    DELETE_GROUP_SUCCESS, 
    
    GET_GROUPS_FAIL, 
    GET_GROUP_FAIL,
    CREATE_GROUP_FAIL,
    UPDATE_GROUP_FAIL,
    DELETE_GROUP_FAIL
} from './actions';

import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const messagesSagas = all([
    yieldSuccessToasts({
        [SEND_MESSAGE_SUCCESS]: i18n.t('messages:messageIsSent'),
        [DELETE_MESSAGE_SUCCESS]: i18n.t('messages:messageDeleted'),
        [CREATE_GROUP_SUCCESS]: i18n.t('messages:messageGroupCreated'),
        [UPDATE_GROUP_SUCCESS]: i18n.t('messages:messageGroupUpdated'),
        [DELETE_GROUP_SUCCESS]: i18n.t('messages:messageGroupDeleted'),
        [UPDATE_MESSAGE_SUCCESS]: i18n.t('messages:messageUpdated')
    }),
    yieldErrorToasts([
        SEND_MESSAGE_FAIL,
        UPDATE_MESSAGE_FAIL,
        GET_MESSAGE_FAIL,
        GET_UNREAD_MESSAGES_FAIL,
        DELETE_MESSAGE_FAIL,
        VIEW_MESSAGE_FAIL,
        GET_GROUPS_FAIL, 
        GET_GROUP_FAIL, 
        CREATE_GROUP_FAIL,
        UPDATE_GROUP_FAIL,
        DELETE_GROUP_FAIL
    ])
]);

export default messagesSagas;