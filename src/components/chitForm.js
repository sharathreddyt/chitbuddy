import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addChit } from '../actions/actions_chits';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

class chitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:
        props.location && props.location.state
          ? { ...props.location.state[0] }
          : {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleDateChange(item) {
    this.setState({
      value: this.state.value
        ? { ...this.state.value, startDate: item }
        : { startDate: item },
    });
  }

  async handleChange(event) {
    const value = {
      ...this.state.value,
      [event.target.name]: event.target.value,
    };
    await this.setState({ value });
  }
  handleSubmit() {
    this.props.addChit(this.state.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="   container">
            <div className="form-group">
              <label>
                Name:
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={this.state.value.name}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="form-group ">
              <label>
                Start Date:
                <DatePicker
                  name="startDate"
                  className="form-control"
                  selected={this.state.value.startDate}
                  onChange={this.handleDateChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                End date:
                <input
                  className="form-control"
                  type="text"
                  name="enddate"
                  value={this.state.value.enddate}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Amount:
                <input
                  className="form-control"
                  type="text"
                  name="amount"
                  value={this.state.value.amount}
                  onChange={this.handleDateChange}
                />
              </label>
            </div>

            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, {
  addChit,
})(chitForm);
