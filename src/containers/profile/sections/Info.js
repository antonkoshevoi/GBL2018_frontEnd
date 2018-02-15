import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {selectChangePasswordRequest, selectUpdateRequest} from "../../../redux/user/selectors";
import {changePassword, update} from "../../../redux/user/actions";
import { Dialog, Modal} from "material-ui";
import ImageCropper from "../../../components/ui/ImageCropper";
import Card from "../../../components/ui/Card";

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

  _onSubmit (croppedImg,img) {
    const { user } = this.props;
    this.props.update(
      {
        ...user,
        avatar:img,
        avatarCropped:croppedImg
      }
    );
  };

  render() {
    const { user } = this.props;
    const { changePasswordMode, passwordFields } = this.state;
    const errors = this.props.getChangePasswordRequest.get('errors');

    return (
      <div className="m-portlet ">
        <div className="m-portlet__body">
          <div className="m-card-profile">
            <div className="m-card-profile__title m--hide">
              Your Profile
            </div>
            <div className="m-card-profile__pic">
              <div className="m-card-profile__pic-wrapper">
                <img src={user.avatar} alt=""/>
              </div>
              <div className="text-center m--margin-bottom-20">
                <button className="m-btn btn btn-info m-btn--pill" onClick={()=>{this._openUploadModal()}}>Upload Avatar</button>
              </div>
            </div>

            <div className="m-card-profile__details">
              <span className="m-card-profile__name">{user.firstName} {user.lastName}</span>
              <a href="" className="m-card-profile__email m-link">{user.username}</a>
            </div>
          </div>

          <div className="m-portlet__body-separator"></div>
          <div className="text-center m--margin-top-15">
            {!changePasswordMode && <button onClick={() => {
              this._handlePasswordModeSwitch(true)
            }} className="m-btn btn m-btn--outline-2x btn-outline-success">Change Password</button>}
          </div>
          {changePasswordMode &&
            <div className="m-widget1 m-widget1--paddingless">
              <form id='change-password-form' onSubmit={(e) => { this._changePassword(e) }}>
                <div className="m-widget1__item">
                  <div className="form-group m-form__group ">
                    <input
                      type="password"
                      placeholder="Enter Old Password"
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
                      placeholder="Enter New Password"
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
                      placeholder="Confirm Password"
                      name="newPassword_confirmation"
                      onChange={(e) => {this._handlePasswordFieldChange(e.target.value, 'newPassword_confirmation')}}
                      value={passwordFields.newPassword_confirmation || ''}
                      className="form-control  m-input--air form-control-danger m-input"
                      id="confirmPassword"/>
                    {errors && errors.get('newPassword_confirmation') && <div className="form-control-feedback text-center error">{errors.get('newPassword_confirmation').get(0)}</div>}
                  </div>
                </div>
                <div className="text-center m--margin-top-15">
                    <button onClick={() => {this._handlePasswordModeSwitch(false)}} className="m-btn btn m-btn--air m-btn--outline-2x m--margin-right-10 btn-outline-danger">
                        Cancel
                    </button>
                    <button className="m-btn btn m-btn--outline-2x btn-outline-success">
                        Change
                    </button>
                </div>
              </form>
            </div>}
          </div>

        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.uploadModal}
          onClose={() => this._closeUploadModal()}
        >
         <Card title="Upload Avatar" icon="fa fa-upload" style={{minWidth:'280px'}}>
            <ImageCropper saveButton circularButton onSubmit={(cropImg,img) => this._onSubmit(cropImg,img)} onCrop={(cropImg) => this._setCroppedImage(cropImg)} setFile={(img) => this._setImage(img)}/>
         </Card>
        </Dialog>
      </div>
    );
  }
}

Info = connect(
  (state) => ({
    getChangePasswordRequest: selectChangePasswordRequest(state),
    getUpdateRequest: selectUpdateRequest(state),
  }),
  (dispatch) => ({
    changePassword: (fields, params = {}) => { dispatch(changePassword(fields, params)) },
    update: (form, params = {}) => { dispatch(update(form, params)) },
  })
)(Info);

export default Info;
