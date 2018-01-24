const API_DEV_URI = "http://api.gravitybrain.local/1.0";
const API_PROD_URI = "http://gravitybrain.api.myemo.am/1.0";

export const env = {
  DEBUG: process.env.NODE_ENV !== 'production',
  API_URI: process.env.NODE_ENV === 'production' ? API_PROD_URI : API_DEV_URI,
};