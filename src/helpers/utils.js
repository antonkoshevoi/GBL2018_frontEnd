import i18n from '../configs/i18n';
import { takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';

export const buildSortersQuery = (sorters) => {

  let query = [];

  for (const sorter in sorters) {
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
    toastr.success(
      messages[action.type]
    );
  });
};

export const yieldErrorToasts = (types) => {
  return takeLatest([...types], function* (action) {
    if(typeof action.error !== 'undefined') {
      toastr.error(
        getErrorMessage(action.error.response)
      );
    }
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


/**
 *
 * @param paths, i
 * @returns 'path
 */
export const  generateBreadcrumbLink = (paths,i) => {
    let path = ""
    for (let x = 1; x<=i; x++) {
        path += '/' + paths[x];
    }
    return path;
}

/**
 *
 * @param paths, i
 * @returns 'path
 */
export const  generateLinkId = (paths) => {
    let path = ""
    for (let x = 1; x<=paths.length-1; x++) {
        path += paths[x] +  '_';
    }
    return path;
}