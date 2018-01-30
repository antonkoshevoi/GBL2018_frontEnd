export const GET_RECORDS = '[Transactions] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Transactions] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Transactions] GET_RECORDS_FAIL';


export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('store/transactions', params)
  };
}

