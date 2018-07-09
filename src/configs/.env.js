const API_DEV_URI = "https://api.gravitybrain.com/1.0";
// TODO uncomment it
// const API_DEV_URI = "http://gbl2018.dev/1.0";
const API_PROD_URI = "http://api.gravitybrain.loc/1.0";

export const env = {
  DEBUG: process.env.NODE_ENV !== 'production',
  API_URI: API_PROD_URI,
  PUSHER_APP_KEY: '8e6b7b90711c72e76633',
  PUSHER_CLUSTER: 'us2'
};