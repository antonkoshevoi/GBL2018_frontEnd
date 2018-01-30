import { LOAD, LOAD_SUCCESS_AUTHENTICATED, LOAD_SUCCESS_UNAUTHENTICATED, LOAD_FAIL } from './actions';
import Immutable from "immutable";

export const initialState = Immutable.fromJS({
  failed: false,
  loaded: false
});

export default function reducer (state = initialState, action) {
    switch(action.type) {
    /**
     * Load
     */
    case LOAD:
      return state
        .set('loaded', false)
        .set('failed', false);
    case LOAD_SUCCESS_AUTHENTICATED:
    case LOAD_SUCCESS_UNAUTHENTICATED:
      return state
        .set('loaded', true);
    case LOAD_FAIL:
      return state
        .set('loaded', true)
        .set('failed', true);
    /**
     * default
     */
    default:
      return state;
  }
}