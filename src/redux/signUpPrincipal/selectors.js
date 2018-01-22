import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectPrincipalSignUpDomain = (state) => state.signUpPrincipal;

/**
 *
 */
export const selectSignUpRequest = createSelector(
  selectPrincipalSignUpDomain,
  (subState) => subState.get('signUpRequest')
);
