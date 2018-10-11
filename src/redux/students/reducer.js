import {
  GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, CREATE, CREATE_SUCCESS, CREATE_FAIL,
  RESET_CREATE_REQUEST, GET_SINGLE_RECORD, GET_SINGLE_RECORD_FAIL,
  GET_SINGLE_RECORD_SUCCESS, RESET_GET_SINGLE_RECORD_REQUEST, UPDATE, UPDATE_FAIL, RESET_UPDATE_REQUEST, UPDATE_SUCCESS,
  RESET_BULK_UPLOAD_REQUEST, BULK_UPLOAD, BULK_UPLOAD_SUCCESS, BULK_UPLOAD_FAIL, BULK_UPLOAD_PROGRESS,
  DELETE, DELETE_SUCCESS, DELETE_FAIL,
  GET_PARENT, GET_PARENT_SUCCESS, GET_PARENT_FAIL,
  CREATE_PARENT, CREATE_PARENT_SUCCESS, CREATE_PARENT_FAIL, RESET_CREATE_PARENT_REQUEST,
  LINK_TO_PARENT, LINK_TO_PARENT_SUCCESS, LINK_TO_PARENT_FAIL, RESET_LINK_TO_PARENT_REQUEST,
  GET_STUDENT_REQUESTS, GET_STUDENT_REQUESTS_SUCCESS, GET_STUDENT_REQUESTS_FAIL,
  ACCEPT_STUDENT, ACCEPT_STUDENT_SUCCESS, ACCEPT_STUDENT_FAIL,
  DECLINE_STUDENT, DECLINE_STUDENT_SUCCESS, DECLINE_STUDENT_FAIL, RESET_UPDATE_STUDENT_STATUS_REQUEST,
  DELETE_STUDENT_REQUST, DELETE_STUDENT_REQUST_SUCCESS, DELETE_STUDENT_REQUST_FAIL
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null
  },
  getStudentRequestsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
  },
  getSingleRecordRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    record: {}
  },
  getParentRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    record: {}
  },
  createParentRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
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
  updateStudentStatusRequest: {
    loading: false,
    success: false,
    fail: false
  },  
  deleteRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },
  linkToParentRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },  
  bulkUploadRequest: {
    loading: false,
    progress: 0,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {},
    cancel: undefined,
    results: {}
  },
  records: [],
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
     * Get student requests
     */
    case GET_STUDENT_REQUESTS:
      return state
        .set('getStudentRequestsRequest', initialState.get('getStudentRequestsRequest').set('loading', true).set('records', Immutable.List()));
    case GET_STUDENT_REQUESTS_SUCCESS:
      return state
        .set('getStudentRequestsRequest', initialState.get('getStudentRequestsRequest').set('success', true).set('records', Immutable.fromJS(action.result.data)));
    case GET_STUDENT_REQUESTS_FAIL:
      return state.set('getStudentRequestsRequest', initialState.get('getStudentRequestsRequest').set('fail', true));

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
      return state.set('getSingleRecordRequest', initialState.get('getSingleRecordRequest'));


    /**
     * Get parent record
     */
    case GET_PARENT:
      return state.set('getParentRequest', initialState.get('getParentRequest').set('loading', true));
    case GET_PARENT_SUCCESS:
      return state
        .set('getParentRequest', initialState.get('getParentRequest')
          .set('success', true)
          .set('record', Immutable.fromJS(action.result.data))
        );
    case GET_PARENT_FAIL:
      return state.set('getParentRequest', initialState.get('getParentRequest').set('fail', true));

    /**
     * Create parent record
     */
    case CREATE_PARENT:
      return state.set('createParentRequest', initialState.get('createParentRequest').set('loading', true));
    case CREATE_PARENT_SUCCESS:
      return state.set('createParentRequest', initialState.get('createParentRequest').set('success', true));
    case CREATE_PARENT_FAIL:
      return state.set('createParentRequest', initialState.get('createParentRequest')
              .set('fail', true)
              .set('errorCode', action.error.response.data.code)
              .set('errorMessage', action.error.response.data.message)
              .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined));
    case RESET_CREATE_PARENT_REQUEST:
      return state.set('createParentRequest', initialState.get('createParentRequest'));
      
    /**
     * Link to parent
     */
    case LINK_TO_PARENT:
      return state.set('linkToParentRequest', initialState.get('linkToParentRequest').set('loading', true));
    case LINK_TO_PARENT_SUCCESS:
      return state.set('linkToParentRequest', initialState.get('linkToParentRequest').set('success', true));
    case LINK_TO_PARENT_FAIL:
      return state.set('linkToParentRequest', initialState.get('linkToParentRequest')
              .set('fail', true)
              .set('errorCode', action.error.response.data.code)
              .set('errorMessage', action.error.response.data.message)
              .set('errors', action.error.response.data.code === 422 ? Immutable.fromJS(action.error.response.data.errors) : undefined));
    case RESET_LINK_TO_PARENT_REQUEST:
      return state.set('linkToParentRequest', initialState.get('linkToParentRequest'));
      
    /**
     * Change student status
     */
    case ACCEPT_STUDENT:
    case DECLINE_STUDENT:
    case DELETE_STUDENT_REQUST:
      return state.set('updateStudentStatusRequest', initialState.get('updateStudentStatusRequest').set('loading', true));
    case ACCEPT_STUDENT_SUCCESS:
    case DECLINE_STUDENT_SUCCESS:
    case DELETE_STUDENT_REQUST_SUCCESS:
      return state.set('updateStudentStatusRequest', initialState.get('updateStudentStatusRequest').set('success', true));
    case ACCEPT_STUDENT_FAIL:
    case DECLINE_STUDENT_FAIL:        
    case DELETE_STUDENT_REQUST_FAIL:
      return state.set('updateStudentStatusRequest', initialState.get('updateStudentStatusRequest') .set('fail', true));
    case RESET_UPDATE_STUDENT_STATUS_REQUEST:
      return state.set('updateStudentStatusRequest', initialState.get('updateStudentStatusRequest'));
  
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
    case RESET_CREATE_REQUEST:
      return state
        .set('createRequest', initialState.get('createRequest'));
    /**
     * Update
     */
    case UPDATE:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
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
        ).set('records', updatedRecords)
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('success', true)
          .set('loading', false)
          .set('record', Immutable.fromJS(action.result.data))
        );
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
      return state
        .set('updateRequest', initialState.get('updateRequest'));
    /**
     * Delete
     */
    case DELETE:
      return state
        .set('deleteRequest', state.get('deleteRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case DELETE_SUCCESS:
      return state
        .set('deleteRequest', state.get('deleteRequest')
          .set('loading', false)
          .set('success', true)
        );
    case DELETE_FAIL:
      const deleteError = action.error.response.data;
      return state
        .set('deleteRequest', state.get('deleteRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', deleteError.code)
          .set('errorMessage', deleteError.message)
          .set('errors', deleteError.code === 422 ? Immutable.fromJS(deleteError.errors) : undefined)
        );
    /**
     * Bulk upload
     */
    case BULK_UPLOAD:
      return state
        .set('bulkUploadRequest', state.get('bulkUploadRequest')
          .set('loading', true)
          .set('progress', 0)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
          .set('cancel', action.cancel)
        );
    case BULK_UPLOAD_PROGRESS:
      const percent = Math.round((action.progressEvent.loaded * 100) / action.progressEvent.total);
      return state
        .set('bulkUploadRequest', state.get('bulkUploadRequest')
          .set('progress', percent)
        );
    case BULK_UPLOAD_SUCCESS:
      return state
        .set('bulkUploadRequest', state.get('bulkUploadRequest')
          .set('loading', false)
          .set('progress', 100)
          .set('success', true)
          .set('results', Immutable.fromJS(action.result.data))
        );
    case BULK_UPLOAD_FAIL:
      //avoid duplicate declaration
      let newStateOnBulkUploadFail = state
        .set('bulkUploadRequest', state.get('bulkUploadRequest')
          .set('loading', false)
          .set('progress', 0)
          .set('fail', true)
        );

      if (typeof action.error.response !== 'undefined') {
        const bulkUploadRequestErrorData = action.error.response.data;
        newStateOnBulkUploadFail.set('bulkUploadRequest', newStateOnBulkUploadFail.get('bulkUploadRequest')
          .set('errorCode', bulkUploadRequestErrorData.code)
          .set('errorMessage', bulkUploadRequestErrorData.message)
          .set('errors', bulkUploadRequestErrorData.code === 422 ? Immutable.fromJS(bulkUploadRequestErrorData.errors) : undefined)
        );
      }
      return newStateOnBulkUploadFail;
    case RESET_BULK_UPLOAD_REQUEST:
      return state
        .set('bulkUploadRequest', initialState.get('bulkUploadRequest'));
    /**
     * default
     */
    default:
      return state;
  }
}