import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectAuthDomain = (state) => state.auth;

/**
 *
 */
export const selectLoginRequest = createSelector(
  selectAuthDomain,
  (subState) => subState.get('loginRequest')
);

export const selectRedirectAfterLogin = createSelector(
  selectAuthDomain,
  (subState) => subState.get('redirectAfterLogin')
);

export const selectIsLoggedIn = createSelector(
  selectAuthDomain,
  (subState) => subState.get('isLoggedIn')
);

export const SelectRestoreLoginFail = createSelector(
  selectAuthDomain,
  (subState) => subState.get('restoreLoginFail')
);