import { createSelector } from 'reselect';

export const getUsers = state => state.users;
export const getChits = state => state.chits;

export const selectArray = createSelector(getChits, chits => {
  return chits.chits.length > 0
    ? chits.chits.map(current => ({
        _id: current._id,
        value: current.name,
        label: current.name,
      }))
    : [];
});
