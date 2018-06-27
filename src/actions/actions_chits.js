import { FETCH_CHITS, ADD_CHIT, UPDATE_CHIT } from './types';
import { uri } from '../constants';

import axios from 'axios';

export const fetchChits = () => dispatch =>
  axios.get(uri + 'chits').then(payload => {
    dispatch({
      type: FETCH_CHITS,
      chits: payload.data,
    });
  });
export const addChit = value => dispatch =>
  axios
    .post(uri + 'chits', {
      ...value,
    })
    .then(response => {
      dispatch({
        type: ADD_CHIT,
        newChit: response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
export const updateChits = value => dispatch =>
  axios
    .patch(uri + 'chits/' + value._id, {
      ...value,
    })
    .then(response => {
      dispatch({
        type: UPDATE_CHIT,
        updatedUser: response._id,
      });
    })
    .catch(error => {
      console.log(error);
    });
