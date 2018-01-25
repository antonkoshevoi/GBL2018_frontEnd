import SessionStorage from '../services/SessionStorage';

export const saveSession = ({ token, expiresAt, refreshToken }, remember) => {
  const options = {
    path: '/',
    expires: new Date(expiresAt * 1000)
  };

  SessionStorage.set('token', token, options);
  SessionStorage.set('tokenExpiresAt', options.expires, options);

  if (remember) {
    const rememberOptions = {
      path: '/',
      expires: new Date(expiresAt * 1000 + (30 * 24 * 3600 * 1000))
    };
    SessionStorage.set('refreshToken', refreshToken, rememberOptions);
  }
};

export const destroySession = () => {
  const options = {
    path: '/'
  };

  SessionStorage.remove('token', options);
  SessionStorage.remove('tokenExpiresAt', options);
  SessionStorage.remove('refreshToken', options);
};