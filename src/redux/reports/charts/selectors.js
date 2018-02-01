import {createSelector} from 'reselect';

/**
 * Select domain
 */
export const selectChartDataDomain = (state) => state.chartsReducer;

/**
 * Charts Report
 */
export const selectChartDatatRequest = createSelector(
  selectChartDataDomain,
  (subState) => subState.get('getChartDataRequest')
);