//const API_URI = "https://api.gravitybrain.com/1.0";
const API_URI = "http://api.gravitybrain.loc/1.0";

export const env = {
  DEBUG: process.env.NODE_ENV !== 'production',
  API_URI: API_URI
};