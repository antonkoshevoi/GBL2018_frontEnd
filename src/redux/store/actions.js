import SessionStorage from '../../services/SessionStorage';

export const GET_RECORDS = '[Store] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Store] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Store] GET_RECORDS_FAIL';

export const GET_RECORDS_PARENT = '[Store] GET_RECORDS_PARENT';
export const GET_RECORDS_PARENT_SUCCESS = '[Store] GET_RECORDS_PARENT_SUCCESS';
export const GET_RECORDS_PARENT_FAIL = '[Store] GET_RECORDS_PARENT_FAIL';

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

export const UPDATE_SHOPPING_CART_COUNT = '[Store] UPDATE_SHOPPING_CART_COUNT';

export const UPDATE_ITEM_QUANTITY = '[Store] UPDATE_ITEM_QUANTITY';
export const UPDATE_ITEM_QUANTITY_SUCCESS = '[Store] UPDATE_ITEM_QUANTITY_SUCCESS';
export const UPDATE_ITEM_QUANTITY_FAIL = '[Store] UPDATE_ITEM_QUANTITY_FAIL';

export const VALIDATE_ADDRESS = '[Store] VALIDATE_ADDRESS';
export const VALIDATE_ADDRESS_SUCCESS = '[Store] VALIDATE_ADDRESS_SUCCESS';
export const VALIDATE_ADDRESS_FAIL = '[Store] VALIDATE_ADDRESS_FAIL';
export const RESET_VALIDATE_ADDRESS_REQUEST = '[Store] RESET_VALIDATE_ADDRESS_REQUEST';

export const GET_SHIPPING_BILLING_INFO = '[Store] GET_SHIPPING_BILLING_INFO';
export const GET_SHIPPING_BILLING_INFO_SUCCESS = '[Store] GET_SHIPPING_BILLING_INFO_SUCCESS';
export const GET_SHIPPING_BILLING_INFO_FAIL = '[Store] GET_SHIPPING_BILLING_INFO_FAIL';

export const SET_DISCOUNT_CODE = '[Store] SET_DISCOUNT_CODE';
export const SET_DISCOUNT_CODE_SUCCESS = '[Store] SET_DISCOUNT_CODE_SUCCESS';
export const SET_DISCOUNT_CODE_FAIL = '[Store] SET_DISCOUNT_CODE_FAIL';
export const RESET_DISCOUNT_CODE_REQUEST = '[Store] RESET_DISCOUNT_CODE_REQUEST';

export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('store/items', params)
  };
}

export function getParentRecords(params = {}) {
  return {
    types: [GET_RECORDS_PARENT, GET_RECORDS_PARENT_SUCCESS, GET_RECORDS_PARENT_FAIL],
    promise: (apiClient) => apiClient.get('store/parent/items', params)
  };
}

export function setDiscountCode(params = {}) {
  params.invoiceNo = SessionStorage.get('invoiceNo');
  return {
    types: [SET_DISCOUNT_CODE, SET_DISCOUNT_CODE_SUCCESS, SET_DISCOUNT_CODE_FAIL],
    promise: (apiClient) => apiClient.post('store/set-discount-code', params)
  };
}

export function resetDiscountCodeRequest() {
  return {
    type: RESET_DISCOUNT_CODE_REQUEST
  };
}


export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`store/items/${id}`, params)
  };
}

export function getCartRecords(params = {}) {
  params.invoiceNo = SessionStorage.get('invoiceNo', {path: '/'});
  return {
    types: [GET_CART_RECORDS, GET_CART_RECORDS_SUCCESS, GET_CART_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('store/shopping-card', params)
  };
}

export function deleteCartRecord(id, params = {}) {
  params.invoiceNo = SessionStorage.get('invoiceNo', {path: '/'});
  return {
    types: [DELETE_CART_RECORD, DELETE_CART_RECORD_SUCCESS, DELETE_CART_RECORD_FAIL],
    promise: (apiClient) => apiClient.post(`store/remove-from-card/${id}`, params)
  };
}

export function addToShoppingCart(id, params = {}) {
  params.invoiceNo    = SessionStorage.get('invoiceNo', {path: '/'});
  params.discountCode = SessionStorage.get('discountCode', {path: '/'});
  return {
    types: [ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL],
    promise: (apiClient) => apiClient.post(`store/add-to-card/${id}`, params)
  };
}

export function updateShoppingCartCount(count) {  
  return {
    type: UPDATE_SHOPPING_CART_COUNT, count
  }
}

export function setItemQuantity(data) {
  data.invoiceNo = SessionStorage.get('invoiceNo', {path: '/'});
  return {
    types: [UPDATE_ITEM_QUANTITY, UPDATE_ITEM_QUANTITY_SUCCESS, UPDATE_ITEM_QUANTITY_FAIL],
    promise: (apiClient) => apiClient.post(`store/items/${data.id}`, data)
  };
}

export function getAddresses(data) {
  return {
    types: [GET_SHIPPING_BILLING_INFO, GET_SHIPPING_BILLING_INFO_SUCCESS, GET_SHIPPING_BILLING_INFO_FAIL],
    promise: (apiClient) => apiClient.get('checkout/addresses', data)
  };
}

export function validateAddress(data) {
  return {
    types: [VALIDATE_ADDRESS, VALIDATE_ADDRESS_SUCCESS, VALIDATE_ADDRESS_FAIL],
    promise: (apiClient) => apiClient.post('checkout/validate-address', data)
  };
}

export function resetValidateAddressRequest() {
  return {
    type: RESET_VALIDATE_ADDRESS_REQUEST
  };
}
