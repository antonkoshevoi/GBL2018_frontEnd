import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectSchoolsDomain = (state) => state.reports;

/**
 * Get Student for report
 */
export const selectGetStudentForReportRequest = createSelector(
    selectSchoolsDomain,
    (subState) => subState.get('getStudentForReportRequest')
);
