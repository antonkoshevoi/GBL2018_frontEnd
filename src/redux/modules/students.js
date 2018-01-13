// Get records
const GET_RECORDS = '[Students] GET_RECORDS';
const GET_RECORDS_SUCCESS = '[Students] GET_RECORDS_SUCCESS';
const GET_RECORDS_FAIL = '[Students] GET_RECORDS_FAIL';

const initialState = {
  records: {
    data: [],
    meta: {}
  },
  // Initial load complete
  initialLoad: false,
  loading: false,
  success: false,
  fail: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    /**
     * Get records
     */
    case GET_RECORDS:
      return {
        ...state,
        initialLoad: true,
        loading: true,
        success: false,
        fail: false,
      };
    case GET_RECORDS_SUCCESS:
      return {
        ...state,
        records: action.result,
        loading: false,
        success: true
      };
    case GET_RECORDS_FAIL:
      return {
        ...state,
        loading: false,
        fail: true
      };

    default:
      return state;
  }
}

export function getRecords(page, perPage = 10, filters = [], sorters = []) {

}