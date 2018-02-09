export const GET_RECORDS = '[Countries] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Countries] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Countries] GET_RECORDS_FAIL';


export function getCountries(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('countries', params)
  };
}

