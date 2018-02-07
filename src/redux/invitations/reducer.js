import {
  GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, DELETE_RECORD, DELETE_RECORD_SUCCESS, DELETE_RECORD_FAIL
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false
  },
  deleteRecordRequest: {
    loading: false,
    success: false,
    fail: false
  },
  records: [],
  pagination: {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1
  }
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
     * Delete record
     */
    case DELETE_RECORD:
      return state
        .set('deleteRecordRequest', state.get('deleteRecordRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case DELETE_RECORD_SUCCESS:
      return state
        .set('deleteRecordRequest', state.get('deleteRecordRequest')
          .set('success', true)
          .remove('loading')
        );
    case DELETE_RECORD_FAIL:
      return state
        .set('deleteRecordRequest', state.get('deleteRecordRequest')
          .set('loading', false)
          .set('fail', true)
        );
    default:
      return state;
  }
}