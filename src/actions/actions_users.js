import { FETCH_USERS, ADD_USER, UPDATE_USER } from './types';
import { uri } from '../constants';

import axios from 'axios';

export const fetchUsers = () => dispatch =>
  axios.get(uri + 'users').then(payload => {
    dispatch({
      type: FETCH_USERS,
      users: payload.data,
    });
  });
export const addUser = value => dispatch =>
  axios
    .post(uri + 'users/', JSON.stringify({ ...value }))
    .then(response => {
      dispatch({
        type: ADD_USER,
        newUser: response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
export const updateUser = value => dispatch => {
  console.log('====================================');
  console.log(uri + 'users/' + value._id);
  console.log('====================================');
  return axios
    .put(
      uri + 'users/' + value._id,
      JSON.stringify({
        ...value,
      }),
    )
    .then(response => {
      console.log('====================================');
      console.log(response, value, 'action', uri + 'users/' + value._id);
      console.log('====================================');
      dispatch({
        type: UPDATE_USER,
        updatedUser: response._id,
      });
    })
    .catch(error => {
      console.log(error);
    });
};
