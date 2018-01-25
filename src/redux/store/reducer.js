import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, GET_CART_RECORDS, GET_CART_RECORDS_SUCCESS, GET_CART_RECORDS_FAIL,
    ADD_TO_CART,ADD_TO_CART_FAIL,ADD_TO_CART_SUCCESS,
    GET_SINGLE_RECORD, GET_SINGLE_RECORD_FAIL,
    GET_SINGLE_RECORD_SUCCESS, RESET_GET_SINGLE_RECORD_REQUEST
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  getSingleRecordRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    record: {}
  },
  createRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },
  updateRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },
  getCartRecordsRequest: {
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
  pagination: {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1
  },
    cartRecords: [],
    records: [],
    singleRecord: [],
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
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
     * Get single record
     */
    case GET_SINGLE_RECORD:
      return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('record')
        );
    case GET_SINGLE_RECORD_SUCCESS:
      return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('success', true)
          .set('loading', false)
          .set('record', Immutable.fromJS(action.result.data))
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
              ).set('cartRecord', Immutable.fromJS(action.result.data));
      case GET_CART_RECORDS_FAIL:
          return state
              .set('getCartRecordsRequest', state.get('getCartRecordsRequest')
                  .set('loading', false)
                  .set('fail', true)
              );

      /**
       * Get single cart records
       */
      case GET_CART_RECORDS:
          return state
              .set('getSingleCartRecordsRequest', state.get('getSingleCartRecordsRequest')
                  .set('loading', true)
                  .remove('success')
                  .remove('fail')
              ).set('cartRecords', Immutable.List());
      case GET_CART_RECORDS_SUCCESS:
          return state
              .set('getSingleCartRecordsRequest', state.get('getSingleCartRecordsRequest')
                  .set('success', true)
                  .remove('loading')
              ).set('cartRecords', Immutable.fromJS(action.result.data))
              .set('pagination', Immutable.fromJS(action.result.meta.pagination));
      case GET_CART_RECORDS_FAIL:
          return state
              .set('getSingleCartRecordsRequest', state.get('getSingleCartRecordsRequest')
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
              );
      case ADD_TO_CART_FAIL:

          return state
              .set('addToCartRequest', state.get('addToCartRequest')
                  .set('loading', false)
                  .set('fail', true)
              );


    /**
     * default
     */
    default:
      return state;
  }
}