import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectCountriesDomain = (state) => state.countries;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectCountriesDomain,
  (subState) => subState.get('getRecordsRequest')
);

export const selectRecords = createSelector(
  selectCountriesDomain,
  (subState) => subState.get('records')
);


/**
 * Pagiantion
 */
export const selectPagination = createSelector(
  selectCountriesDomain,
  (subState) => subState.get('pagination')
);
