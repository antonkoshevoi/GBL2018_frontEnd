import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectSignupDomain = (state) => state.signup;

/**
 *
 */
export const selectValidateRequest = createSelector(
  selectSignupDomain,
  (subState) => subState.get('validateRequest')
);

export const selectSignUpRequest = createSelector(
  selectSignupDomain,
  (subState) => subState.get('signUpRequest')
);
