export const SUBSCRIBE = '[Notifications] SUBSCRIBE';
export const SUBSCRIBE_FAIL = '[Notifications] SUBSCRIBE_FAIL';

export const NEW_NOTIFICATION = '[Notifications] NEW_NOTIFICATION';

export function subscribe (userId) {
  return {
    type: SUBSCRIBE,
    userId
  }
}