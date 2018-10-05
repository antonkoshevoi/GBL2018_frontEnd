import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

class ProgressButton extends Component {

  render () {
    const { loading, style, children, ...rest } = this.props;

    const buttonStyle = loading ? {
      ...style,
      paddingRight: '35px',
      position: 'relative'
    } : {...style};

    return (
      <button {...rest} style={buttonStyle}>
        {loading &&
          <CircularProgress style={{
            width: '25px',
            height: '25px',
            right: '5px',
            top: '18px',
            color: 'inherit'
          }}/>
        }
        {children}
      </button>
    );
  }
}

export default ProgressButton;
