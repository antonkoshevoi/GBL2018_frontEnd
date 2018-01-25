import React, { Component } from 'react';

class MetronicInput extends Component {

  render () {
    return (
      <input {...this.props} className={'form-control m-input m-input--air '}/>
    );
  }
}

export default MetronicInput;
