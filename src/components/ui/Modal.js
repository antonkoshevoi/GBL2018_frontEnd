import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide, withStyles } from 'material-ui';

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
    const { classes, bigger } = this.props;

    return (
      <Dialog
        classes={{
          paper: bigger ? classes.biggerPaper : classes.paper
        }}
        open={isOpen}
        onClose={() => this._onClose()}
        transition={Transition}
        aria-labelledby='form-dialog-title'>
        {this.props.children}
      </Dialog>
    );
  }
}

Modal = withStyles({
  paper: {
    height: '80%'
  },
  biggerPaper: {
    height: '80%',
    minWidth: '80%',
    maxWidth: 'none'
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