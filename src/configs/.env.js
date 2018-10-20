export const env = {
  DEBUG: process.env.NODE_ENV === 'development',
  API_URI: process.env.NODE_ENV === 'development' ? 'http://api.gravitybrain.loc/1.0' : 'https://api.gravitybrain.com/1.0'
};