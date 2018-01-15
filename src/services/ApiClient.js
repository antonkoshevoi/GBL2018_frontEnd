import axios from 'axios';
import { env } from '../configs/env'

export default class ApiClient
{
  get (uri) {
    return axios.get(`${env.API_URI}/${uri}`)
      .then(response => response.data);
  }

  post = (uri, data) => {
    return axios.post(`${env.API_URI}/${uri}`, data)
      .then(response => response.data);
  }
}