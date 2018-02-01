import {
  GET_REPORT_DATA, GET_REPORT_DATA_SUCCESS, GET_REPORT_DATA_FAIL
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
     * default
     */
    default:
      return state;
  }
}