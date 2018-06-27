import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.posts.item) {
      this.props.posts.items.unshift(nextProps.posts.item);
    }
  }

  render() {
    const postItems = this.props.posts.items.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

    return (
      <div>
        <h1>posts</h1>
        {postItems}
      </div>
    );
  }
}

Posts.PropTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  {
    fetchPosts,
  },
)(Posts);
