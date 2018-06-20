import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from '../../helpers/utils';
import { Input } from '@material-ui/core';

class SearchInput extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  state = {
    value: ''
  };

  _onChange (value) {
    const { onChange } = this.props;

    this.setState({ value }, debounce(() => {
      onChange(value);
    }, 1000));
  }

  render() {
    const { onChange, ...rest } = this.props;

    return (
      <Input
        {...rest}
        value={this.state.value}
        onChange={(e) => { this._onChange(e.target.value) }}/>
    );
  }
}

export default SearchInput;