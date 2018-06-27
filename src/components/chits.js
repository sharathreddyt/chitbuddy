import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chits extends Component {
  constructor(props) {
    super(props);
    this.renderChits = this.renderChits.bind(this);
  }

  renderChits() {
    return this.props.chits.chits.map(item => (
      <button
        onClick={() => {
          this.props.history.push('chit/' + item._id, [item]);
        }}
      >
        <div
          style={{
            backgroundColor: `${'#' +
              ((Math.random() * 0xffffff) << 0).toString(16)}`,
          }}
          className="Chit-form-card"
          key={item._id}
        >
          {item.name}
        </div>
      </button>
    ));
  }

  render() {
    return (
      <div>
        <div className="Chit-Card-Container"> {this.renderChits()} </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    chits: state.chits,
  }),
  null,
)(Chits);
