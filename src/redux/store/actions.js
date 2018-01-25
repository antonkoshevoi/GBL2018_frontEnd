export const GET_RECORDS = '[Store] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Store] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Store] GET_RECORDS_FAIL';


export const GET_SINGLE_RECORD = '[Store] GET_SINGLE_RECORD';
export const GET_SINGLE_RECORD_SUCCESS = '[Store] GET_SINGLE_RECORD_SUCCESS';
export const GET_SINGLE_RECORD_FAIL = '[Store] GET_SINGLE_RECORD_FAIL';
export const RESET_GET_SINGLE_RECORD_REQUEST = '[Store] RESET_GET_SINGLE_RECORD_REQUEST';

export const GET_CART_RECORDS = '[Store] GET_CART_RECORDS';
export const GET_CART_RECORDS_SUCCESS = '[Store] GET_CART_RECORDS_SUCCESS';
export const GET_CART_RECORDS_FAIL = '[Store] GET_CART_RECORDS_FAIL';

export const DELETE_CART_RECORD = '[Store] DELETE_CART_RECORD';
export const DELETE_CART_RECORD_SUCCESS = '[Store] DELETE_CART_RECORD_SUCCESS';
export const DELETE_CART_RECORD_FAIL = '[Store] DELETE_CART_RECORD_FAIL';

export const ADD_TO_CART = '[Store] ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = '[Store] ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAIL = '[Store] ADD_TO_CART_FAIL';


export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('store', params)
  };
}

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`store/product/${id}`, params)
  };
}


/**
 * Cart records
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*))}}
 */
export function getCartRecords(params = {}) {
    return {
        types: [GET_CART_RECORDS, GET_CART_RECORDS_SUCCESS, GET_CART_RECORDS_FAIL],
        promise: (apiClient) => apiClient.get('store/cart', params)
    };
}

/**
 * Single cart record
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*))}}
 */
export function deleteCartRecord(id,params) {
    return {
        types: [DELETE_CART_RECORD, DELETE_CART_RECORD_SUCCESS, DELETE_CART_RECORD_FAIL],
        promise: (apiClient) => apiClient.get(`store/cart/${id}`, params)
    };
}


/**
 * Add Product To Cart
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*))}}
 */
export function addToCarts(id,params = {}) {
    return {
        types: [ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL],
        promise: (apiClient) => apiClient.get('store/cart/add', params)
    };
}



