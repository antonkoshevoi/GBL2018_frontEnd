import i18n from '../configs/i18n';

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