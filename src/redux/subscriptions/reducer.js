import {
  GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL,
  GET_USER_RECORDS, GET_USER_RECORDS_SUCCESS, GET_USER_RECORDS_FAIL, RESET_GET_USER_RECORDS_REQUEST,
  GET_RECORD, GET_RECORD_FAIL, GET_RECORD_SUCCESS, RESET_GET_RECORD_REQUEST,
  SUBSCRIBE, SUBSCRIBE_FAIL, SUBSCRIBE_SUCCESS, RESET_SUBSCRIBE_REQUEST,
  UNSUBSCRIBE, UNSUBSCRIBE_SUCCESS, UNSUBSCRIBE_FAIL, RESET_UNSUBSCRIBE_REQUEST,
  SUBSCRIBE_STUDENT, SUBSCRIBE_STUDENT_SUCCESS, SUBSCRIBE_STUDENT_FAIL, RESET_SUBSCRIBE_STUDENT_REQUEST,
  UNSUBSCRIBE_STUDENT, UNSUBSCRIBE_STUDENT_SUCCESS, UNSUBSCRIBE_STUDENT_FAIL, RESET_UNSUBSCRIBE_STUDENT_REQUEST,
  GET_STUDENTS_RECORDS, GET_STUDENTS_RECORDS_SUCCESS, GET_STUDENTS_RECORDS_FAIL,
  GET_INVOICE, GET_INVOICE_SUCCESS, GET_INVOICE_FAIL,
  GET_PAYMENTS, GET_PAYMENTS_SUCCESS, GET_PAYMENTS_FAIL
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    records: []
  },
  getRecordRequest: {
    loading: false,
    success: false,
    fail: false,    
    record: {}
  },
  getUserRecordsRequest: {
    loading: false,
    success: false,
    fail: false,    
    records: []
  },
  getPaymentsRequest: {
    loading: false,
    success: false,
    fail: false,    
    records: []
  },  
  getStudentsRecordsRequest: {
    loading: false,
    success: false,
    fail: false,    
    records: []
  },  
  subscribeRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,       
    errors: {},
    userSubscriptionId: null
  },
  getInvoiceRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,       
    errors: {},
    record: null
  },  
  unSubscribeRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,    
    errors: {}
  },  
  subscribeStudentRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,    
    errors: {}
  },
  unsubscribeStudentRequest: {
    loading: false,
    success: false,
    fail: false,
    errorMessage: null,    
    errors: {}
  },
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
          .set('records', Immutable.List())
          .remove('success')
          .remove('fail')
        );
    case GET_RECORDS_SUCCESS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
            .set('success', true)
            .set('records', Immutable.fromJS(action.result.data))
            .remove('loading')
        );
    case GET_RECORDS_FAIL:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * Get User records
     */
    case GET_USER_RECORDS:
      return state
        .set('getUserRecordsRequest', state.get('getUserRecordsRequest')
          .set('loading', true)
          .set('records', Immutable.List())
          .remove('success')
          .remove('fail')
        );
    case GET_USER_RECORDS_SUCCESS:
      return state
        .set('getUserRecordsRequest', state.get('getUserRecordsRequest')
            .set('success', true)
            .set('records', Immutable.fromJS(action.result.data))
            .remove('loading')
        );
    case GET_USER_RECORDS_FAIL:
      return state
        .set('getUserRecordsRequest', state.get('getUserRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );
    case RESET_GET_USER_RECORDS_REQUEST: 
      return state.set('getUserRecordsRequest', initialState.get('getUserRecordsRequest'));    
    /**
     * Get User Studetns
     */
    case GET_STUDENTS_RECORDS:
      return state
        .set('getStudentsRecordsRequest', state.get('getStudentsRecordsRequest')
          .set('loading', true)
          .set('records', Immutable.List())
          .remove('success')
          .remove('fail')
        );
    case GET_STUDENTS_RECORDS_SUCCESS:
      return state
        .set('getStudentsRecordsRequest', state.get('getStudentsRecordsRequest')
            .set('success', true)
            .set('records', Immutable.fromJS(action.result.data))
            .remove('loading')
        );
    case GET_STUDENTS_RECORDS_FAIL:
      return state
        .set('getStudentsRecordsRequest', state.get('getStudentsRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * Get single record
     */
    case GET_RECORD:
      return state
        .set('getRecordRequest', state.get('getRecordRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('record')
        );
    case GET_RECORD_SUCCESS:
      return state
        .set('getRecordRequest', state.get('getRecordRequest')
          .set('success', true)
          .set('loading', false)
          .set('record', Immutable.fromJS(action.result.data))
        );
    case GET_RECORD_FAIL:
      return state
        .set('getRecordRequest', state.get('getRecordRequest')
          .set('loading', false)
          .set('fail', true)
        );
    case RESET_GET_RECORD_REQUEST:
      return state
        .set('getRecordRequest', initialState.get('getRecordRequest'));
     
    case SUBSCRIBE:
      return state
        .set('subscribeRequest', state.get('subscribeRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
          .remove('userSubscriptionId')
        );
    case SUBSCRIBE_SUCCESS:
      return state
        .set('subscribeRequest', state.get('subscribeRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)
          .set('userSubscriptionId', action.result.data.userSubscriptionId)
        );
    case SUBSCRIBE_FAIL:
      const data = action.error.response.data;
      const errors = Immutable.fromJS(data.errors);
      
      return state
        .set('subscribeRequest', state.get('subscribeRequest')
          .set('loading', false)
          .set('fail', true)
          .set('errors', (errors.size ? errors : Immutable.fromJS(data)))
          .remove('userSubscriptionId')
        );
    case RESET_SUBSCRIBE_REQUEST:
      return state.set('subscribeRequest', initialState.get('subscribeRequest'));
      
    case UNSUBSCRIBE:
      return state
        .set('unSubscribeRequest', state.get('unSubscribeRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case UNSUBSCRIBE_SUCCESS:
      return state
        .set('unSubscribeRequest', state.get('unSubscribeRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)
        );
    case UNSUBSCRIBE_FAIL:      
      return state
        .set('unSubscribeRequest', state.get('unSubscribeRequest')
          .set('loading', false)          
          .set('fail', true)          
          .set('errorMessage', action.error.response.data.message)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );
    case RESET_UNSUBSCRIBE_REQUEST:
      return state.set('unSubscribeRequest', initialState.get('unSubscribeRequest'));      
                   
    /**
     * Get invoice
     */
    case GET_INVOICE:
      return state
        .set('getInvoiceRequest', state.get('getInvoiceRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .remove('record')
        );
    case GET_INVOICE_SUCCESS:
      return state
        .set('getInvoiceRequest', state.get('getInvoiceRequest')
          .set('success', true)
          .set('loading', false)
          .set('record', Immutable.fromJS(action.result.data))
        );
    case GET_INVOICE_FAIL:
      return state
        .set('getInvoiceRequest', state.get('getInvoiceRequest')
          .set('loading', false)
          .set('fail', true)
        );
                    
    /**
     * Subscribe Student
     */          
    case SUBSCRIBE_STUDENT:
      return state
        .set('subscribeStudentRequest', state.get('subscribeStudentRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case SUBSCRIBE_STUDENT_SUCCESS:
      return state
        .set('subscribeStudentRequest', state.get('subscribeStudentRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)
        );
    case SUBSCRIBE_STUDENT_FAIL:      
      return state
        .set('subscribeStudentRequest', state.get('subscribeStudentRequest')
          .set('loading', false)          
          .set('fail', true)          
          .set('errorMessage', action.error.response.data.message)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );
    case RESET_SUBSCRIBE_STUDENT_REQUEST:
      return state.set('subscribeStudentRequest', initialState.get('subscribeStudentRequest'));

    /**
     * Unsubscribe Student
     */          
    case UNSUBSCRIBE_STUDENT:
      return state
        .set('unsubscribeStudentRequest', state.get('unsubscribeStudentRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case UNSUBSCRIBE_STUDENT_SUCCESS:
      return state
        .set('unsubscribeStudentRequest', state.get('unsubscribeStudentRequest')
          .set('loading', false)
          .set('fail', false)
          .set('success', true)
        );
    case UNSUBSCRIBE_STUDENT_FAIL:      
      return state
        .set('unsubscribeStudentRequest', state.get('unsubscribeStudentRequest')
          .set('loading', false)          
          .set('fail', true)          
          .set('errorMessage', action.error.response.data.message)
          .set('errors', Immutable.fromJS(action.error.response.data.errors))
        );
    case RESET_UNSUBSCRIBE_STUDENT_REQUEST:
      return state.set('unsubscribeStudentRequest', initialState.get('unsubscribeStudentRequest'));
      
      
    case GET_PAYMENTS:
      return state
        .set('getPaymentsRequest', state.get('getPaymentsRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
          .set('records', Immutable.List())
        );
    case GET_PAYMENTS_SUCCESS:
      return state
        .set('getPaymentsRequest', state.get('getPaymentsRequest')
          .set('success', true)
          .set('loading', false)          
          .set('records', Immutable.fromJS(action.result.data))
        )
        .set('pagination', Immutable.fromJS(action.result.meta.pagination));
    case GET_PAYMENTS_FAIL:
      return state
        .set('getPaymentsRequest', state.get('getPaymentsRequest')
          .set('loading', false)
          .set('fail', true)
          .set('records', Immutable.List())
        );
              
    /**
     * default
     */
    default:
      return state;
  }
}