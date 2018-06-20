import React, { Component } from 'react';
import MainLayout from '../layouts/MainLayout';
import { connect } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectGetSingleRecordRequest } from '../../redux/invitations/selectors';
import { acceptInvitation, declineInvitation, getSingleRecord } from '../../redux/invitations/actions';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import AuthorizeModal from './modals/AuthorizeModal';
import { setCallback } from '../../redux/auth/actions';

class InvitationDetails extends Component {

  state = {
    authModalOpen: false
  };

  componentDidMount () {
    const { getRecord, match } = this.props;
    const id = match.params.id;
    const hash = match.params.hash;
    getRecord(id, hash);
  }

  _closeAuthModal () {
    this.setState({ authModalOpen: false });
  }

  _accept() {
    const { isLoggedIn, acceptInvitation, setLoginCallback, match } = this.props;
    const id = match.params.id;
    const hash = match.params.hash;

    const acceptInvitationCallback = () => {
      acceptInvitation(id, hash);
    };

    if (!isLoggedIn) {
      this.setState({
        authModalOpen: true
      });

      setLoginCallback(acceptInvitationCallback);
    } else {
      acceptInvitationCallback();
    }
  }

  _decline() {
    const { declineInvitation, match } = this.props;
    const id = match.params.id;
    const hash = match.params.hash;
    declineInvitation(id, hash);
  }

  _renderInvitation () {
    const { getRecordRequest } =  this.props;
    const loading = getRecordRequest.get('loading');
    const record = getRecordRequest.get('record');
    const image = record.getIn(['course', 'image']);
    const sender = record.getIn(['sender', 'name']);
    const title = record.getIn(['course', 'crsTitle']);
    const description = record.getIn(['course', 'crsDescription']);

    if (record.get('isAccepted')) {
      return (
        <div>
          <h3>Demo Course Invitation</h3>
          <h2>Thanks for joining the Demo!</h2>
        </div>
      );
    }

    if (record.get('isDeclined')) {
      return (
        <div>
          <h3>Demo Course Invitation</h3>
          <h2>Invitation was declined.</h2>
        </div>
      );
    }

    return loading ? (
      <h2 className='text-center'><CircularProgress color='accent'/></h2>
    ) : (
      <div>
        <h3>Demo Course Invitation</h3>

        <Grid container spacing={24}>
          {image && (
            <Grid item sm={3} style={{
              padding: 20,
              textAlign: 'center'
            }}>
              <img src={image}/>
            </Grid>
          )}
          <Grid item sm={image ? 9 : 12} style={{ padding: 20 }}>
            <h4>{ sender }</h4>
            <p>has invited you to join their Demo launch of</p>

            <h2>{ title }</h2>

            <br/>
            <h4>Description:</h4>
            <p>{ description }</p>
          </Grid>

          <Grid item sm={12} style={{ textAlign: 'center', marginBottom: 20 }}>
            <Button raised onClick={() => { this._accept() }} className='mt-btn mt-btn-success m--margin-left-30 m--margin-right-30'>
              Accept
            </Button>
            <Button raised onClick={() => { this._decline() }} className='mt-btn mt-btn-danger m--margin-left-30 m--margin-right-30'>
              Decline
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  _renderWrapperBox () {

    return (
      <div className="row">
        <div className="col-md-10 m-auto">
          <div className="m-portlet m--margin-top-35">
            <div className="m-portlet__body">
              { this._renderInvitation() }
            </div>
          </div>
        </div>
      </div>
    );
  }

  render () {
    const { isLoggedIn } =  this.props;
    const { authModalOpen } =  this.state;

    if (isLoggedIn) {
      return (
        <MainLayout>
          { this._renderWrapperBox() }
        </MainLayout>
      );
    }

    return (
      <div>
        { this._renderWrapperBox() }
        <AuthorizeModal isOpen={authModalOpen} onClose={() => { this._closeAuthModal() }}/>
      </div>
    );
  }
}

InvitationDetails = connect(
  (state) => ({
    isLoggedIn: selectIsLoggedIn(state),
    getRecordRequest: selectGetSingleRecordRequest(state)
  }),
  (dispatch) => ({
    getRecord: (id, hash) => { dispatch(getSingleRecord(id, hash)) },
    acceptInvitation: (id, hash) => { dispatch(acceptInvitation(id, hash)) },
    declineInvitation: (id, hash) => { dispatch(declineInvitation(id, hash)) },
    setLoginCallback: (callback) => { dispatch(setCallback(callback)) }
  }),
)(InvitationDetails);

export default InvitationDetails;