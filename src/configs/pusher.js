import Pusher from 'pusher-js';
import { env } from '../configs/.env';
import SessionStorage from '../services/SessionStorage';

Pusher.logToConsole = env.DEBUG;

const pusher = new Pusher(env.PUSHER_APP_KEY, {
  cluster: env.PUSHER_CLUSTER,
  authEndpoint: `${env.API_URI}/broadcasting/auth`,
  auth: {
    headers: {
      'Authorization': 'Bearer ' + SessionStorage.get('token')
    }
  },
  encrypted: true
});

export default pusher;