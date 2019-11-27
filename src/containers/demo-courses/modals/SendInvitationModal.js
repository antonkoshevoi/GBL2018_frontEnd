import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent, 
  Icon,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { selectCreateRequest } from '../../../redux/invitations/selectors';
import { create, resetCreateRequest } from '../../../redux/invitations/actions';
import Modal from '../../../components/ui/Modal';
import InvitationForm from '../forms/InvitationForm';

class SendInvitationModal extends Component {
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
      invitation: {
        classroomId: '',
        email: '',
        name: '',
        message: ''
      }
    };
  }

  componentDidUpdate(prevProps) {
    const success = this.props.createRequest.get('success');

    if (success && !prevProps.createRequest.get('success')) {
      this._close();
      this.props.onSuccess();
    }
  }

  _onChange (invitation) {
    this.setState({ invitation });
  };

  _onSubmit (e) {
    e.preventDefault();
    this.props.create(
      this.state.invitation
    );
  };

  _close () {
    this.setState({
      invitation: {}
    });
    this.props.onClose();
    this.props.resetCreateRequest();
  }

  render() {
    const { isOpen, createRequest, t } = this.props;
    const loading = createRequest.get('loading');
    const errors = createRequest.get('errors');

    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
              {loading ? (
                <CircularProgress className="mr-3" color='inherit'/>
              ) : (
                <Icon className="mr-3">send</Icon>
              )}            
            <Typography variant="h6" color='inherit'>
              {t('demoCourseInvitation')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='mt-4'>
          <form id='create-student-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <InvitationForm
              onChange={(student) => { this._onChange(student) }}
              invitation={this.state.invitation}
              errors={errors}/>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='create-student-form'
            disabled={loading}            
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('sendInvitation')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

SendInvitationModal = connect(
  (state) => ({
    createRequest: selectCreateRequest(state),
  }),
  (dispatch) => ({
    create: (form, params = {}) => { dispatch(create(form, params)) },
    resetCreateRequest: () => { dispatch(resetCreateRequest()) },
  })
)(SendInvitationModal);

export default withTranslation('translations')(SendInvitationModal);
