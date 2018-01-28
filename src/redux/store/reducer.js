import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, GET_CART_RECORDS, GET_CART_RECORDS_SUCCESS, GET_CART_RECORDS_FAIL,
    ADD_TO_CART,ADD_TO_CART_FAIL,ADD_TO_CART_SUCCESS,DELETE_CART_RECORD,DELETE_CART_RECORD_SUCCESS,DELETE_CART_RECORD_FAIL,
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
    singleRecord: {}
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
  deleteFromCartRequest: {
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
  singleRecord: {},
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
          .remove('singleRecord')
        );
    case GET_SINGLE_RECORD_SUCCESS:
        return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('success', true)
          .set('loading', false).set('singleRecord', Immutable.fromJS(action.result.data))
        ).set('singleRecord', Immutable.fromJS(action.result.data));
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
          console.log(Immutable.fromJS(action.result.data));
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
     * default
     */
    default:
      return state;
  }
}