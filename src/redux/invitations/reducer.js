import {
  GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, DELETE_RECORD, DELETE_RECORD_SUCCESS, DELETE_RECORD_FAIL,
  CREATE, CREATE_FAIL, CREATE_SUCCESS, GET_SINGLE_RECORD, GET_SINGLE_RECORD_FAIL, GET_SINGLE_RECORD_SUCCESS
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
     * Get single record
     */
    case GET_SINGLE_RECORD:
      return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('record', Immutable.Map())
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
    /**
     * Create
     */
    case CREATE:
      return state
        .set('createRequest', state.get('createRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case CREATE_SUCCESS:
      const total = state.get('pagination').get('total') + 1;
      const page = state.get('pagination').get('page');
      const perPage = state.get('pagination').get('perPage');
      let totalPages = state.get('pagination').get('totalPages');

      if (total > totalPages * perPage) {
        totalPages += 1;
      }

      let newState = state
        .set('createRequest', state.get('createRequest')
          .set('success', true)
          .set('loading', false)
        ).set('pagination', state.get('pagination')
          .set('totalPages', totalPages)
          .set('total', total)
        );

      if(page === totalPages) {
        return newState
          .set('records', state.get('records')
            .push(Immutable.fromJS(action.result.data))
          );
      }

      return newState
        .set('pagination', state.get('pagination')
          .set('page', totalPages)
        );
    case CREATE_FAIL:
      const data = action.error.response.data;
      return state
        .set('createRequest', state.get('createRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', data.code)
          .set('errorMessage', data.message)
          .set('errors', data.code === 422 ? Immutable.fromJS(data.errors) : undefined)
        );
    default:
      return state;
  }
}