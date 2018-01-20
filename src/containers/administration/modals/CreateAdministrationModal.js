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
import { selectCreateRequest } from '../../../redux/administration/selectors';
import { create, resetCreateRequest } from '../../../redux/administration/actions';
import Modal from "../../../components/ui/Modal";
import AdministrationForm from "../forms/AdministrationForm";

class CreateAdministrationModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
    create: PropTypes.func.isRequired,
    createRequest: PropTypes.any.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      adminUser: {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: null,
        phone: '',
        schoolId: 1,
        homeroom: 1,
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const success = this.props.createRequest.get('success');
    const nextSuccess = nextProps.createRequest.get('success');

    if(!success && nextSuccess) {
      this._close();
      this.props.onSuccess();
    }
  }

  _close () {
    this.props.resetCreateRequest();
    this.props.onClose();
  };

  _onChange (adminUser) {
    this.setState({ adminUser });
  };

  _onSubmit (e) {
    e.preventDefault();
    this.props.create(
      this.state.adminUser
    );
  };

  render() {
    const { isOpen, createRequest } = this.props;
    const loading = createRequest.get('loading');
    const errorMessage = createRequest.get('errorMessage');
    const errors = createRequest.get('errors');

    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
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
              Create user
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
                Add New User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Modal>
    );
  }
}

CreateAdministrationModal = connect(
  (state) => ({
    createRequest: selectCreateRequest(state),
  }),
  (dispatch) => ({
    create: (form, params = {}) => { dispatch(create(form, params)) },
    resetCreateRequest: () => { dispatch(resetCreateRequest()) },
  })
)(CreateAdministrationModal);

export default CreateAdministrationModal;
