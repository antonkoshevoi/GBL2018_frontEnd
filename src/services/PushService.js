import Push from 'push.js';

export default class PushService {

  static create (title = '', body = '', icon, link ='/') {
    Push.create(title, {
      body, icon, link,
      timeout: 4000
    });
  }
}