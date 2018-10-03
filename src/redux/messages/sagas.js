import { all, takeLatest } from 'redux-saga/effects';
import {
    SEND_MESSAGE_FAIL, 
    GET_MESSAGE_FAIL,
    DELETE_MESSAGE_FAIL,
    DELETE_DRAFT_MESSAGE_FAIL,
    GET_SENT_MESSAGES_FAIL,
    GET_DRAFT_MESSAGES_FAIL,
    GET_INBOX_MESSAGES_FAIL,  
    GET_UNREAD_MESSAGES_FAIL,
    VIEW_MESSAGE_FAIL,
    SEND_MESSAGE_SUCCESS,
    DELETE_MESSAGE_SUCCESS,
    DELETE_DRAFT_MESSAGE_SUCCESS
} from './actions';

import { yieldErrorToasts, yieldSuccessToasts } from '../../helpers/utils';
import i18n from '../../configs/i18n';

const messagesSagas = all([
    yieldSuccessToasts({
        [SEND_MESSAGE_SUCCESS]: i18n.t('messages:messageIsSent'),
        [DELETE_MESSAGE_SUCCESS]: i18n.t('messages:messageDeleted'),
        [DELETE_DRAFT_MESSAGE_SUCCESS]: i18n.t('messages:messageDeleted'),
    }),
    yieldErrorToasts([
        SEND_MESSAGE_FAIL, 
        GET_MESSAGE_FAIL,
        GET_SENT_MESSAGES_FAIL,
        GET_DRAFT_MESSAGES_FAIL,
        GET_INBOX_MESSAGES_FAIL,  
        GET_UNREAD_MESSAGES_FAIL,
        DELETE_MESSAGE_FAIL,
        DELETE_DRAFT_MESSAGE_FAIL,
        VIEW_MESSAGE_FAIL
    ])
]);

export default messagesSagas;