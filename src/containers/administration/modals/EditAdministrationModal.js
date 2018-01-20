import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,
  DialogContentText,
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button
} from 'material-ui';
import { connect } from 'react-redux';
import {
  selectGetSingleRecordRequest, selectUpdateRequest
} from '../../../redux/administration/selectors';
import {
  update, resetGetSingleRecordRequest, resetUpdateRequest,
} from '../../../redux/administration/actions';
import Modal from "../../../components/ui/Modal";
import AdministrationForm from "../forms/AdministrationForm";

class EditAdministrationModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
    update: PropTypes.func.isRequired,
    resetUpdateRequest: PropTypes.func.isRequired,
    updateRequest: PropTypes.any.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      id: undefined,
      adminUser: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const record = this.props.getSingleRecordRequest.get('record');
    const nextRecord = nextProps.getSingleRecordRequest.get('record');

    if (!record && nextRecord) {
      this.setState({
        id: nextRecord.get('id'),
          adminUser: nextRecord.toJS()
      });
    }

    const success = this.props.updateRequest.get('success');
    const nextSuccess = nextProps.updateRequest.get('success');

    if(!success && nextSuccess) {
      this._onClose();
      this.props.onSuccess();
    }
  }

  _onClose () {
    this.setState({
      id: undefined,
      adminUser: {}
    });
    this.props.resetUpdateRequest();
    this.props.resetGetSingleRecordRequest();
    this.props.onClose();
  };

  _onChange (adminUser) {
    this.setState({ adminUser });
  };

  _onSubmit (e) {
    e.preventDefault();
    this.props.update(
      this.state.id,
      this.state.adminUser
    );
  };

  render() {
    const { isOpen, updateRequest, getSingleRecordRequest } = this.props;
    const loading = updateRequest.get('loading') || getSingleRecordRequest.get('loading');
    const errorMessage = updateRequest.get('errorMessage');
    const errors = updateRequest.get('errors');

    return (
      <Modal isOpen={isOpen} onClose={() => this._onClose()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>
            <IconButton color="contrast" aria-label="Close">
              {loading ? (
                <CircularProgress style={{float: 'right'}} color="inherit"/>
              ) : (
                <Icon>person</Icon>
              )}
            </IconButton>
            <Typography type="title" color="inherit" >
              Edit user
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <DialogContentText>
            {/*{errorMessage && <span>{errorMessage}</span>}*/}
          </DialogContentText>
          <form onSubmit={(e) => { this._onSubmit(e) }}>
            <AdministrationForm
              onChange={(adminUser) => { this._onChange(adminUser) }}
              adminUser={this.state.adminUser}
              errors={errors}/>
            <div className='col-sm-12'>
              <Divider/>
              <Button type='submit' disabled={loading} raised className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn' color='primary'>
                Update User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Modal>
    );
  }
}

EditAdministrationModal = connect(
  (state) => ({
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    updateRequest: selectUpdateRequest(state),
  }),
  (dispatch) => ({
    update: (id, form, params = {}) => { dispatch(update(id, form, params)) },
    resetUpdateRequest: () => { dispatch(resetUpdateRequest()) },
    resetGetSingleRecordRequest: () => { dispatch(resetGetSingleRecordRequest()) },
  })
)(EditAdministrationModal);

export default EditAdministrationModal;
