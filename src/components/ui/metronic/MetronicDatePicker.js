import React, { Component } from 'react';
import MetronicInput from './MetronicInput';
import DatePicker from '../DatePicker';

class MetronicDatePicker extends Component {

  render () {
    const { placeholder, ...rest } = this.props;

    return (
      <DatePicker
        {...rest}
        style={{width: '100%'}}
        InputProps={{
          disableUnderline: true,
          inputComponent: MetronicInput,
          type: 'text',
        }}/>
    );
  }
}

export default MetronicDatePicker;
