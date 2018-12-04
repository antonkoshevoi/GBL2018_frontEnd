import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectGiftsDomain = (state) => state.gifts;

export const selectGetRecordsRequest = createSelector(
  selectGiftsDomain,
  (subState) => subState.get('getRecordsRequest')
);

export const selectGetRecordRequest = createSelector(
  selectGiftsDomain,
  (subState) => subState.get('getRecordRequest')
);

export const selectGiftRequest = createSelector(
  selectGiftsDomain,
  (subState) => subState.get('giftRequest')
);

export const selectSubscriptionRequest = createSelector(
  selectGiftsDomain,
  (subState) => subState.get('giftSubscriptionRequest')
);

export const selectPublicGiftRequest = createSelector(
  selectGiftsDomain,
  (subState) => subState.get('publicGiftRequest')
);

export const selectDeleteRequest = createSelector(
  selectGiftsDomain,
  (subState) => subState.get('deleteRequest')
);

export const selectChangeStatusRequest = createSelector(
  selectGiftsDomain,
  (subState) => subState.get('changeStatusRequest')
);

