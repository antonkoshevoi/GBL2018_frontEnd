import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectAdministrationDomain = (state) => state.administration;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
    selectAdministrationDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Get Single Request
 */
export const selectGetSingleRecordRequest = createSelector(
    selectAdministrationDomain,
  (subState) => subState.get('getSingleRecordRequest')
);
/**
 * Records
 */
export const selectRecords = createSelector(
    selectAdministrationDomain,
  (subState) => subState.get('records')
);
/**
 * Roles
 */
export const selectRoles = createSelector(
    selectAdministrationDomain,
    (subState) => subState.get('roles')
);
/**
 * Pagiantion
 */
export const selectPagination = createSelector(
    selectAdministrationDomain,
  (subState) => subState.get('pagination')
);

/**
 * Create
 */
export const selectCreateRequest = createSelector(
    selectAdministrationDomain,
  (subState) => subState.get('createRequest')
);
/**
 * Update
 */
export const selectUpdateRequest = createSelector(
    selectAdministrationDomain,
  (subState) => subState.get('updateRequest')
);
