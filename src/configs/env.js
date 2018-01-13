
const API_DEV_URL = "http://api.gravitybrain.loc/1.0/"
const API_PROD_URL = "http://api.gravitybrain.myemo.am/1.0/"



export default {
    url:process.env.NODE_ENV === 'production' ? API_PROD_URL : API_DEV_URL,
}