import {
    GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    getRecordsRequest: {
        loading: false,
        success: false,
        fail: false,
        errorResponse: null,
        records: [],
        pagination: {
            page: 1,
            perPage: 25,
            total: 0,
            totalPages: 1
        }    
    }
});

export default function reducer (state = initialState, action) {
    switch(action.type) {
        /**
         * Get records
         */
        case GET_RECORDS:
            return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('loading', true).set('records', Immutable.List()));
        case GET_RECORDS_SUCCESS:
            return state
                .set('getRecordsRequest', state.get('getRecordsRequest')
                  .set('success', true)
                  .set('pagination', Immutable.fromJS(action.result.meta.pagination))
                  .set('records', Immutable.fromJS(action.result.data))
                  .remove('loading')
                );
        case GET_RECORDS_FAIL:
            return state.set('getRecordsRequest', initialState.get('getRecordsRequest').set('fail', true));


        /**
         * default
         */
        default:
            return state;
    }
}