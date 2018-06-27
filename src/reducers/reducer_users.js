import { FETCH_USERS, ADD_USER } from '../actions/types';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign({}, state, {
        users: action.users,
      });
    case ADD_USER:
      return Object.assign({}, state, {
        newUser: action.newUser,
      });

    default:
      return state;
  }
};
