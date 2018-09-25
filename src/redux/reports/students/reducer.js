import {
  GET_REPORT_DATA, GET_REPORT_DATA_SUCCESS, GET_REPORT_DATA_FAIL,
  GET_REPORT_DETAILS, GET_REPORT_DETAILS_SUCCESS, GET_REPORT_DETAILS_FAIL, RESET_GET_REPORT_DETAILS
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getReportRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    data: []
  },
  getReportDetailsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    data: []
  }  
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Get Report data
     */
    case GET_REPORT_DATA:
      return state
        .set('getReportRequest', state.get('getReportRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('data', Immutable.List())
        );
    case GET_REPORT_DATA_SUCCESS:
      return state
        .set('getReportRequest', state.get('getReportRequest')
          .set('success', true)
          .set('loading', false)
          .set('data', Immutable.fromJS(action.result.data))
        );
    case GET_REPORT_DATA_FAIL:
      return state
        .set('getReportRequest', state.get('getReportRequest')
          .set('loading', false)
          .set('fail', true)
        );

    /**
     * Get School Report Student
     */
    case GET_REPORT_DETAILS:
      return state
          .set('getReportDetailsRequest', initialState.get('getReportDetailsRequest')
              .set('loading', true)
              .set('data', Immutable.List())
          );
    case GET_REPORT_DETAILS_SUCCESS:
      return state
          .set('getReportDetailsRequest', state.get('getReportDetailsRequest')
              .set('success', true)
              .set('loading', false)
              .set('data', Immutable.fromJS(action.result.data))
          );
    case GET_REPORT_DETAILS_FAIL:
      return state
          .set('getReportDetailsRequest', state.get('getReportDetailsRequest')
              .set('loading', false)
              .set('fail', true)
          );  
  
    case RESET_GET_REPORT_DETAILS:
      return state.set('getReportDetailsRequest', initialState.get('getReportDetailsRequest'));  
  
    /**
     * default
     */
    default:
      return state;
  }
}