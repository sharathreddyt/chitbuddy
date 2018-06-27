import { FETCH_CHITS } from '../actions/types';

const initialState = {
  chits: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHITS:
      return Object.assign({}, state, {
        chits: action.chits,
      });

    default:
      return state;
  }
};
