import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL
} from './actions';
import Immutable from 'immutable';

import data from "../../data/json/transactions.json";

const initialState = Immutable.fromJS({
  getRecordsRequest: {
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
  records: [],
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
        ).set('records', Immutable.List(data));


    /**
     * default
     */
    default:
      return state;
  }
}