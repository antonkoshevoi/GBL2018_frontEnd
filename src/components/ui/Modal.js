import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide, withStyles } from '@material-ui/core';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

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
    const { classes, bigger, maxWidth } = this.props;

    return (
      <Dialog
        classes={{
          paper: bigger ? classes.biggerPaper : classes.paper
        }}
        open={isOpen}
        maxWidth={maxWidth}
        className={'MainModal'}
        onClose={() => this._onClose()}
        transition={Transition}
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
    // height: '80%',
    maxHeight: '100vh',
  },
  biggerPaper: {
    maxHeight: '100vh',
    minWidth: '70%',
  },
  // paperWidthXs: {
  //   width: '80%'
  // },
  // paperWidthSm: {
  //   width: '80%'
  // },
  // paperWidthMd: {
  //   width: '80%'
  // },
})(Modal);

export default Modal;