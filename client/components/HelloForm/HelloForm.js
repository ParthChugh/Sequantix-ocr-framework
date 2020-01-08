import React from 'react';
import Hello from '../Hello/Hello';

var HelloForm = React.createClass({
  getInitialState() {
    return {
      name: 'worlds'
    };
  },

  render() {
    return (
      <div className="hello-form">
        <input type="text" onChange={this.onChange} />
        <Hello name={this.state.name} />
      </div>
    );
  },

  onChange: function(e) {
    this.setState({
      name: e.target.value
    });
  }
});

export default HelloForm;
