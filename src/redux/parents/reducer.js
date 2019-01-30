import {
  GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, 
  CREATE, CREATE_SUCCESS, CREATE_FAIL,
  GET_STUDENTS, GET_STUDENTS_SUCCESS, GET_STUDENTS_FAIL,
  RESET_CREATE_REQUEST, GET_SINGLE_RECORD, GET_SINGLE_RECORD_FAIL,
  GET_SINGLE_RECORD_SUCCESS, RESET_GET_SINGLE_RECORD_REQUEST, 
  UPDATE, UPDATE_FAIL, RESET_UPDATE_REQUEST, UPDATE_SUCCESS,
  DELETE, DELETE_SUCCESS, DELETE_FAIL,
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  getStudentsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: Immutable.List()
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
  deleteRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },
  records: Immutable.List(),
  pagination: {
    page: 1,
    perPage: 25,
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
      return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('loading', true));
    case GET_RECORDS_SUCCESS:
      return state
        .set('getRecordsRequest', initialState.get('getRecordsRequest').set('success', true))
        .set('records', Immutable.fromJS(action.result.data))
        .set('pagination', Immutable.fromJS(action.result.meta.pagination));
    case GET_RECORDS_FAIL:
      return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('fail', true));

    case GET_STUDENTS:
      return state.set('getStudentsRequest', initialState.get('getStudentsRequest').set('loading', true));
    case GET_STUDENTS_SUCCESS:
      return state.set('getStudentsRequest', initialState.get('getStudentsRequest')
              .set('success', true)
              .set('records', Immutable.fromJS(action.result.data)));      
    case GET_STUDENTS_FAIL:
      return state.set('getStudentsRequest', initialState.get('getStudentsRequest').set('fail', true));

    /**
     * Get single record
     */
    case GET_SINGLE_RECORD:
      return state.set('getSingleRecordRequest', initialState.get('getSingleRecordRequest').set('loading', true));
    case GET_SINGLE_RECORD_SUCCESS:
      return state.set('getSingleRecordRequest', initialState.get('getSingleRecordRequest')
            .set('success', true)
            .set('record', Immutable.fromJS(action.result.data)));
    case GET_SINGLE_RECORD_FAIL:
      return state.set('getSingleRecordRequest', initialState.get('getSingleRecordRequest').set('fail', true));
    case RESET_GET_SINGLE_RECORD_REQUEST:
      return state.set('getSingleRecordRequest', initialState.get('getSingleRecordRequest'));
    /**
     * Create
     */
    case CREATE:
      return state.set('createRequest', initialState.get('createRequest').set('loading', true));
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
          .set('success', true).set('loading', false)
        ).set('pagination', state.get('pagination')
          .set('totalPages', totalPages).set('total', total)
        );

      if (page === totalPages) {
        return newState.set('records', state.get('records').push(Immutable.fromJS(action.result.data)));
      }
      
      return newState.set('pagination', state.get('pagination').set('page', totalPages));
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
    case RESET_CREATE_REQUEST:
      return state.set('createRequest', initialState.get('createRequest'));
    /**
     * Update
     */
    case UPDATE:
      return state.set('updateRequest', initialState.get('updateRequest').set('loading', true));
    case UPDATE_SUCCESS:
      let updatedRecords = state.get('records').map(record => {
        if(record.get('id') === action.result.data.id) {
          return Immutable.fromJS(action.result.data);
        }
        return record;
      });
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('loading', false)
          .set('success', true)
        ).set('records', updatedRecords);
    case UPDATE_FAIL:
      const errorData = action.error.response.data;
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', errorData.code)
          .set('errorMessage', errorData.message)
          .set('errors', errorData.code === 422 ? Immutable.fromJS(errorData.errors) : undefined)
        );
    case RESET_UPDATE_REQUEST:
      return state.set('updateRequest', initialState.get('updateRequest'));
    /**
     * Delete
     */
    case DELETE:
      return state.set('deleteRequest', initialState.get('deleteRequest').set('loading', true));
    case DELETE_SUCCESS:
      return state.set('deleteRequest', initialState.get('deleteRequest').set('success', true));
    case DELETE_FAIL:      
      return state
        .set('deleteRequest', initialState.get('deleteRequest')          
          .set('fail', true)
          .set('errorCode', action.error.response.data.code)
          .set('errorMessage', action.error.response.data.message)
          .set('errors', Immutable.fromJS(action.error.response.data.errors || []))
        );
  
    /**
     * default
     */
    default:
      return state;
  }
}