import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, withStyles } from '@material-ui/core';

class Modal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
  };

  static defaultProps = {
    isOpen: false,
    onClose: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState ({ isOpen: nextProps.isOpen });
  }

  _onClose() {
    this.setState({isOpen: false}, this.props.onClose);
  }

  render() {
    const { isOpen } = this.state;
    const { classes, bigger, middle, maxWidth } = this.props;

    return (
      <Dialog
        classes={{
          paper: bigger ? classes.bigger : (middle ? classes.middle : classes.paper)
        }}
        open={isOpen}
        maxWidth={maxWidth}        
        className={'MainModal'}
        onClose={() => this._onClose()}        
        aria-labelledby='form-dialog-title'>
        {this.props.children}
      </Dialog>
    );
  }
}

Modal.defaultProps = {
  maxWidth:'md'
};

Modal = withStyles({
  paper: {    
    maxHeight: '90vh'
  },
  bigger: {
    maxHeight: '90vh',
    minWidth: '70%'
  },
  middle: {
    maxHeight: '90vh',
    minWidth: '40%'
  }
})(Modal);

export default Modal;