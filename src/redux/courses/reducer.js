import {
  GET_STORE_RECORDS, GET_STORE_RECORDS_SUCCESS, GET_STORE_RECORDS_FAIL,
  GET_UNASSIGNED_RECORDS, GET_UNASSIGNED_RECORDS_FAIL, GET_UNASSIGNED_RECORDS_SUCCESS
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getUnassignedRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: []
  },
  getStoreRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: []
  },
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Get store records
     */
    case GET_STORE_RECORDS:
      return state
        .set('getStoreRecordsRequest', state.get('getStoreRecordsRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('records', Immutable.List())
        );
    case GET_STORE_RECORDS_SUCCESS:
      return state
        .set('getStoreRecordsRequest', state.get('getStoreRecordsRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
        );
    case GET_STORE_RECORDS_FAIL:
      return state
        .set('getStoreRecordsRequest', state.get('getStoreRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * Get unassigned records
     */
    case GET_UNASSIGNED_RECORDS:
      return state
        .set('getUnassignedRecordsRequest', state.get('getUnassignedRecordsRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('records', Immutable.List())
        );
    case GET_UNASSIGNED_RECORDS_SUCCESS:
      return state
        .set('getUnassignedRecordsRequest', state.get('getUnassignedRecordsRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
        );
    case GET_UNASSIGNED_RECORDS_FAIL:
      return state
        .set('getUnassignedRecordsRequest', state.get('getUnassignedRecordsRequest')
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