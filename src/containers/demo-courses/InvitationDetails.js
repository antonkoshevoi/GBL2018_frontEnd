import React, { Component } from 'react';
import MainLayout from '../layouts/MainLayout';
import { connect } from 'react-redux';
import { translate, Interpolate } from 'react-i18next';
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

  _renderInvitation () {
    const { getRecordRequest, t } =  this.props;
    const loading = getRecordRequest.get('loading');
    const record = getRecordRequest.get('record');
    const image = record.getIn(['course', 'image']);    
    const description = record.getIn(['course', 'crsDescription']);

    if (record.get('isExpired')) {
      return (
        <div>
          <h3>{t('demoCourseInvitation')}</h3>
          <h2 className="m--margin-top-100 m--margin-bottom-100">{t('invitationExpired')}</h2>
        </div>
      );
    }
    
    if (record.get('isAccepted')) {
      return (
        <div>
          <h3>{t('demoCourseInvitation')}</h3>
          <h2 className="m--margin-top-100 m--margin-bottom-100">{t('invitationAccepted')}</h2>
        </div>
      );
    }

    if (record.get('isDeclined')) {
      return (
        <div>
          <h3>{t('demoCourseInvitation')}</h3>
          <h2 className="m--margin-top-100 m--margin-bottom-100">{t('invitationDeclined')}</h2>
        </div>
      );
    }
    
    const sender = <h4>{record.getIn(['sender', 'name'])}</h4>;
    const course = <h2>{record.getIn(['course', 'crsTitle'])}</h2>;

    return loading ? (
      <h2 className='text-center'><CircularProgress color='accent'/></h2>
    ) : (
      <div>
        <h3>{t('demoCourseInvitation')}</h3>

        <div className="row">
          {image && (
            <div className="col-sm-3 text-center m--padding-20">
              <img src={image} alt="Demo Course" />
            </div>
          )}
          <div className={`m--padding-20 col-sm-${image ? 9 : 12}`}>            
            <p>
                <Interpolate i18nKey="userInvitedYouToDemoCourse" sender={sender} course={course} />
            </p>            
            <br/>
            <h4>{t('description')}:</h4>
            <p>{ description }</p>
          </div>

          <div className="col-sm-12 text-center m--padding-20">
            <Button contained onClick={() => { this._accept() }} className='mt-btn mt-btn-success m--margin-left-30 m--margin-right-30'>
              {t('accept')}
            </Button>
            <Button contained onClick={() => { this._decline() }} className='mt-btn mt-btn-danger m--margin-left-30 m--margin-right-30'>
              {t('decline')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  _renderWrapperBox () {

    return (
      <div className="row">
        <div className="col-md-10 col-lg-8 col-xl-6 m-auto">
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

export default translate('translations')(InvitationDetails);