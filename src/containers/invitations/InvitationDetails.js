import React, { Component } from 'react';
import MainLayout from '../layouts/MainLayout';
import { connect } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectGetSingleRecordRequest } from '../../redux/invitations/selectors';
import { getSingleRecord } from '../../redux/invitations/actions';
import { Button, CircularProgress, Grid } from 'material-ui';
import AuthorizeModal from './modals/AuthorizeModal';

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
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      this.setState({
        authModalOpen: true
      });
    }
  }

  _decline() {

  }

  _renderInvitation () {
    const { getRecordRequest } =  this.props;
    const loading = getRecordRequest.get('loading');
    const record = getRecordRequest.get('record');
    const image = record.getIn(['course', 'image']);
    const sender = record.getIn(['sender', 'name']);
    const title = record.getIn(['course', 'crsTitle']);
    const description = record.getIn(['course', 'crsDescription']);

    return (
      <div className="row">
        <div className="col-md-10 m-auto">
          <div className="m-portlet m--margin-top-35">
            <div className="m-portlet__body">
              { loading ? (
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

                    <Grid sm={12} style={{ textAlign: 'center', marginBottom: 20 }}>
                      <Button raised onClick={() => { this._accept() }} className='mt-btn mt-btn-success m--margin-left-30 m--margin-right-30'>
                        Accept
                      </Button>
                      <Button raised onClick={() => { this._decline() }} className='mt-btn mt-btn-danger m--margin-left-30 m--margin-right-30'>
                        Decline
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              )}
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
          { this._renderInvitation() }
        </MainLayout>
      );
    }

    return (
      <div>
        { this._renderInvitation() }
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
    getRecord: (id, hash) => { dispatch(getSingleRecord(id, hash)) }
  }),
)(InvitationDetails);

export default InvitationDetails;