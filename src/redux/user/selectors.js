import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectUserDomain = (state) => state.user;

export const selectGetUserRequest = createSelector(
  selectUserDomain,
  (subState) => subState.get('getUserRequest')
);

export const selectUserData = createSelector(
  selectUserDomain,
  (subState) => subState.get('userData')
);

export const selectUserPermissions = createSelector(
  selectUserDomain,
  (subState) => subState.get('permissions')
);

export const selectUserRoles = createSelector(
  selectUserDomain,
  (subState) => subState.get('roles')
);
/**
 * Update
 */
export const selectUpdateRequest = createSelector(
  selectUserDomain,
  (subState) => subState.get('updateRequest')
);