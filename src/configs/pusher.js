import Pusher from 'pusher-js';
import { env } from '../configs/.env';
import SessionStorage from '../services/SessionStorage';

Pusher.logToConsole = true;//env.DEBUG;

export default class PusherService {
        
    pusher = null;
        
    static connect() {
        if (!this.pusher) {
            this.pusher = new Pusher(env.PUSHER_APP_KEY, {
                cluster: env.PUSHER_CLUSTER,
                authEndpoint: `${env.API_URI}/broadcasting/auth`,
                auth: {
                    headers: {
                        'Authorization': 'Bearer ' + SessionStorage.get('token')
                    }
                },
                encrypted: true
            });
        }
        return this.pusher;
    }
    
    static getPusher() {
        return this.pusher;
    }    

    static reset() {
        if (!this.pusher) {
            return true;
        }
        this.pusher.disconnect();
        this.pusher = null;
        return this.pusher;
    }
}


