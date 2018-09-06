import {
  GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL, CREATE, CREATE_SUCCESS, CREATE_FAIL,
  RESET_CREATE_REQUEST, GET_SINGLE_RECORD, GET_SINGLE_RECORD_FAIL,
  GET_SINGLE_RECORD_SUCCESS, RESET_GET_SINGLE_RECORD_REQUEST, UPDATE, UPDATE_FAIL, RESET_UPDATE_REQUEST, UPDATE_SUCCESS,
  DELETE, DELETE_SUCCESS, DELETE_FAIL,
  RESET_BULK_UPLOAD_REQUEST, BULK_UPLOAD, BULK_UPLOAD_SUCCESS, BULK_UPLOAD_FAIL, BULK_UPLOAD_PROGRESS,
  GET_COURSES, GET_COURSES_FAIL, GET_COURSES_SUCCESS, GET_DEMO_CLASSROOMS, GET_DEMO_CLASSROOMS_SUCCESS,
  GET_DEMO_CLASSROOMS_FAIL, GET_DEMO_COURSES, GET_DEMO_COURSES_SUCCESS, GET_DEMO_COURSES_FAIL,
  GET_RECORD_FOR_ASSIGN_STUDENTS, GET_RECORD_FOR_ASSIGN_STUDENTS_SUCCESS, GET_RECORD_FOR_ASSIGN_STUDENTS_FAIL,
  RESET_GET_RECORD_FOR_ASSIGN_STUDENTS_REQUEST,
  ASSIGN_STUDENT, ASSIGN_STUDENT_FAIL, ASSIGN_STUDENT_SUCCESS, RESET_ASSIGN_STUDENT_REQUEST, 
  ASSIGN_DEMO_STUDENT, ASSIGN_DEMO_STUDENT_FAIL, ASSIGN_DEMO_STUDENT_SUCCESS, RESET_ASSIGN_DEMO_STUDENT_REQUEST,
  GET_RECORDS_PUBLIC, GET_RECORDS_PUBLIC_SUCCESS, GET_RECORDS_PUBLIC_FAIL, GET_SINGLE_AUTOCLASS_RECORD, GET_SINGLE_AUTOCLASS_RECORD_SUCCESS,
  GET_SINGLE_AUTOCLASS_RECORD_FAIL, RESET_GET_SINGLE_AUTOCLASS_RECORD_REQUEST, UPDATE_AUTOCLASS,
  UPDATE_AUTOCLASS_SUCCESS, UPDATE_AUTOCLASS_FAIL, RESET_UPDATE_AUTOCLASS_REQUEST,
  GET_CLASSROOM_SCHEDULE, GET_CLASSROOM_SCHEDULE_SUCCESS, GET_CLASSROOM_SCHEDULE_FAIL,
  CLASSROOM_SCHEDULE_LESSON, CLASSROOM_SCHEDULE_LESSON_SUCCESS, CLASSROOM_SCHEDULE_LESSON_FAIL,
  UPDATE_CLASSROOM_SCHEDULE, UPDATE_CLASSROOM_SCHEDULE_SUCCESS, UPDATE_CLASSROOM_SCHEDULE_FAIL,
  ASSIGN_COURSE_CREDIT, ASSIGN_COURSE_CREDIT_SUCCESS, ASSIGN_COURSE_CREDIT_FAIL, RESET_ASSIGN_COURSE_CREDIT_REQUEST
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
  deleteRequest: {
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
  getCoursesRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: {}
  },
  schools: [],
  records: [],
  pagination: {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1
  },
  getRecordForAssignStudentsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    record: {}
  },
  assignStudentsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,
    errorCode: null,
    errors: {}
  },
  assignDemoStudentRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
  },
  assignCourseCreditRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
  },  
  getScheduleRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {},
    results: {}
  },
  scheduleLessonRequest: {   
    loading: false,
    success: false,
    fail: false,
    errors: {}
  },
  updateScheduleRequest: {   
    loading: false,
    success: false,
    fail: false,
    errors: {}
  }     
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Get records
     */
    case GET_RECORDS:
    case GET_RECORDS_PUBLIC:
    case GET_DEMO_CLASSROOMS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        ).set('records', Immutable.List());
    case GET_RECORDS_SUCCESS:
    case GET_RECORDS_PUBLIC_SUCCESS:
    case GET_DEMO_CLASSROOMS_SUCCESS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('success', true)
          .remove('loading')
        ).set('records', Immutable.fromJS(action.result.data))
        .set('pagination', Immutable.fromJS(action.result.meta.pagination));
    case GET_RECORDS_FAIL:
    case GET_RECORDS_PUBLIC_FAIL:
    case GET_DEMO_CLASSROOMS_FAIL:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * Get single record
     */
    case GET_SINGLE_RECORD:
    case GET_SINGLE_AUTOCLASS_RECORD:
      return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('record')
        );
    case GET_SINGLE_RECORD_SUCCESS:
    case GET_SINGLE_AUTOCLASS_RECORD_SUCCESS:
      return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('success', true)
          .set('loading', false)
          .set('record', Immutable.fromJS(action.result.data))
        );
    case GET_SINGLE_RECORD_FAIL:
    case GET_SINGLE_AUTOCLASS_RECORD_FAIL:
      return state
        .set('getSingleRecordRequest', state.get('getSingleRecordRequest')
          .set('loading', false)
          .set('fail', true)
        );
    case RESET_GET_SINGLE_RECORD_REQUEST:
    case RESET_GET_SINGLE_AUTOCLASS_RECORD_REQUEST:
      return state
        .set('getSingleRecordRequest', initialState.get('getSingleRecordRequest'));
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

      if (page === totalPages) {
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
    case UPDATE_AUTOCLASS:
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
    case UPDATE_AUTOCLASS_SUCCESS:
      let updatedRecords = state.get('records').map(record => {
        if (record.get('id') === action.result.data.id) {
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
    case UPDATE_AUTOCLASS_FAIL:
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
    case RESET_UPDATE_AUTOCLASS_REQUEST:
      return state
        .set('updateRequest', initialState.get('updateRequest'));
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
     * Courses
     */
    case GET_COURSES:
    case GET_DEMO_COURSES:
      return state
        .set('getCoursesRequest', state.get('getCoursesRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('records')
        );
    case GET_COURSES_SUCCESS:
    case GET_DEMO_COURSES_SUCCESS:
      return state
        .set('getCoursesRequest', state.get('getCoursesRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
        );
    case GET_COURSES_FAIL:
    case GET_DEMO_COURSES_FAIL:
      return state
        .set('getCoursesRequest', state.get('getCoursesRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * Get record for assign students
     */
    case GET_RECORD_FOR_ASSIGN_STUDENTS:
      return state
        .set('getRecordForAssignStudentsRequest', state.get('getRecordForAssignStudentsRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('record')
        );
    case GET_RECORD_FOR_ASSIGN_STUDENTS_SUCCESS:
      return state
        .set('getRecordForAssignStudentsRequest', state.get('getRecordForAssignStudentsRequest')
          .set('success', true)
          .set('loading', false)
          .set('record', Immutable.fromJS(action.result.data))
        );
    case GET_RECORD_FOR_ASSIGN_STUDENTS_FAIL:
      return state
        .set('getRecordForAssignStudentsRequest', state.get('getRecordForAssignStudentsRequest')
          .set('loading', false)
          .set('fail', true)
        );
    case RESET_GET_RECORD_FOR_ASSIGN_STUDENTS_REQUEST:
      return state
        .set('getRecordForAssignStudentsRequest', initialState.get('getRecordForAssignStudentsRequest'));

    /**
     * Assign Students
     */
    case ASSIGN_STUDENT:
      return state
        .set('assignStudentsRequest', state.get('assignStudentsRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('errors')
          .remove('errorMessage')
          .remove('errorCode')
        );
    case ASSIGN_STUDENT_SUCCESS:
      let assignedRecords = state.get('records').map(record => {
        if (record.get('id') === action.result.data.id) {
          return Immutable.fromJS(action.result.data);
        }
        return record;
      });
      return state.set('assignStudentsRequest', state.get('assignStudentsRequest')
          .set('loading', false)
          .set('success', true)
        ).set('records', assignedRecords);      
    case ASSIGN_STUDENT_FAIL:
      const assignStudentsErrordata = action.error.response.data;
      return state
        .set('assignStudentsRequest', state.get('assignStudentsRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errorCode', assignStudentsErrordata.code)
          .set('errorMessage', assignStudentsErrordata.message)
          .set('errors', assignStudentsErrordata.code === 422 ? Immutable.fromJS(assignStudentsErrordata.errors) : undefined)
        );
    case RESET_ASSIGN_STUDENT_REQUEST:
      return state
        .set('assignStudentsRequest', initialState.get('assignStudentsRequest'));

    /**
     * Assign Demo Student
     */
    case ASSIGN_DEMO_STUDENT:
      return state
        .set('assignDemoStudentRequest', state.get('assignDemoStudentRequest')
        .set('loading', true)
        .set('success', false)
        .set('fail', false)
        .remove('errors'));
    case ASSIGN_DEMO_STUDENT_SUCCESS:
      return state
        .set('assignDemoStudentRequest', state.get('assignDemoStudentRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)
        );      
    case ASSIGN_DEMO_STUDENT_FAIL:        
      return state
        .set('assignDemoStudentRequest', state.get('assignDemoStudentRequest')
          .set('loading', false)
          .set('fail', true)
          .set('success', false)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );
    case RESET_ASSIGN_DEMO_STUDENT_REQUEST:
      return state
        .set('assignDemoStudentRequest', initialState.get('assignDemoStudentRequest'));

    /**
     * Assign Course Credit
     */
    case ASSIGN_COURSE_CREDIT:
      return state
        .set('assignCourseCreditRequest', state.get('assignCourseCreditRequest')
        .set('loading', true)
        .set('success', false)
        .set('fail', false)
        .remove('errors'));
    case ASSIGN_COURSE_CREDIT_SUCCESS:
      return state
        .set('assignCourseCreditRequest', state.get('assignCourseCreditRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)
        );      
    case ASSIGN_COURSE_CREDIT_FAIL:        
      return state
        .set('assignCourseCreditRequest', state.get('assignCourseCreditRequest')
          .set('loading', false)
          .set('fail', true)
          .set('success', false)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );
    case RESET_ASSIGN_COURSE_CREDIT_REQUEST:
      return state
        .set('assignCourseCreditRequest', initialState.get('assignCourseCreditRequest'));

    /**
     * Classroom Schedule
     */
    case GET_CLASSROOM_SCHEDULE:
      return state
        .set('getScheduleRequest', state.get('getScheduleRequest')
        .set('loading', true)
        .set('success', false)
        .set('fail', false)
        .remove('errors')
        .remove('results'));
    case GET_CLASSROOM_SCHEDULE_SUCCESS:
      return state
        .set('getScheduleRequest', state.get('getScheduleRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)
          .set('results', Immutable.fromJS(action.result.data))
        );      
    case GET_CLASSROOM_SCHEDULE_FAIL:        
      return state
        .set('getScheduleRequest', state.get('getScheduleRequest')
          .set('loading', false)
          .set('fail', true)
          .set('success', false)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );

    /**
     * Classroom Schedule Lesson
     */
    case CLASSROOM_SCHEDULE_LESSON:
      return state
        .set('scheduleLessonRequest', state.get('scheduleLessonRequest')        
        .set('loading', true)
        .set('success', false)
        .set('fail', false)
        .remove('errors'));
    case CLASSROOM_SCHEDULE_LESSON_SUCCESS:
      return state
        .set('scheduleLessonRequest', state.get('scheduleLessonRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)          
        );      
    case CLASSROOM_SCHEDULE_LESSON_FAIL:        
      return state
        .set('scheduleLessonRequest', state.get('scheduleLessonRequest')
          .set('loading', false)
          .set('fail', true)
          .set('success', false)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );

    case UPDATE_CLASSROOM_SCHEDULE:
      return state
        .set('updateScheduleRequest', state.get('updateScheduleRequest')        
        .set('loading', true)
        .set('success', false)
        .set('fail', false)
        .remove('errors'));
    case UPDATE_CLASSROOM_SCHEDULE_SUCCESS:
      return state
        .set('updateScheduleRequest', state.get('updateScheduleRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)          
        );
    case UPDATE_CLASSROOM_SCHEDULE_FAIL:
      return state
        .set('updateScheduleRequest', state.get('updateScheduleRequest')
          .set('loading', false)
          .set('fail', true)
          .set('success', false)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );                        
    /**
     * default
     */
    default:
      return state;
  }
}