import axios from 'axios';
import { env } from '../configs/env'

export const get = (uri) => {
  return axios.get(`${env.API_URI}/${uri}`);
};

export const post = (uri, data) => {
  return axios.post(`${env.API_URI}/${uri}`, data)
};