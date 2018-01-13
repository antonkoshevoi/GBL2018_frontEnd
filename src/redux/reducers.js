import auth from './auth/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;