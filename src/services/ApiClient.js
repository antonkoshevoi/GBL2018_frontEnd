import axios from 'axios';
import { env } from '../configs/env'
import SessionStorage from './SessionStorage';

export default class ApiClient
{
  configs = {};
  defaultConfigs = {};

  constructor () {
    const token = SessionStorage.get('token');
    let headers = {};

    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    this.defaultConfigs = {
      headers,
      params: {}
    };

    this.resetConfigs();
  }

  getRuntimeConfigs() {
    const token = SessionStorage.get('token');
    let headers = {};

    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    return Object.assign({}, this.configs, {
      headers
    });
  }

  resetConfigs () {
    this.configs = Object.assign({}, this.defaultConfigs);
  }

  setConfig (key, value) {
    this.configs = Object.assign({}, this.configs, {
      [key]: value
    });
  }

  mergeConfigs (params, headers, configs) {
    const runtimeConfigs = this.getRuntimeConfigs();
    return Object.assign(
      {},
      runtimeConfigs,
      Object.assign(
        {},
        configs,
        {
          params: Object.assign({}, runtimeConfigs.params, params),
          headers: Object.assign({}, runtimeConfigs.headers, headers),
        }
      )
    )
  }

  static cancelToken () {
    const CancelToken = axios.CancelToken;
    return CancelToken.source();
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

  upload (uri, file, data, params = {}, headers = {}, configs = {}) {
    let formData = new FormData();
    formData.append('file', file);

    for(const key in data) {
      if(data.hasOwnProperty(key)) {
        formData.append (key, data[key]);
      }
    }

    return this.post(uri, formData, params, headers, configs);
  }
}