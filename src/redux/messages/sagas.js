import { all, takeLatest } from 'redux-saga/effects';
import {
  NEW_MESSAGE_RECEIVED, SUBSCRIBE_FAIL
} from './actions';
import toastr from 'toastr';
import PushService from '../../services/PushService';

function* afterFailedToSubscribe (action) {
  toastr.error('Failed to connect to messages channel');
}

function* afterReceivedNewMessage (action) {
  toastr.success('You have a new message');
  PushService.create(
    action.notification.title,
    action.notification.body,
    action.notification.icon
  );
}

const messagesSagas = all([
  takeLatest(SUBSCRIBE_FAIL, afterFailedToSubscribe),
  // takeLatest(NEW_MESSAGE_RECEIVED, afterReceivedNewMessage),
]);

export default messagesSagas;