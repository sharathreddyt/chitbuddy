import { combineReducers } from 'redux';

import postReducer from './postReducer';
import users from './reducer_users';
import chits from './reducer_chits';
export default combineReducers({
  posts: postReducer,
  users,
  chits,
});
