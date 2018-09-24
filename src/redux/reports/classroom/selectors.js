import {createSelector} from 'reselect';

/**
 * Select domain
 */
export const selectClassroomReportDomain = (state) => state.classroomsReport;

/**
 * Charts data
 */
export const selectChartDatatRequest = createSelector(
  selectClassroomReportDomain,
  (subState) => subState.get('getChartDataRequest')
);

/**
 * Roster statistic
 */
export const selectRosterStatisticRequest = createSelector(
  selectClassroomReportDomain,
  (subState) => subState.get('getRosterStatisticRequest')
);