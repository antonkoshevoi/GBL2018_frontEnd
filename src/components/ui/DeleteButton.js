import React, {Component} from 'react';
import SweetAlert from 'sweetalert-react';
import PropTypes from 'prop-types';
import 'sweetalert/dist/sweetalert.css';

class DeleteButton extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.any,
    message: PropTypes.any,
    classNameBtn: PropTypes.any,
    icon: PropTypes.bool,
    btnName: PropTypes.any,
  };

  static defaultProps = {
    classNameBtn: "btn btn-danger m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill",
    btnName: 'Delete',
    title: 'Are you sure?',
    icon: true,
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
    const {classNameBtn, title, icon, btnName} = this.props;
    return (
      <a className={classNameBtn} style={{marginLeft: '5px'}} onClick={() => {
        this._openConfirm()
      }}>
        {icon ?
          <i className='la la-remove'></i> : btnName
        }
        <SweetAlert
          show={this.state.opened}
          title={title}
          showCancelButton={true}
          onConfirm={() => {
            this._onConfirm()
          }}
          onCancel={() => {
            this._onCancel()
          }}
        />
      </a>
    );
  }
};

export default DeleteButton;