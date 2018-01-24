import pusher from '../configs/pusher';

export default class LiveService {

  static notifications (userId, callback) {
    const channel = pusher.subscribe(`private-App.User.${userId}`);
    channel.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', callback);
  }

  static messages (userId, callback) {
    const channel = pusher.subscribe(`private-user.messenger.${userId}`);
    channel.bind('message.created', callback);
  }
}