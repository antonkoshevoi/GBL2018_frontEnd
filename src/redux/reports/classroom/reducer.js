import {
  GET_CHARTS_DATA, GET_CHARTS_DATA_SUCCESS, GET_CHARTS_DATA_FAIL,
  GET_ROSTER_STATISTIC, GET_ROSTER_STATISTIC_SUCCESS, GET_ROSTER_STATISTIC_FAIL
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  getChartDataRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    data: {}
  },
  getRosterStatisticRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    data: {}
  }
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Get Charts data
     */
    case GET_CHARTS_DATA:
      return state
        .set('getChartDataRequest', state.get('getChartDataRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('data', Immutable.Map())
        );
    case GET_CHARTS_DATA_SUCCESS:
      return state
        .set('getChartDataRequest', state.get('getChartDataRequest')
          .set('success', true)
          .set('loading', false)
          .set('data', Immutable.fromJS(action.result.data))
        );
    case GET_CHARTS_DATA_FAIL:
      return state
        .set('getChartDataRequest', state.get('getChartDataRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * Get Roster statistic
     */
    case GET_ROSTER_STATISTIC:
      return state
        .set('getRosterStatisticRequest', state.get('getRosterStatisticRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('data', Immutable.Map())
        );
    case GET_ROSTER_STATISTIC_SUCCESS:
      return state
        .set('getRosterStatisticRequest', state.get('getRosterStatisticRequest')
          .set('success', true)
          .set('loading', false)
          .set('data', Immutable.fromJS(action.result.data))
        );
    case GET_ROSTER_STATISTIC_FAIL:
      return state
        .set('getRosterStatisticRequest', state.get('getRosterStatisticRequest')
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