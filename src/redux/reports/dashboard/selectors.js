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

/**
 * Students
 */
export const selectStudentsRequest = createSelector(
  selectChartDataDomain,
  (subState) => subState.get('getStudentsRequest')
);

/**
 * Homerooms
 */
export const selectHomeroomsRequest = createSelector(
  selectChartDataDomain,
  (subState) => subState.get('getHomeroomsRequest')
);

/**
 * Classrooms
 */
export const selectClassroomsRequest = createSelector(
  selectChartDataDomain,
  (subState) => subState.get('getClassroomsRequest')
);