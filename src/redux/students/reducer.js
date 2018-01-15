import {GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, CREATE, CREATE_SUCCESS, CREATE_FAIL} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
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
     * Create
     */
    case CREATE:
      return state
        .set('createRequest', state.get('createRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case CREATE_SUCCESS:
      const total = state.get('pagination').get('total') + 1;
      const perPage = state.get('pagination').get('perPage');
      let totalPages = state.get('pagination').get('totalPages');

      if (total > totalPages * perPage) {
        totalPages += 1;
      }

      return state
        .set('createRequest', state.get('createRequest')
          .set('success', true)
          .remove('loading')
        ).set('records', state.get('records')
          .push(Immutable.fromJS(action.result.data))
        ).set('pagination', state.get('pagination')
          .set('page', totalPages)
          .set('totalPages', totalPages)
          .set('total', total)
        );
    case CREATE_FAIL:
      const data = action.error.response.data;

      return state
        .set('createRequest', state.get('createRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', data.code)
          .set('errorMessage', data.message)
          .set('errors', data.code === 400 ? Immutable.fromJS(data.errors) : undefined)
        );

    default:
      return state;
  }
}