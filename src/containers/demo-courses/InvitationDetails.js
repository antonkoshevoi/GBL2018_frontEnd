import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation, Trans } from 'react-i18next';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectGetSingleRecordRequest } from '../../redux/invitations/selectors';
import { acceptInvitation, declineInvitation, getSingleRecord } from '../../redux/invitations/actions';
import { Button, CircularProgress } from '@material-ui/core';
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
  
  _errorMessage(message) {
      return <h2 className="my-5 py-5 text-center">{message}</h2>;
  }

  _renderInvitation (invitation) {
    const { t } =  this.props;
        
    const image = invitation.getIn(['course', 'image']);

    if (invitation.get('isExpired')) {
        return this._errorMessage(t('invitationExpired'));
    }
    
    if (invitation.get('isAccepted')) {
        return this._errorMessage(t('invitationAccepted'));
    }

    if (invitation.get('isDeclined')) {
        return this._errorMessage(t('invitationDeclined'));
    }
    
    const imageStyle = {width: '100%', maxWidth: 210};
    
    return (
        <div className="row">
          {image && (
            <div className="col-sm-3 text-center p-4">
              <img style={imageStyle} src={image} alt="Demo Course" />
            </div>
          )}
          <div className={`p-4 col-12 col-sm-${image ? 9 : 12}`}>            
            <div>
                <Trans i18nKey="translations:userInvitedYouToDemoCourse">
                    <h4>{{sender: invitation.getIn(['sender', 'name'])}}</h4>
                    <h2 className="my-3">{{course: invitation.getIn(['course', 'crsTitle'])}}</h2>
                </Trans>
            </div>
            <h4 className="mt-4 mb-2">{t('description')}:</h4>
            <p>{ invitation.getIn(['course', 'crsDescription']) }</p>
          </div>
          <div className="col-sm-12 text-center p-4">
            <Button variant="contained" size="large" onClick={() => { this._accept() }} className='mt-btn mt-btn-success m-2'>
              {t('accept')}
            </Button>
            <Button variant="contained" size="large" onClick={() => { this._decline() }} className='mt-btn mt-btn-danger m-2'>
              {t('decline')}
            </Button>
          </div>
        </div>      
    );
  }

  render () {
    const { isLoggedIn, getRecordRequest, t } = this.props;
    const { authModalOpen } =  this.state;    
    const loading = getRecordRequest.get('loading');
    
    return (
      <div className="ml-3 mr-3">
        <div className="row">
          <div className="col-sm-12 col-md-10 col-lg-8 col-xl-7 m-auto">
            <div className="m-portlet mt-4">
              <div className="m-portlet__body">
                  <div className="p-4">
                      <h1 className="text-center pb-2">{t('demoCourseInvitation')}</h1>
                      {loading ? <div className="text-center m-5"><CircularProgress size={60} /></div> : this._renderInvitation(getRecordRequest.get('record')) }
                  </div>
              </div>
            </div>
          </div>
        </div>
        { !isLoggedIn && <AuthorizeModal isOpen={authModalOpen} onClose={() => { this._closeAuthModal() }}/> }
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

export default withTranslation('translations')(InvitationDetails);