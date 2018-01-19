import {
  GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, CREATE, CREATE_SUCCESS, CREATE_FAIL,
  RESET_CREATE_REQUEST, GET_SCHOOLS, GET_SCHOOLS_SUCCESS, GET_SCHOOLS_FAIL, GET_SINGLE_RECORD, GET_SINGLE_RECORD_FAIL,
  GET_SINGLE_RECORD_SUCCESS, RESET_GET_SINGLE_RECORD_REQUEST, UPDATE, UPDATE_FAIL, RESET_UPDATE_REQUEST, UPDATE_SUCCESS,
  GET_SCHOOL_TEACHERS, GET_SCHOOL_TEACHERS_SUCCESS, GET_SCHOOL_TEACHERS_FAIL,
  GET_SCHOOL_STUDENTS, GET_SCHOOL_STUDENTS_SUCCESS, GET_SCHOOL_STUDENTS_FAIL,
  RESET_BULK_UPLOAD_REQUEST, BULK_UPLOAD, BULK_UPLOAD_SUCCESS, BULK_UPLOAD_FAIL, BULK_UPLOAD_PROGRESS
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
  getSchoolTeachersRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
  },
  getSchoolStudentsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
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
  schools: [],
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
     * Get schools
     */
    case GET_SCHOOLS:
      return state
        .set('schools', Immutable.List());
    case GET_SCHOOLS_SUCCESS:
      return state
        .set('schools', Immutable.fromJS(action.result.data));
    case GET_SCHOOLS_FAIL:
      return state;

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
      return state
        .set('updateRequest', initialState.get('updateRequest'));

    /**
     * Homeroom School Teachers
     */
    case GET_SCHOOL_TEACHERS:
      return state
        .set('getSchoolTeachersRequest', state.get('getSchoolTeachersRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('records')
        );
    case GET_SCHOOL_TEACHERS_SUCCESS:
      return state
        .set('getSchoolTeachersRequest', state.get('getSchoolTeachersRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
        );
    case GET_SCHOOL_TEACHERS_FAIL:
      return state
        .set('getSchoolTeachersRequest', state.get('getSchoolTeachersRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * Homeroom School Students
     */
    case GET_SCHOOL_STUDENTS:
      return state
        .set('getSchoolStudentsRequest', state.get('getSchoolStudentsRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('records')
        );
    case GET_SCHOOL_STUDENTS_SUCCESS:
      return state
        .set('getSchoolStudentsRequest', state.get('getSchoolStudentsRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
        );
    case GET_SCHOOL_STUDENTS_FAIL:
      return state
        .set('getSchoolStudentsRequest', state.get('getSchoolStudentsRequest')
          .set('loading', false)
          .set('fail', true)
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
                .set('errors', bulkUploadRequestErrorData.code === 400 ? Immutable.fromJS(bulkUploadRequestErrorData.errors) : undefined)
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