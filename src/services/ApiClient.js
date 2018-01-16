import axios from 'axios';
import { env } from '../configs/env'
import SessionStorage from './SessionStorage';

export default class ApiClient
{
  getDefaultConfigs () {
    return {};
  }

  getDefaultParams () {
    return {};
  }

  getDefaultHeaders () {
    const token = SessionStorage.get('token');
    let headers = {};

    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    return headers;
  }

  mergeConfigs (params, headers, configs) {
    return Object.assign(
      {},
      this.getDefaultConfigs(),
      Object.assign(
        {},
        configs,
        {
          params: Object.assign({}, this.getDefaultParams(), params),
          headers: Object.assign({}, this.getDefaultHeaders(), headers),
        }
      )
    )
  }

  get (uri, params = {}, headers = {}, configs = {}) {
    return axios.get(`${env.API_URI}/${uri}`,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  post (uri, data, params = {}, headers = {}, configs = {}) {
    return axios.post(`${env.API_URI}/${uri}`, data,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  put (uri, data, params = {}, headers = {}, configs = {}) {
    return axios.put(`${env.API_URI}/${uri}`, data,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }
}