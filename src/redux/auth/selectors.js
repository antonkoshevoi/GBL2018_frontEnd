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

export const selectResetPasswordRequest = createSelector(
  selectAuthDomain,
  (subState) => subState.get('resetPasswordRequest')
);


export const selectResetPasswordUserRequest = createSelector(
  selectAuthDomain,
  (subState) => subState.get('resetPasswordUserRequest')
);

export const selectUpdatePasswordRequest = createSelector(
  selectAuthDomain,
  (subState) => subState.get('updatePasswordRequest')
);

export const selectRedirectAfterLogin = createSelector(
  selectAuthDomain,
  (subState) => subState.get('redirectAfterLogin')
);

export const selectCallback = createSelector(
  selectAuthDomain,
  (subState) => subState.get('callback')
);

export const selectIsLoggedIn = createSelector(
  selectAuthDomain,
  (subState) => subState.get('isLoggedIn')
);

export const SelectRestoreLoginFail = createSelector(
  selectAuthDomain,
  (subState) => subState.get('restoreLoginFail')
);