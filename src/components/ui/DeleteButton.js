import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteButton extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.any,
    message: PropTypes.any,
    classNameBtn: PropTypes.any,
    icon: PropTypes.any,
    btnName: PropTypes.any,
    confirmOnly: PropTypes.any
  };

  static defaultProps = {
    className: "btn btn-danger m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m--margin-left-5",
    btnName: 'Delete',
    title: 'Are you sure?',
    icon: 'la la-remove',
    confirmOnly: false
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
    const {className, title, icon, btnName, confirmOnly} = this.props;
    const {opened} = this.state;
    
    return (
      <span>
        <button title={btnName} className={className} onClick={() => { this._openConfirm() }}> { icon ? <i className={icon}></i> : btnName } </button>
        <Dialog
          open={opened}
          onClose={() => { this._onCancel() }}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle className="text-center" id="alert-dialog-title" style={{minWidth: 300}}>{title}</DialogTitle>
          <div className="text-center m--margin-bottom-20 m--margin-top-10">
            <button onClick={() => { this._onConfirm() }} className="btn-success m-btn btn m--margin-right-10">Ok</button>
            {!confirmOnly && <button onClick={() => { this._onCancel() }} className="btn-default m-btn btn btn">Cancel</button>}
          </div>
        </Dialog>
      </span>
    );
  }
};

export default DeleteButton;