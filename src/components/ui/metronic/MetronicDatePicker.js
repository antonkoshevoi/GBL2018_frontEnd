import React, { Component } from 'react';
import MetronicInput from './MetronicInput';
import DatePicker from '../DatePicker';

class MetronicDatePicker extends Component {

  render () {
    const { placeholder, format, ...rest } = this.props;

    return (
      <DatePicker
        {...rest}
        clearable
        format={format ? format : 'YYYY-MM-DD'}
        style={{width: '100%'}}
        InputProps={{
          disableUnderline: true,
          inputComponent: MetronicInput,
          placeholder: placeholder,
          type: 'text',
        }}/>
    );
  }
}

export default MetronicDatePicker;
