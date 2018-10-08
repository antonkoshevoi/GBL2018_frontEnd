import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {selectChangePasswordRequest, selectChangeImageRequest} from "../../../redux/user/selectors";
import {changePassword, changeImage} from "../../../redux/user/actions";
import { Dialog, CircularProgress} from '@material-ui/core';
import ImageCropper from "../../../components/ui/ImageCropper";
import Card from "../../../components/ui/Card";
import HasRole from "../../middlewares/HasRole";

class Info extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      changePasswordMode: false,
      passwordFields: {},
      uploadModal:false,
      croppedImage:null,
      image:null
    }
  }

  componentWillReceiveProps(nextProps) {
    this._passwordChangedSuccess(nextProps);
    this._imageChangedSuccess(nextProps);
  }

  _passwordChangedSuccess(nextProps) {
    const prev = this.props.getChangePasswordRequest.get('success');
    const next = nextProps.getChangePasswordRequest.get('success');

    if (!prev && next) {
      this.setState({
        ...this.state,
        changePasswordMode: false,
        passwordFields: {},
      });
    }
  }
  
  _imageChangedSuccess(nextProps) {
    const prev = this.props.getChangeImageRequest.get('success');
    const next = nextProps.getChangeImageRequest.get('success');

    if (!prev && next) {        
        this.props.user.avatar = this.state.croppedImage;
    }
  }
  
  _handlePasswordModeSwitch(changePasswordMode) {
    this.setState({ changePasswordMode });
  }

  _handlePasswordFieldChange(value, field) {
    this.setState({
      passwordFields: {
        ...this.state.passwordFields,
        [field]: value
      }
    });
  }

  _changePassword(e) {
    e.preventDefault();
    this.props.changePassword(
      this.state.passwordFields
    );
  }
  
  _changeImage(img) {    
    this._setImage(img);
    this.props.changeImage({
      avatarCropped: img
    });
  }  

  _openUploadModal(){
    this.setState({uploadModal:true})
  }

  _closeUploadModal(){
    this.setState({uploadModal:false})
  }

  _setCroppedImage(img){
    this.setState({croppedImage:img});
    this._closeUploadModal();
  }

  _setImage(img){
    this.setState({avatarCropped:img});
    this._closeUploadModal();
  }

  render() {
    const { user, t } = this.props;
    const { changePasswordMode, passwordFields } = this.state;
    const errors = this.props.getChangePasswordRequest.get('errors');
    const loading = this.props.getChangeImageRequest.get('loading');

    return (
      <div className="m-portlet ">
        <div className="m-portlet__body">
          <div className="m-card-profile">
            <div className="m-card-profile__title m--hide">
              {t('yourProfile')}
            </div>
            <div className="m-card-profile__details">
              <span className="m-card-profile__name">{user.firstName} {user.lastName}</span>
              <span className="m-card-profile__email">{user.username}</span>
            </div>
            <div className="m-card-profile__pic">
              <div className="m-card-profile__pic-wrapper">
                <img src={user.avatar} alt=""/>
              </div>
              <div className="text-center">
                {loading ? (<CircularProgress color="primary"/>) : (<button disabled={loading} className="m-btn btn btn-info m--margin-10" onClick={()=>{this._openUploadModal()}}>{t('uploadAvatar')}</button>)}
              </div>
            </div>
          </div>
            <HasRole roles={['Superadministrator','Superintendent','Principal','Administrator','Teacher','Parents']}>
            <div>
              <div className="m-portlet__body-separator"></div>
              <div className="text-center m--margin-top-15">
                {!changePasswordMode && <button onClick={() => {
                  this._handlePasswordModeSwitch(true)
                }} className="m-btn btn btn-success">{t('changePassword')}</button>}
              </div>
              {changePasswordMode &&
                <div className="m-widget1 m-widget1--paddingless">
                  <h5 className='text-center'>{t('changePassword')}</h5>
                  <form id='change-password-form' onSubmit={(e) => { this._changePassword(e) }}>
                    <div className="m-widget1__item">
                      <div className="form-group m-form__group ">
                        <input
                          type="password"
                          placeholder={t('enterOldPassword')}
                          name="oldPassword"
                          onChange={(e) => {this._handlePasswordFieldChange(e.target.value, 'oldPassword')}}
                          value={passwordFields.oldPassword || ''}
                          className="form-control  m-input--air form-control-danger m-input"
                          id="oldPassword"/>
                        {errors && errors.get('oldPassword') && <div className="form-control-feedback text-center error">{errors.get('oldPassword').get(0)}</div>}
                      </div>
                      <div className="form-group m-form__group">
                        <input
                          type="password"
                          placeholder={t('enterNewPassword')}
                          name="newPassword"
                          onChange={(e) => {this._handlePasswordFieldChange(e.target.value, 'newPassword')}}
                          value={passwordFields.newPassword || ''}
                          className="form-control  m-input--air form-control-danger m-input"
                          id="newPassword"/>
                        {errors && errors.get('newPassword') && <div className="form-control-feedback text-center error">{errors.get('newPassword').get(0)}</div>}
                      </div>
                      <div className="form-group m-form__group has-danger">
                        <input
                          type="password"
                          placeholder={t('confirmPassword')}
                          name="newPassword_confirmation"
                          onChange={(e) => {this._handlePasswordFieldChange(e.target.value, 'newPassword_confirmation')}}
                          value={passwordFields.newPassword_confirmation || ''}
                          className="form-control  m-input--air form-control-danger m-input"
                          id="confirmPassword"/>
                        {errors && errors.get('newPassword_confirmation') && <div className="form-control-feedback text-center error">{errors.get('newPassword_confirmation').get(0)}</div>}
                      </div>
                    </div>
                    <div className="text-center m--margin-top-15">
                        <button className="m-btn btn btn-success m--margin-right-10 ">
                            {t('change')}
                        </button>
                        <button onClick={() => {this._handlePasswordModeSwitch(false)}} className="m-btn btn btn-default">
                            {t('cancel')}
                        </button>
                    </div>
                  </form>
                </div>}
              </div>
            </HasRole>
          </div>
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.uploadModal}
          onClose={() => this._closeUploadModal()}
        >
         <Card title={t('uploadAvatar')} icon="fa fa-upload" style={{minWidth:'280px'}}>
            <ImageCropper saveButton={true} circularButton onSubmit={(cropImg) => this._changeImage(cropImg)} onCrop={(cropImg) => this._setCroppedImage(cropImg)} setFile={(img) => this._setImage(img)}/>
         </Card>
        </Dialog>
      </div>
    );
  }
}

Info = connect(
  (state) => ({
    getChangePasswordRequest: selectChangePasswordRequest(state),
    getChangeImageRequest: selectChangeImageRequest(state)    
  }),
  (dispatch) => ({
    changePassword: (fields, params = {}) => { dispatch(changePassword(fields, params)) },
    changeImage: (fields, params = {}) => { dispatch(changeImage(fields, params)) }    
  })
)(Info);

export default translate('translations')(Info);
