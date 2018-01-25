import React, { Component } from 'react';
import {Select} from "material-ui";

class MetronicSelect extends Component {

  render () {
    const { children, ...rest } = this.props;

    return (
      <Select
        {...rest}
        className='form-control m-input m-input--air main-select'
        style={{minWidth:'120px'}}
        disableUnderline={true}>
        {children}
      </Select>
    );
  }
}

export default MetronicSelect;
