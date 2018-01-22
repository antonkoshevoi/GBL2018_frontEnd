import SessionStorage from '../services/SessionStorage';

export const saveSession = ({ token, expiresAt, refreshToken }) => {
  const options = {
    path: '/',
    expires: new Date(expiresAt * 1000)
  };

  SessionStorage.set('token', token, options);
  SessionStorage.set('tokenExpiresAt', options.expires, options);
  SessionStorage.set('refreshToken', refreshToken, options);
};

export const destroySession = () => {
  const options = {
    path: '/'
  };

  SessionStorage.remove('token', options);
  SessionStorage.remove('tokenExpiresAt', options);
  SessionStorage.remove('refreshToken', options);
};