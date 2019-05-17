import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {selectChangePasswordRequest, selectChangeImageRequest} from "../../../redux/user/selectors";
import {changePassword, changeImage, resetChangePasswordRequest} from "../../../redux/user/actions";
import { Dialog, CircularProgress, Divider} from '@material-ui/core';
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
      passwordFields: {},
      uploadModal:false,
      passwordModal:false,
      croppedImage:null,
      image:null
    }
  }

  componentWillReceiveProps(nextProps) {
    this._passwordChangedSuccess(nextProps);
    this._imageChangedSuccess(nextProps);
  }

  _passwordChangedSuccess(nextProps) {
    const prev = this.props.changePasswordRequest.get('success');
    const next = nextProps.changePasswordRequest.get('success');

    if (!prev && next) {
      this.setState({
        ...this.state,        
        passwordFields: {},
      });
    }
  }
  
  _imageChangedSuccess(nextProps) {
    const prev = this.props.changeImageRequest.get('success');
    const next = nextProps.changeImageRequest.get('success');

    if (!prev && next) {        
        this.props.user.avatar = this.state.croppedImage;
    }
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

  _openPasswordModal(){
    this.setState({passwordModal:true})
  }

  _closePasswordModal(){
    this.props.resetChangePasswordRequest();
    this.setState({passwordModal:false})
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
    const { user, changePasswordRequest, changeImageRequest, t } = this.props;
    const { passwordFields } = this.state;
    const errors = changePasswordRequest.get('errors');    

    return (
      <div className="m-portlet m--margin-bottom-15">
        <div className="m-portlet__body">
          <div className="m-card-profile">
            <div className="m-card-profile__details">
              <span className="m-card-profile__name">{user.name}</span>
              <span className="m-card-profile__email">{user.username}</span>
            </div>
            <div className="m-card-profile__pic">
              <div className="m-card-profile__pic-wrapper">
                <img src={user.avatar} alt=""/>
              </div>
              <div className="text-center">
                {changeImageRequest.get('loading') ? (<CircularProgress color="primary"/>) : (<button className="m-btn btn btn-info m--margin-bottom-10" onClick={()=>{this._openUploadModal()}}>{t('uploadAvatar')}</button>)}
                <HasRole roles={['Superadministrator','School','Teacher','Parents']}>
                <Divider className="m--margin-top-10 m--margin-bottom-20" />
                <button onClick={() => { this._openPasswordModal(true) }} className="m-btn btn btn-success m--margin-bottom-10">{t('changePassword')}</button>
                </HasRole>
              </div>
            </div>
          </div>
        </div>
          
        <Dialog
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.passwordModal}
              onClose={() => this._closePasswordModal()}
              PaperProps={{className: "margin-0"}}
              maxWidth="xs"
            >
            <Card title={t('changePassword')} icon="fa fa-exclamation-triangle" style={{minWidth:'280px'}}>               
                <div style={{minWidth: 250}} className="m--margin-top-20">
                  <div className="form-group m-form__group">
                    <input
                      type="password"
                      placeholder={t('enterOldPassword')}
                      name="oldPassword"
                      onChange={(e) => {this._handlePasswordFieldChange(e.target.value, 'oldPassword')}}
                      value={passwordFields.oldPassword || ''}
                      className="form-control  m-input--air form-control-danger m-input" />
                    {errors && errors.get('oldPassword') && <div className="form-control-feedback text-center error">{errors.get('oldPassword').get(0)}</div>}
                  </div>
                  <div className="form-group m-form__group">
                    <input
                      type="password"
                      placeholder={t('enterNewPassword')}
                      name="newPassword"
                      onChange={(e) => {this._handlePasswordFieldChange(e.target.value, 'newPassword')}}
                      value={passwordFields.newPassword || ''}
                      className="form-control  m-input--air form-control-danger m-input" />
                    {errors && errors.get('newPassword') && <div className="form-control-feedback text-center error">{errors.get('newPassword').get(0)}</div>}
                  </div>
                  <div className="form-group m-form__group has-danger">
                    <input
                      type="password"
                      placeholder={t('confirmPassword')}
                      name="newPassword_confirmation"
                      onChange={(e) => {this._handlePasswordFieldChange(e.target.value, 'newPassword_confirmation')}}
                      value={passwordFields.newPassword_confirmation || ''}
                      className="form-control  m-input--air form-control-danger m-input" />
                    {errors && errors.get('newPassword_confirmation') && <div className="form-control-feedback text-center error">{errors.get('newPassword_confirmation').get(0)}</div>}
                  </div>
                  <div className="form-group text-right m--margin-top-20">
                    <button onClick={(e) => { this._changePassword(e) }} className="m-btn btn btn-success m--margin-right-10 ">
                        {t('change')}
                    </button>
                    <button onClick={() => {this._closePasswordModal()}} className="m-btn btn btn-default">
                        {t('cancel')}
                    </button>
                  </div>
                </div>                                   
            </Card>            
        </Dialog>
        
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.uploadModal}          
          PaperProps={{className: "margin-0"}}
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
    changePasswordRequest: selectChangePasswordRequest(state),
    changeImageRequest: selectChangeImageRequest(state)    
  }),
  (dispatch) => ({
    changePassword: (fields, params = {}) => { dispatch(changePassword(fields, params)) },
    resetChangePasswordRequest: () => { dispatch(resetChangePasswordRequest()) },
    changeImage: (fields, params = {}) => { dispatch(changeImage(fields, params)) }    
  })
)(Info);

export default withTranslation('translations')(Info);
