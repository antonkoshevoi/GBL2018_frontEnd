export const GET_RECORDS = '[Surveys] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Surveys] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Surveys] GET_RECORDS_FAIL';

export const GET_RECORD = '[Surveys] GET_RECORD';
export const GET_RECORD_SUCCESS = '[Surveys] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[Surveys] GET_RECORD_FAIL';

export const CREATE = '[Surveys] CREATE';
export const CREATE_SUCCESS = '[Surveys] CREATE_SUCCESS';
export const CREATE_FAIL = '[Surveys] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Surveys] RESET_CREATE_ERRORS';

export function getRecords(params = {}) {
    return {
        types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
        promise: (apiClient) => apiClient.get('surveys', params)
    };
}

export function getRecord(id) {
    return {
        types: [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL],
        promise: (apiClient) => apiClient.get(`surveys/detail/${id}`)
    };
}

export function create(data, params = {}) {
    return {
        types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
        promise: (apiClient) => apiClient.post('surveys/create', data, params)
    };
}

export function resetCreateRequest() {
    return {
        type: RESET_CREATE_REQUEST
    }
}