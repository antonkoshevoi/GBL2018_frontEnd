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
 * Records
 */
export const selectRecords = createSelector(
    selectSubscriptionsDomain,
    (subState) => subState.get('records')
);