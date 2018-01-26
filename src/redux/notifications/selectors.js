import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectNotificationsDomain = (state) => state.notifications;

export const selectAllNotifications = createSelector(
  selectNotificationsDomain,
  (subState) => subState.get('notifications')
);
