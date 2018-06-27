import { NEW_POST, FETCH_POSTS } from './types';

import axios from 'axios';

export const fetchPosts = () => dispatch =>
  axios.get('https://jsonplaceholder.typicode.com/posts').then(payload => {
    dispatch({
      type: FETCH_POSTS,
      posts: payload.data,
    });
  });
export const createPost = postData => dispatch =>
  axios
    .post(
      'https://jsonplaceholder.typicode.com/posts',
      { ...postData },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    )
    .then(payload => {
      dispatch({
        type: NEW_POST,
        post: payload.data,
      });
    })
    .catch(err => {});
