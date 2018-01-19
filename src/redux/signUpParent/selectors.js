import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectParentSignUpDomain = (state) => state.signUpParent;

/**
 *
 */
export const selectValidateStep1Request = createSelector(
  selectParentSignUpDomain,
  (subState) => subState.get('validateStep1Request')
);
