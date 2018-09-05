export const GET_RECORDS = '[Surveys] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Surveys] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Surveys] GET_RECORDS_FAIL';

export const GET_ASSIGNED_RECORDS = '[Surveys] GET_ASSIGNED_RECORDS';
export const GET_ASSIGNED_RECORDS_SUCCESS = '[Surveys] GET_ASSIGNED_RECORDS_SUCCESS';
export const GET_ASSIGNED_RECORDS_FAIL = '[Surveys] GET_ASSIGNED_RECORDS_FAIL';

export const GET_ASSIGNED_RECORD = '[Surveys] GET_ASSIGNED_RECORD';
export const GET_ASSIGNED_RECORD_SUCCESS = '[Surveys] GET_ASSIGNED_RECORD_SUCCESS';
export const GET_ASSIGNED_RECORD_FAIL = '[Surveys] GET_ASSIGNED_RECORD_FAIL';

export const GET_RECORD = '[Surveys] GET_RECORD';
export const GET_RECORD_SUCCESS = '[Surveys] GET_RECORD_SUCCESS';
export const GET_RECORD_FAIL = '[Surveys] GET_RECORD_FAIL';

export const CREATE = '[Surveys] CREATE';
export const CREATE_SUCCESS = '[Surveys] CREATE_SUCCESS';
export const CREATE_FAIL = '[Surveys] CREATE_FAIL';
export const RESET_CREATE_REQUEST = '[Surveys] RESET_CREATE_REQUEST';

export const UPDATE = '[Surveys] UPDATE';
export const UPDATE_SUCCESS = '[Surveys] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Surveys] UPDATE_FAIL';
export const RESET_UPDATE_REQUEST = '[Surveys] RESET_UPDATE_REQUEST';

export const DELETE = '[Surveys] DELETE';
export const DELETE_SUCCESS = '[Surveys] DELETE_SUCCESS';
export const DELETE_FAIL = '[Surveys] DELETE_FAIL';

export const ASSIGN_TEACHERS = '[Surveys] ASSIGN_TEACHERS';
export const ASSIGN_TEACHERS_SUCCESS = '[Surveys] ASSIGN_TEACHERS_SUCCESS';
export const ASSIGN_TEACHERS_FAIL = '[Surveys] ASSIGN_TEACHERS_FAIL';
export const RESET_ASSIGN_TEACHERS_REQUEST = '[Surveys] RESET_ASSIGN_TEACHERS_REQUEST';

export const ADD_ANSWERS = '[Surveys] ADD_ANSWERS';
export const ADD_ANSWERS_SUCCESS = '[Surveys] ADD_ANSWERS_SUCCESS';
export const ADD_ANSWERS_FAIL = '[Surveys] ADD_ANSWERS_FAIL';
export const RESET_ADD_ANSWERS_REQUEST = '[Surveys] RESET_ADD_ANSWERS_REQUEST';

export function getRecords(params = {}) {
    return {
        types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
        promise: (apiClient) => apiClient.get('surveys', params)
    };
}

export function getAssignedRecords(params = {}) {
    return {
        types: [GET_ASSIGNED_RECORDS, GET_ASSIGNED_RECORDS_SUCCESS, GET_ASSIGNED_RECORDS_FAIL],
        promise: (apiClient) => apiClient.get('surveys/assigned', params)
    };
}

export function getRecord(id) {
    return {
        types: [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAIL],
        promise: (apiClient) => apiClient.get(`surveys/detail/${id}`)
    };
}

export function getAssignedRecord(id) {
    return {
        types: [GET_ASSIGNED_RECORD, GET_ASSIGNED_RECORD_SUCCESS, GET_ASSIGNED_RECORD_FAIL],
        promise: (apiClient) => apiClient.get(`surveys/assigned-detail/${id}`)
    };
}

export function create(data, params = {}) {
    return {
        types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
        promise: (apiClient) => apiClient.post('surveys/create', data, params)
    };
}

export function update(id, data, params = {}) {
    return {
        types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
        promise: (apiClient) => apiClient.post(`surveys/update/${id}`, data, params)
    };
}

export function assignTeachers(id, data, params) {
    return {
        types: [ASSIGN_TEACHERS, ASSIGN_TEACHERS_SUCCESS, ASSIGN_TEACHERS_FAIL],
        promise: (apiClient) => apiClient.post(`surveys/assign-teachers/${id}`, data, params)
    };
}

export function resetCreateRequest() {
    return {
        type: RESET_CREATE_REQUEST
    }
}

export function resetUpdateRequest() {
    return {
        type: RESET_UPDATE_REQUEST
    }
}

export function resetAssignTeachersRequest() {
    return {
        type: RESET_ASSIGN_TEACHERS_REQUEST
    }
}

export function deleteRecord(id) {
    return {
        types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
        promise: (apiClient) => apiClient.get(`surveys/delete/${id}`)
    };
}

export function addAnswers(id) {
    return {
        types: [ADD_ANSWERS,  ADD_ANSWERS_SUCCESS, ADD_ANSWERS_FAIL],
        promise: (apiClient) => apiClient.get(`surveys/add-answers/${id}`)
    };
}
