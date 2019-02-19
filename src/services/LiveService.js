import PusherService from '../configs/pusher';

export default class LiveService {
    /*
     static notifications (userId, callback) {
     const channel = getPusher().subscribe(`private-App.User.${userId}`);
     channel.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', callback);
     }
     
     static threads (userId, callback) {
     const channel = getPusher().subscribe(`private-user.messenger.${userId}`);
     channel.bind('thread.created', callback);
     }
     */

    static messages(userId, newMessageCallback, removeMessageCallback) {
        const channel = PusherService.connect().subscribe(`private-user.messenger.${userId}`);
        
        channel.bind('message.created', newMessageCallback);
        channel.bind('message.removed', removeMessageCallback);
    }
    
    static disconnect() {
       PusherService.reset();
    }
}