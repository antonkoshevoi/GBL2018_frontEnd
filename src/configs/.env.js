export const env = {
  DEBUG: process.env.NODE_ENV === 'development',
  API_URI: process.env.NODE_ENV === 'development' ? 'http://api.gravitybrain.loc/1.0' : 'https://api.gravitybrain.com/1.0',
  PUSHER_APP_KEY: process.env.NODE_ENV === 'production' ? '66a42eaeff65aab2a335' : '8e6b7b90711c72e76633',
  PUSHER_CLUSTER: 'us2'  
};