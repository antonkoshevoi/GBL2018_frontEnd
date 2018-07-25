import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectSubscriptionsDomain = (state) => state.subscriptions;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
    selectSubscriptionsDomain,
    (subState) => subState.get('getRecordsRequest')
);

/**
 * Get User Records Request
 */
export const selectGetUserRecordsRequest = createSelector(
    selectSubscriptionsDomain,
    (subState) => subState.get('getUserRecordsRequest')
);

/**
 * Get Single Request
 */
export const selectGetRecordRequest = createSelector(
    selectSubscriptionsDomain,
    (subState) => subState.get('getRecordRequest')
);

/**
 * Get Subscribe Request
 */
export const selectSubscribeRequest = createSelector(
    selectSubscriptionsDomain,
    (subState) => subState.get('subscribeRequest')
);

/**
 * Get Subscribe Student Request
 */
export const selectSubscribeStudentRequest = createSelector(
    selectSubscriptionsDomain,
    (subState) => subState.get('subscribeStudentRequest')
);

/**
 * Get Subscribe Student Request
 */
export const selectGetStudentsRecordsRequest = createSelector(
    selectSubscriptionsDomain,
    (subState) => subState.get('getStudentsRecordsRequest')
);