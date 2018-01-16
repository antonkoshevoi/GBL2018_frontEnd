import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide } from 'material-ui';

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

    return (
      <Dialog
        open={isOpen}
        onClose={() => this._onClose()}
        transition={Transition}
        aria-labelledby='form-dialog-title'>
        {this.props.children}
      </Dialog>
    );
  }
}

export default Modal;