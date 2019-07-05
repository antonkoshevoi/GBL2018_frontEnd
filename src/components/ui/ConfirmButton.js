import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DeleteButton from './DeleteButton';

class ConfirmButton extends Component {

  static propTypes = {
        onClick: PropTypes.func,
        title: PropTypes.any,
        message: PropTypes.any,
        classNameBtn: PropTypes.any,
        icon: PropTypes.any,
        btnName: PropTypes.any,
        confirmOnly: PropTypes.any
  };

    static defaultProps = {
        className: "btn-info",
        classNameDefault: "btn m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill ml-2",
        btnName: 'Delete',
        title: 'Are you sure?',
        icon: 'la la-remove',
        confirmOnly: false
    };
    
    _onConfirm() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {classNameDefault, className, title, icon, btnName, confirmOnly} = this.props;    
    
        return <DeleteButton onClick={() => { this._onConfirm() }} title={title} icon={icon} btnName={btnName} confirmOnly={confirmOnly} className={`${classNameDefault} ${className}`}/>;
    }
};

export default ConfirmButton;