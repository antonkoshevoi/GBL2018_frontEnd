import {
  NEW_NOTIFICATION
} from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  notifications: {}
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * NEW_NOTIFICATION
     */
    case NEW_NOTIFICATION:
      return state;
    /**
     * default
     */
    default:
      return state;
  }
}