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

export const GET_CART_INVOICE_RECORDS = '[Store] GET_CART_INVOICE_RECORDS';
export const GET_CART_INVOICE_RECORDS_SUCCESS = '[Store] GET_CART_INVOICE_RECORDS_SUCCESS';
export const GET_CART_INVOICE_RECORDS_FAIL = '[Store] GET_CART_INVOICE_RECORDS_FAIL';

export const DELETE_CART_RECORD = '[Store] DELETE_CART_RECORD';
export const DELETE_CART_RECORD_SUCCESS = '[Store] DELETE_CART_RECORD_SUCCESS';
export const DELETE_CART_RECORD_FAIL = '[Store] DELETE_CART_RECORD_FAIL';

export const ADD_TO_CART = '[Store] ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = '[Store] ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAIL = '[Store] ADD_TO_CART_FAIL';

export const UPDATE_SHOPPING_CART = '[Store] UPDATE_SHOPPING_CART';
export const CALCULATE_CART_SUM = '[Store] CALCULATE_CART_SUM';

export const GET_UNASSIGNEDS = '[Store] GET_UNASSIGNEDS';
export const GET_UNASSIGNEDS_SUCCESS = '[Store] GET_UNASSIGNEDS_SUCCESS';
export const GET_UNASSIGNEDS_FAIL = '[Store] GET_UNASSIGNEDS_FAIL';

export const UPDATE_ITEM_QUANTITY = '[Store] UPDATE_ITEM_QUANTITY';
export const UPDATE_ITEM_QUANTITY_SUCCESS = '[Store] UPDATE_ITEM_QUANTITY_SUCCESS';
export const UPDATE_ITEM_QUANTITY_FAIL = '[Store] UPDATE_ITEM_QUANTITY_FAIL';

export const SET_SHIPPING_BILLING_INFO = '[Store] SET_SHIPPING_BILLING_INFO';
export const SET_SHIPPING_BILLING_INFO_SUCCESS = '[Store] SET_SHIPPING_BILLING_INFO_SUCCESS';
export const SET_SHIPPING_BILLING_INFO_FAIL = '[Store] SET_SHIPPING_BILLING_INFO_FAIL';

export const GET_SHIPPING_BILLING_INFO = '[Store] GET_SHIPPING_BILLING_INFO';
export const GET_SHIPPING_BILLING_INFO_SUCCESS = '[Store] GET_SHIPPING_BILLING_INFO_SUCCESS';
export const GET_SHIPPING_BILLING_INFO_FAIL = '[Store] GET_SHIPPING_BILLING_INFO_FAIL';

export const RESET_SET_SHIPPING_BILLING_INFO = '[Store] RESET_SET_SHIPPING_BILLING_INFO';

export const SAVE_CHECKOUT_INFO = '[Store] SAVE_CHECKOUT_INFO';

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

/**
 * Single
 */
export function getSingleRecord(id, params = {}) {
  return {
    types: [GET_SINGLE_RECORD, GET_SINGLE_RECORD_SUCCESS, GET_SINGLE_RECORD_FAIL],
    promise: (apiClient) => apiClient.get(`store/items/${id}`, params)
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
    promise: (apiClient) => apiClient.get('store/shopping-card', params)
  };
}

/**
 * Cart records
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*))}}
 */
export function getCartInvoiceRecords(params = {}) {
  return {
    types: [GET_CART_INVOICE_RECORDS, GET_CART_INVOICE_RECORDS_SUCCESS, GET_CART_INVOICE_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get('store/shopping-card/invoices', params)
  };
}

/**
 * Single cart record
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*))}}CREATE
 */
export function deleteCartRecord(id, params) {
  return {
    types: [DELETE_CART_RECORD, DELETE_CART_RECORD_SUCCESS, DELETE_CART_RECORD_FAIL],
    promise: (apiClient) => apiClient.post(`store/remove-from-card/${id}`, params)
  };
}

/**
 * Add Product To Cart
 * @param params
 * @returns {{types: [*,*,*], promise: (function(*))}}
 */
export function addToCarts(id, params = {}) {
  return {
    types: [ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL],
    promise: (apiClient) => apiClient.post(`store/add-to-card/${id}`, params)
  };
}

/**
 * Unassigneds
 * @param params
 * @returns {{types: [null,null,null], promise: (function(*))}}
 */
export function getUnassigneds(params = {}) {
  return {
    types: [GET_UNASSIGNEDS, GET_UNASSIGNEDS_SUCCESS, GET_UNASSIGNEDS_FAIL],
    promise: (apiClient) => apiClient.get('store/unassigned-items', params)
  };
}


/**
 *
 * @param data
 * @param total
 * @returns {{type: string, data: *, total: *}}
 */
export function updateShoppingCart(data) {
  return {
    type: UPDATE_SHOPPING_CART,
    data
  }
}

export function setItemQuantity(data) {
  return {
    types: [UPDATE_ITEM_QUANTITY, UPDATE_ITEM_QUANTITY_SUCCESS, UPDATE_ITEM_QUANTITY_FAIL],
    promise: (apiClient) => apiClient.post(`store/items/${data.id}`, data)
  };
}


export function calculateCartSum(items = []) {

  const total = items.reduce((total, item) => {
    if (item.storeItem && !isNaN(item.storeItem.discountPrice)) {
         return total + parseFloat(item.storeItem.discountPrice).toFixed(2) * parseInt(item.count);

      }
    return total;
  },0);

  return {
    type: CALCULATE_CART_SUM,
    total
  }

}

export function setShippingAndBilling(data) {
  return {
    types: [SET_SHIPPING_BILLING_INFO, SET_SHIPPING_BILLING_INFO_SUCCESS, SET_SHIPPING_BILLING_INFO_FAIL],
    promise: (apiClient) => apiClient.post('checkout/address', data),
    payload: data,
  };
}

export function setToStoreContact(data) {
  return {
    type: SAVE_CHECKOUT_INFO,
    data
  };
}

export function getShippingAndBilling(data) {
  return {
    types: [GET_SHIPPING_BILLING_INFO, GET_SHIPPING_BILLING_INFO_SUCCESS, GET_SHIPPING_BILLING_INFO_FAIL],
    promise: (apiClient) => apiClient.get('checkout/address', data)
  };
}

export function resetSetShippingAndBilling() {
  return {
    type: RESET_SET_SHIPPING_BILLING_INFO,
  };

}
