import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchInput, { createFilter } from 'react-search-input';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchString: '',
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  onClick(item) {
    this.props.history.push('user/' + item._id, [item]);
  }

  searchUpdated(term) {
    this.setState({ searchString: term });
  }
  renderList(data) {
    return data.map(item => (
      <tr key={Math.random()}>
        <td>
          <button
            style={{ backgroundColor: 'transparent', border: 0 }}
            className=""
            onClick={() => this.onClick(item)}
          >
            {item.firstName}
          </button>
        </td>
        <td>{item.lastName}</td>
        <td>{item.phoneNumber}</td>
        <td>{item.emailId}</td>
        <td>{item.chits}</td>
      </tr>
    ));
  }

  render() {
    const KEYS_TO_FILTERS = ['firstName', 'lastName', 'emailId', 'phoneNumber'];
    const filteredUsers = this.props.users.users.filter(
      createFilter(this.state.searchString, KEYS_TO_FILTERS),
    );
    console.log('====================================');
    console.log(filteredUsers, 'filteredUsers');
    console.log('====================================');
    return (
      <div className="col">
        <div>
          <SearchInput onChange={this.searchUpdated} />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>phone number</th>
              <th>emailId</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0
              ? this.renderList(filteredUsers)
              : 'loading'}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users,
  }),
  null,
)(Users);
