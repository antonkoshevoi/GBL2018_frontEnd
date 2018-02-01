import {createSelector} from 'reselect';

/**
 * Select domain
 */
export const selectStudentReportDomain = (state) => state.studentReportsReducer;

/**
 * Student Report
 */
export const selectStudentReportRequest = createSelector(
  selectStudentReportDomain,
  (subState) => subState.get('getReportRequest')
);