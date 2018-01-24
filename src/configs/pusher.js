import Pusher from 'pusher-js';
import { env } from '../configs/.env';
import SessionStorage from '../services/SessionStorage';

Pusher.logToConsole = env.DEBUG;

const pusher = new Pusher('76ec1d6846da76372695', {
  cluster: 'ap2',
  authEndpoint: `${env.API_URI}/broadcasting/auth`,
  auth: {
    headers: {
      'Authorization': 'Bearer ' + SessionStorage.get('token')
    }
  },
  encrypted: true
});

export default pusher;