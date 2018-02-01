import {createSelector} from 'reselect';

/**
 * Select domain
 */
export const selectChartDataDomain = (state) => state.reportsDashboardReducer;

/**
 * Charts data
 */
export const selectChartDatatRequest = createSelector(
  selectChartDataDomain,
  (subState) => subState.get('getChartDataRequest')
);

/**
 * Roster statistic
 */
export const selectRosterStatisticRequest = createSelector(
  selectChartDataDomain,
  (subState) => subState.get('getRosterStatisticRequest')
);