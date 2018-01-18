
const API_DEV_URI = "http://api.gravitybrain.loc/1.0";
const API_PROD_URI = "http://gravitybrain.api.myemo.am/1.0";

export const env = {
    API_URI: process.env.NODE_ENV === 'production' ? API_PROD_URI : API_DEV_URI,
};