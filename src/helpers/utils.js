import i18n from '../configs/i18n';
import { takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';

export const buildSortersQuery = (sorters) => {

  let query = [];
  let sorter;
  
  for (sorter in sorters) {
    query.push(`${sorter}:${sorters[sorter]}`);
  }

  return query;
};

/**
 *
 * @param response
 * @returns {*}
 */
export const getErrorMessage = (response) => {
  if(typeof response !== 'undefined') {
    const code = response.status;
    return i18n.t (`messages:errors:${code}`);
  }
  return i18n.t (`messages:errors:unknown`);
};

export const yieldSuccessToasts = (messages) => {
  return takeLatest(Object.keys(messages), function* (action) {
    yield toastr.success(messages[action.type]);
  });
};


export const yieldErrorToasts = (types) => {
  return takeLatest([...types], function* (action) {
      yield toastr.error(
        getErrorMessage(action.error.response)
      );    
  });
};

let timer = null;
export const debounce = (fn, delay) => {
  return function () {
    let context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};
