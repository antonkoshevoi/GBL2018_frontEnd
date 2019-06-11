import SessionStorage from '../services/SessionStorage';


export const saveSession = ({ token, expiresAt, refreshToken }, remember) => {
  const options = {
    path: '/',
    expires: new Date(expiresAt * 1000)
  };

  SessionStorage.set('token', token, options);
  SessionStorage.set('tokenExpiresAt', options.expires, options);

  const rememberOptions = {
      path: '/',
      expires: new Date(expiresAt * 1000 + (30 * 24 * 3600 * 1000))
  };

  if (remember) {
    SessionStorage.set('refreshToken', refreshToken, rememberOptions);
  }
};


export const saveUserDataSession = (data) => {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000*36000;
    now.setTime(expireTime);

  const userData = SessionStorage.get('userData');
    const rememberOptions = {
      path: '/',
      expires: new Date(now * 1000 + (30 * 24 * 3600 * 1000))
  };

  if (!userData) {
      SessionStorage.set('userData', data,rememberOptions);
  }
}

export const destroySession = () => {
  const options = {
    path: '/'
  };
  SessionStorage.remove('invoiceNo', options);
  SessionStorage.remove('token', options);
  SessionStorage.remove('tokenExpiresAt', options);
  SessionStorage.remove('refreshToken', options);
  SessionStorage.remove('userData',options);
};

export const destroyTokenSession = () => {
    const options = {
        path: '/'
    };    
    SessionStorage.remove('token', options);
    SessionStorage.remove('tokenExpiresAt', options);
    SessionStorage.remove('refreshToken', options);
};