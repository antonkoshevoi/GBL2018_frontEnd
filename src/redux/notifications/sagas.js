import { all, takeLatest } from 'redux-saga/effects';
import {
  NEW_NOTIFICATION, SUBSCRIBE_FAIL
} from './actions';
import toastr from 'toastr';
import PushService from '../../services/PushService';

function* afterFailedToSubscribe (action) {
  toastr.error('Failed to connect to notifications channel');
}

function* afterReceivedNewNotification (action) {
  toastr.success('You have new notification');
  PushService.create(
    action.notification.title,
    action.notification.body,
    action.notification.icon
  );
}

const notificationsSagas = all([
  takeLatest(SUBSCRIBE_FAIL, afterFailedToSubscribe),
  takeLatest(NEW_NOTIFICATION, afterReceivedNewNotification),
]);

export default notificationsSagas;