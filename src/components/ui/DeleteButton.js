import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import PropTypes from 'prop-types';
import 'sweetalert/dist/sweetalert.css';

class DeleteButton extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  _openConfirm() {
    this.setState({opened: true});
  };

  _onCancel() {
    this.setState({opened: false});
  };

  _onConfirm() {
    this.setState({opened: false});
    this.props.onClick();
  };

  render() {
    return (
      <button className='btn btn-danger m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => {this._openConfirm()}}>
        <i className='la la-remove'></i>
        <SweetAlert
          show={this.state.opened}
          title="Are you sure?"
          showCancelButton={true}
          onConfirm={() => {this._onConfirm()}}
          onCancel={() => {this._onCancel()}}
        />
      </button>
    );
  }
};

export default DeleteButton;