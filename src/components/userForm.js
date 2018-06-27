import React, { Component } from 'react';
import axios from 'axios';
import { uri } from '../constants';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import difference from 'lodash/difference';

import { addUser, updateUser } from '../actions/actions_users';
import { selectArray } from '../selector/index';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:
        props.location && props.location.state
          ? { ...props.location.state[0] }
          : {},
      res: '',
      type: '',
      selectedOptions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderChits = this.renderChits.bind(this);
  }
  handleSelectChange = selectedOption => {
    const selectedArray = this.state.selectedOptions
      ? [...this.state.selectedOptions, selectedOption[0]]
      : [selectedOption[0]];

    const value = {
      ...this.state.value,
      chits: this.state.selectedOptions
        ? [
            ...this.state.selectedOptions.map(item => item._id),
            selectedOption[0]._id,
          ]
        : [selectedOption[0]._id],
    };
    this.setState({ value, selectedOptions: [...selectedArray] });
  };
  async componentWillMount() {
    const payload = await axios.get(uri + 'users');
    console.log('====================================');
    console.log(payload);
    console.log('====================================');
    this.users = payload.data;
  }
  componentDidMount() {
    // axios
    //   .get('https://ajbocjzzl1.execute-api.us-east-1.amazonaws.com/dev/chits')
    //   .then(payload => {
    //     console.log('====================================');
    //     console.log(payload.data);
    //     console.log('====================================');
    //   });

    // axios
    //   .post(
    //     'https://qeo4jg76y4.execute-api.us-east-1.amazonaws.com/dev/users',
    //     {
    //       firstName: 'sharath-11',
    //       lastName: 'chandra-11',
    //     },
    //   )
    //   .then(response => {
    //     console.log('====================================');
    //     console.log(response);
    //     console.log('====================================');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    if (this.state.value._id) {
      this.setState({ type: 'put' });
    } else {
      this.setState({ type: 'post' });
    }
  }

  renderChits() {
    return this.state.selectedOptions.map(option => {
      return (
        <span key={option._id}>
          {option.value}
          <button
            onClick={event => {
              let leftOptions = this.state.selectedOptions.filter(
                item => item._id !== option._id,
              );

              this.setState({ selectedOptions: [...leftOptions] });
              event.preventDefault();
            }}
          >
            x
          </button>
        </span>
      );
    });
  }

  async handleChange(event) {
    const value = {
      ...this.state.value,
      [event.target.name]: event.target.value,
    };

    await this.setState({ value });
  }

  async handleSubmit(event) {
    if (
      this.props.users.users.some(item => item._id === this.state.value._id)
    ) {
      console.log('====================================');
      console.log('updateUser', this.state.value);
      console.log('====================================');
      this.props.updateUser(this.state.value);
    } else {
      this.props.addUser(this.state.value);
    }
    await this.setState({ value: {} });
    event.preventDefault();
  }

  render() {
    const { value } = this.state;
    const val = value.chits ? value.chits.join() : '';
    const options = difference(
      this.props.selectArray,
      this.state.selectedOptions,
    );

    return (
      <div>
        {this.state.res.length <= 0 ? (
          <form onSubmit={this.handleSubmit}>
            <div className="   container">
              <div className="form-group">
                <label>
                  firstName:
                  <input
                    className="form-control"
                    type="text"
                    name="firstName"
                    value={this.state.value.firstName}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div className="form-group ">
                <label>
                  lastName:
                  <input
                    className="form-control"
                    type="text"
                    name="lastName"
                    value={this.state.value.lastName}
                    onChange={this.handleChange}
                  />
                </label>
              </div>

              <div className="form-group">
                <label>
                  phone number:
                  <input
                    className="form-control"
                    type="text"
                    name="phoneNumber"
                    value={this.state.value.phoneNumber}
                    onChange={this.handleChange}
                  />
                </label>
              </div>

              <div className="form-group">
                <label>
                  email id:
                  <input
                    className="form-control"
                    type="text"
                    name="emailId"
                    value={this.state.value.emailId}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div>{this.renderChits()}</div>

              <div className="form-group">
                <Select
                  multi={true}
                  removeSelected={false}
                  joinValues={true}
                  delimiter=","
                  name="form-field-name"
                  value={val}
                  onChange={this.handleSelectChange}
                  options={options}
                  placeholder={'select the chit'}
                />
              </div>

              <input type="submit" value="Submit" />
            </div>
          </form>
        ) : (
          <div> {this.state.res}</div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users,
    selectArray: selectArray(state),
  }),
  {
    addUser,
    updateUser,
  },
)(UserForm);
