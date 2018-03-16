import {
  GET_RECORDS,
  GET_RECORDS_SUCCESS,
  GET_RECORDS_FAIL,
  GET_CART_RECORDS,
  GET_CART_RECORDS_SUCCESS,
  GET_CART_RECORDS_FAIL,
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_SUCCESS,
  DELETE_CART_RECORD,
  DELETE_CART_RECORD_SUCCESS,
  DELETE_CART_RECORD_FAIL,
  GET_SINGLE_RECORD,
  GET_SINGLE_RECORD_FAIL,
  GET_SINGLE_RECORD_SUCCESS,
  RESET_GET_SINGLE_RECORD_REQUEST,
  GET_UNASSIGNEDS,
  GET_UNASSIGNEDS_SUCCESS,
  GET_UNASSIGNEDS_FAIL,
  UPDATE_SHOPPING_CART, CALCULATE_CART_SUM,
  GET_CART_INVOICE_RECORDS,
  GET_CART_INVOICE_RECORDS_FAIL,
  GET_CART_INVOICE_RECORDS_SUCCESS, SET_SHIPPING_BILLING_INFO, SET_SHIPPING_BILLING_INFO_SUCCESS,
  SET_SHIPPING_BILLING_INFO_FAIL, RESET_SET_SHIPPING_BILLING_INFO, GET_RECORDS_PARENT, GET_RECORDS_PARENT_FAIL,
  GET_RECORDS_PARENT_SUCCESS,
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  getRecordsParentRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: []
  },
  getSingleRecordRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    singleRecord: {}
  },
  getCartRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  getCartInvoiceRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  addToCartRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  addToCartRedirect: false,
  deleteFromCartRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  getUnassignedsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: [],
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
      totalPages: 1
    },
  },
  setShippingAndBilling: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    errors: [],
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
      totalPages: 1
    },
  },
  pagination: {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1
  },
  cartRecords: [],
  totalSum: 0,
  records: [],
  singleRecord: {},
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Get records
     */
    case GET_RECORDS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        ).set('records', Immutable.List());
    case GET_RECORDS_SUCCESS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('success', true)
          .remove('loading')
        ).set('records', Immutable.fromJS(action.result.data))
        .set('pagination', Immutable.fromJS(action.result.meta.pagination));
    case GET_RECORDS_FAIL:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );

      /**
     * Get parent store records
     */
    case GET_RECORDS_PARENT:
      return state
        .set('getRecordsParentRequest', state.get('getRecordsParentRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        ).set('records', Immutable.List());
    case GET_RECORDS_PARENT_SUCCESS:
      return state
        .set('getRecordsParentRequest', state.get('getRecordsParentRequest')
          .set('success', true)
          .remove('loading')
          .set('records', Immutable.fromJS(action.result.data))
          .set('pagination', Immutable.fromJS(action.result.meta.pagination))
        )

    case GET_RECORDS_PARENT_FAIL:
      return state
        .set('getRecordsParentRequest', state.get('getRecordsParentRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * Get single record
     */
    case GET_SINGLE_RECORD:
      return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('singleRecord')
        );
    case GET_SINGLE_RECORD_SUCCESS:
      return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('success', true)
          .set('loading', false).set('singleRecord', Immutable.fromJS(action.result.data))
        ).set('singleRecord', Immutable.fromJS(action.result.data))
        .set('addToCartRequest', state.get('addToCartRequest')
          .remove('success')
        );
    case GET_SINGLE_RECORD_FAIL:
      return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('loading', false)
          .set('fail', true)
        );
    case RESET_GET_SINGLE_RECORD_REQUEST:
      return state
        .set('getSingleRecordRequest', initialState.get('getSingleRecordRequest'));

    /**
     * Get cart records
     */
    case GET_CART_RECORDS:
      return state
        .set('getCartRecordsRequest', state.get('getCartRecordsRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        ).set('cartRecord', Immutable.List());
    case GET_CART_RECORDS_SUCCESS:
      return state
        .set('getCartRecordsRequest', state.get('getCartRecordsRequest')
          .set('success', true)
          .remove('loading')
        ).set('cartRecords', Immutable.fromJS(action.result.data));
    case GET_CART_RECORDS_FAIL:
      return state
        .set('getCartRecordsRequest', state.get('getCartRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * Get cart records
     */
    case GET_CART_INVOICE_RECORDS:
      return state
        .set('getCartInvoiceRecordsRequest', state.get('getCartInvoiceRecordsRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        ).set('cartRecord', Immutable.List());
    case GET_CART_INVOICE_RECORDS_SUCCESS:
      return state
        .set('getCartInvoiceRecordsRequest', state.get('getCartInvoiceRecordsRequest')
          .set('success', true)
          .remove('loading')
        ).set('cartRecords', Immutable.fromJS(action.result.data));
    case GET_CART_INVOICE_RECORDS_FAIL:
      return state
        .set('getCartInvoiceRecordsRequest', state.get('getCartInvoiceRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * Add cart record
     */
    case ADD_TO_CART:
      return state
        .set('addToCartRequest', state.get('addToCartRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case ADD_TO_CART_SUCCESS:
      return state
        .set('addToCartRequest', state.get('addToCartRequest')
          .set('success', true)
          .remove('loading')
        ).set('cartRecords', Immutable.fromJS(action.result.data));
    case ADD_TO_CART_FAIL:
      return state
        .set('addToCartRequest', state.get('addToCartRequest')
          .set('loading', false)
          .set('fail', true)
        );


    /**
     * update cart record
     */
    case UPDATE_SHOPPING_CART:
      return state
        .set('cartRecords', Immutable.fromJS(action.data));

    /**
     * calculate cart sum
     */
    case CALCULATE_CART_SUM:
      return state
        .set('totalSum', Immutable.fromJS(action.total));

    /**
     * Delete
     */
    case DELETE_CART_RECORD:
      return state
        .set('deleteFromCartRequest', state.get('deleteFromCartRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
        );
    case DELETE_CART_RECORD_SUCCESS:
      return state
        .set('deleteFromCartRequest', state.get('deleteFromCartRequest')
          .set('loading', false)
          .set('success', true).set('cartRecords', Immutable.fromJS(action.result.data))
        ).set('cartRecords', Immutable.fromJS(action.result.data));
    case DELETE_CART_RECORD_FAIL:
      return state
        .set('deleteFromCartRequest', state.get('deleteFromCartRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * Unassigneds
     */
    case GET_UNASSIGNEDS:
      return state
        .set('getUnassignedsRequest', state.get('getUnassignedsRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('records', Immutable.List())
        );
    case GET_UNASSIGNEDS_SUCCESS:
      return state
        .set('getUnassignedsRequest', state.get('getUnassignedsRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
          .set('pagination', Immutable.fromJS(action.result.meta.pagination))
        );
    case GET_UNASSIGNEDS_FAIL:
      return state
        .set('getUnassignedsRequest', state.get('getUnassignedsRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /*
    * Set shipping and billing address
    * */
    case SET_SHIPPING_BILLING_INFO:
      return state
        .set('setShippingAndBilling', state.get('setShippingAndBilling')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('errors',null));
    case SET_SHIPPING_BILLING_INFO_SUCCESS:
      return state
        .set('setShippingAndBilling', state.get('setShippingAndBilling')
          .set('loading', false)
          .set('success', true)
          .set('fail', false)
          .set('errors',null)
          // .set('data', Immutable.fromJS(action.result.data))
        );

    case SET_SHIPPING_BILLING_INFO_FAIL:
      const data = action.error.response.data;
      return state
        .set('setShippingAndBilling', state.get('setShippingAndBilling')
          .set('loading', false)
          .set('success', false)
          .set('fail', true)
          .set('errors',Immutable.fromJS(data.errors))
        );

    case RESET_SET_SHIPPING_BILLING_INFO:
      return state
        .set('setShippingAndBilling', state.get('setShippingAndBilling')
          .set('loading', false)
          .set('success', false)
          .set('fail', false)
          .set('errors',null));

    /**
     * default
     */
    default:
      return state;
  }
}