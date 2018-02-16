import {createSelector} from 'reselect';

/**
 * Select domain
 */
export const selectHomeroomReportDomain = (state) => state.homeroomReport;

/**
 * Charts data
 */
export const selectChartDatatRequest = createSelector(
  selectHomeroomReportDomain,
  (subState) => subState.get('getChartDataRequest')
);

/**
 * Roster statistic
 */
export const selectRosterStatisticRequest = createSelector(
  selectHomeroomReportDomain,
  (subState) => subState.get('getRosterStatisticRequest')
);

/**
 * Students
 */
export const selectStudentsRequest = createSelector(
  selectHomeroomReportDomain,
  (subState) => subState.get('getStudentsRequest')
);