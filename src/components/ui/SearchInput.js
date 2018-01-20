import React, { Component } from 'react';
import { Input } from 'material-ui';
import PropTypes from 'prop-types';

class SearchInput extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  _search (value) {
      this.props.onChange(value)
  }

  render() {
    const { onChange, ...rest } = this.props;

    return (
      <Input
        {...rest}
        onChange={(e) => { this._search(e.target.value) }}
      />
    );
  }
}

export default SearchInput;