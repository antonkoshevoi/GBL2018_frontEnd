import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectMessagesDomain = (state) => state.messages;

export const selectAllThreads = createSelector(
  selectMessagesDomain,
  (subState) => {
    return subState.get('threads');
  }
);

export const selectSelectedThreadId = createSelector(
  selectMessagesDomain,
  (subState) => {
    return subState.get('selectedThreadId');
  }
);

export const selectSelectedThread = createSelector(
  selectAllThreads,
  selectSelectedThreadId,
  (threads, id) => {
    if (id !== undefined) {
      return threads.get(`${id}`);
    }

    return null;
  }
);

export const selectGetThreadsRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getThreadsRequest')
);

/**
 * Available users
 */
export const selectAvailableUsers = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('availableUsers')
);
export const selectGetAvailableUsersRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('getAvailableUsersRequest')
);

/**
 * new thread
 */
export const selectCreateNewThreadRequest = createSelector(
  selectMessagesDomain,
  (subState) => subState.get('createThreadRequest')
);