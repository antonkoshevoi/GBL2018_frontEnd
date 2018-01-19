import React, { Component } from 'react';

class MetronicInput extends Component {

  render () {
    return (
      <input {...this.props} className={'form-control m-input m-input--air m-input--pill'}/>
    );
  }
}

export default MetronicInput;
