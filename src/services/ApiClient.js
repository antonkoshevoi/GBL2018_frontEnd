import axios from 'axios';
import qs from 'qs';
import {env} from '../configs/.env'
import SessionStorage from './SessionStorage';

export default class ApiClient {
  configs = {};
  defaultConfigs = {};

  constructor() {
    const token = SessionStorage.get('token');
    const currentLanguage = localStorage.getItem('language');
    
    let headers = {};
    
    if (currentLanguage) {
        headers['Content-Language'] = currentLanguage;
    }    

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
    const currentLanguage = localStorage.getItem('language');
    const currentCountry = SessionStorage.get('userCountry');
    
    let headers = {};

    if (currentCountry) {
        headers['X-User-Country-Code'] = currentCountry;
    }
    if (currentLanguage) {
        headers['Content-Language'] = currentLanguage;
    }
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    return Object.assign({}, this.configs, {
      headers
    });
  }

  resetConfigs() {
    this.configs = Object.assign({}, this.defaultConfigs);
  }

  setConfig(key, value) {
    this.configs = Object.assign({}, this.configs, {
      [key]: value
    });
  }

  mergeConfigs(params, headers, configs) {
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
          paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'brackets'})
          }
        }
      )
    )
  }

  static cancelToken() {
    const CancelToken = axios.CancelToken;
    return CancelToken.source();
  }

  get(uri, params = {}, headers = {}, configs = {}) {
    return axios.get(`${env.API_URI}/${uri}`,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  post(uri, data, params = {}, headers = {}, configs = {}) {
    return axios.post(`${env.API_URI}/${uri}`, data,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  put(uri, data, params = {}, headers = {}, configs = {}) {
    return axios.put(`${env.API_URI}/${uri}`, data,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  delete(uri, params = {}, headers = {}, configs = {}) {
    return axios.delete(`${env.API_URI}/${uri}`,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  upload(uri, file, params = {}, headers = {}, configs = {}) {
    let formData = new FormData();
    formData.append('file', file);

    return this.post(uri, formData, params, headers, configs);
  }

  getJson(url) {
    return axios.get(url, {headers: {'Cache-Control': 'public'}}).then(response => response.data);
  }
}