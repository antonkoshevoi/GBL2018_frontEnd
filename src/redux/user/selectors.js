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