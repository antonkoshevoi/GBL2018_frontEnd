import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withTranslation } from 'react-i18next';

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
    className: "btn btn-danger m-btn--icon-only ml-2",
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
    const {className, title, icon, btnName, confirmOnly, t} = this.props;
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
          <div className="text-center mb-4 mt-3">
            <button onClick={() => { this._onConfirm() }} className="btn-success btn mr-3">{t('ok')}</button>
            {!confirmOnly && <button onClick={() => { this._onCancel() }} className="btn-default btn btn">{t('cancel')}</button>}
          </div>
        </Dialog>
      </span>
    );
  }
};

export default withTranslation('translations')(DeleteButton);