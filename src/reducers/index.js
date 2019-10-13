import { combineReducers } from 'redux';
import auth from './auth';
import points from './points';

export default combineReducers({
  auth,
  points,
});
