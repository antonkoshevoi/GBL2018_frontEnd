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

/**
 * Student Report
 */
export const selectStudentReportDetailsRequest = createSelector(
  selectStudentReportDomain,
  (subState) => subState.get('getReportDetailsRequest')
);

/**
 * Student attempts
 */
export const selectAttemptsRequest = createSelector(
  selectStudentReportDomain,
  (subState) => subState.get('getAttemptsRequest')
);