import React, { Component } from 'react';

class MetronicInput extends Component {

  render () {
    const { className, ...rest } = this.props;

    return (
      <input {...rest} className={`form-control m-input m-input--air`}/>
    );
  }
}

export default MetronicInput;
