export const GET_RECORDS = '[Transactions] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Transactions] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Transactions] GET_RECORDS_FAIL';

export const GET_DOWNLOADS = '[Transactions] GET_DOWNLOADS';
export const GET_DOWNLOADS_SUCCESS = '[Transactions] GET_DOWNLOADS_SUCCESS';
export const GET_DOWNLOADS_FAIL = '[Transactions] GET_DOWNLOADS_FAIL';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('store/transactions', params)
  };
}


export function getDownloadsRecords(params = {}) {
  return {
    types: [GET_DOWNLOADS, GET_DOWNLOADS_SUCCESS, GET_DOWNLOADS_FAIL],
    promise: (apiClient) => apiClient.get('store/downloads', params)
  };
}

