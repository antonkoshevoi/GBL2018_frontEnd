const API_DEV_URI = "http://api.gravitybrain.homestead/1.0";
const API_PROD_URI = "https://dev.api.gravitybrain.com/1.0";

export const env = {
  DEBUG: process.env.NODE_ENV !== 'production',
  API_URI: process.env.NODE_ENV === 'production' ? API_PROD_URI : API_DEV_URI,
  PUSHER_APP_KEY: process.env.NODE_ENV === 'production' ? '66a42eaeff65aab2a335' : '76ec1d6846da76372695',
  PUSHER_CLUSTER: 'ap2'
};