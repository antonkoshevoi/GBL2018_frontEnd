import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import background from '../../media/images/bg-3.jpg';
import logo from '../../media/images/logo.png'
import 'cropperjs/dist/cropper.css';
import Cropper from "react-cropper";
import {NavLink} from "react-router-dom";
import {Divider} from "material-ui";
import { selectSignUpRequest } from '../../redux/signUpPrincipal/selectors';
import { signUp } from '../../redux/signUpPrincipal/actions';
import MetronicProgressButton from '../../components/ui/metronic/MetronicProgressButton';

class SignUpPrincipal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
  }

  _submit () {
    this.props.signUp(
      this.state.form
    );
  };

  /**
   *
   */
  _handleFileChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.setState({
        form: {
          ...this.state.form,
          schoolLogo: reader.result
        }
      });
    };

    reader.readAsDataURL(files[0]);
  }

  /**
   *
   */
  _handleImageCrop() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      form: {
        ...this.state.form,
        schoolLogoCropped: this.cropper.getCroppedCanvas().toDataURL()
      }
    });
  }

  /**
   *
   */
  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  render() {
    const { form } = this.state;
    const loading = this.props.signUpRequest.get('loading');
    const errors = this.props.signUpRequest.get('errors');

    return (
      <div className="">
        <div className="m-grid__item animate fadeInLeftBig m-grid__item--fluid m-grid m-grid--hor  m-login--2 m-login-2--skin-2 m--full-height" id="m_login" style={{backgroundImage: `url(${background})`,minHeight:'100vh'}}>
          <div className="m-grid__item m-grid__item--fluid	m-login__wrapper">
            <div className="m-login__container">
              <div className="m-login__logo  text-center">
                <a href="#">
                  <img src={logo}/>
                </a>
              </div>
              <div className="m-signup col-sm-6 m-auto">
                <div className="m-signup__head">
                  <h3 className="m-login__title">Sign Up</h3>
                </div>
                <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--info m-portlet--bordered-semi m--margin-top-40 m-portlet--full-height ">
                  <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                      <div className="m-portlet__head-title full-width">
                        <h3 className="m-portlet__head-text text-center full-width">
                          SETUP YOUR PRINCIPAL PROFILE
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form className="m-portlet__body" onSubmit={(e) => { e.preventDefault(); this._submit(); }}>
                    <div className="alert m-alert m-alert--default">
                      <p className="text-center"> If you already have an account, <NavLink to="/login"><strong>Login</strong></NavLink> to start your session. Otherwise,</p>
                    </div>

                    <div className="row m--margin-top-40">
                      <div className="col-md-6">
                        <legend>Personal Information</legend>
                          <div className="m-form__section m-form__section--first">
                            <div className="form-group m-form__group">
                              <div>
                                <input
                                  name="firstName"
                                  value={form.firstName}
                                  onChange={(e) => { this._handleInputChange(e) }}
                                  type="text"
                                  className="form-control m-input m-input--air m-input--pill"
                                  placeholder="First Name"/>
                              </div>
                              {errors && errors.get('firstName') &&
                                <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                            </div>
                          </div>
                          <div className="m-form__section m-form__section--first">
                            <div className="form-group m-form__group">
                              <div>
                                <input
                                  name="lastName"
                                  value={form.lastName}
                                  onChange={(e) => { this._handleInputChange(e) }}
                                  type="text"
                                  className="form-control m-input m-input--air m-input--pill"
                                  placeholder="Last Name "/>
                              </div>
                              {errors && errors.get('lastName') &&
                                <div className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
                            </div>
                          </div>
                          <div className="m-form__section m-form__section--first">
                            <div className="form-group m-form__group">
                              <div>
                                <input
                                  name="email"
                                  value={form.email}
                                  onChange={(e) => { this._handleInputChange(e) }}
                                  type="text"
                                  className="form-control m-input m-input--air m-input--pill"
                                  placeholder="Email "/>
                              </div>
                              {errors && errors.get('email') &&
                                <div className="form-control-feedback text-center error">{errors.get('email').get(0)}</div>}
                            </div>
                          </div>
                          <div className="m-form__section m-form__section--first">
                            <div className="form-group m-form__group">
                              <div className="">
                                <input
                                  name="username"
                                  value={form.username}
                                  onChange={(e) => { this._handleInputChange(e) }}
                                  type="text"
                                  className="form-control m-input m-input--air m-input--pill"
                                  placeholder="Username "/>
                              </div>
                              {errors && errors.get('username') &&
                                <div className="form-control-feedback text-center error">{errors.get('username').get(0)}</div>}
                            </div>
                          </div>
                          <div className="m-form__section m-form__section--first">
                            <div className="form-group m-form__group">
                              <div className="">
                                <input
                                  name="password"
                                  value={form.password}
                                  onChange={(e) => { this._handleInputChange(e) }}
                                  type="password"
                                  className="form-control m-input m-input--air m-input--pill"
                                  placeholder="Password "/>
                              </div>
                              {errors && errors.get('password') &&
                                <div className="form-control-feedback text-center error">{errors.get('password').get(0)}</div>}
                            </div>
                          </div>
                          <div className="m-form__section m-form__section--first">
                            <div className="form-group m-form__group">
                              <div className="">
                                <input
                                  name="password_confirmation"
                                  value={form.password_confirmation}
                                  onChange={(e) => { this._handleInputChange(e) }}
                                  type="password"
                                  className="form-control m-input m-input--air m-input--pill"
                                  placeholder="Confirm Password "/>
                              </div>
                            </div>
                          </div>
                        </div>
                      <div className="col-md-6">
                        <legend>School Information</legend>
                        <div className="m-form__section m-form__section--first">
                          <div className="form-group m-form__group">
                            <div>
                              <input
                                name="schoolName"
                                value={form.schoolName}
                                onChange={(e) => { this._handleInputChange(e) }}
                                type="text"
                                className="form-control m-input m-input--air m-input--pill"
                                placeholder="School Name"/>
                            </div>
                            {errors && errors.get('schoolName') &&
                              <div className="form-control-feedback text-center error">{errors.get('schoolName').get(0)}</div>}
                          </div>
                          <div className="form-group m-form__group">
                            <div>
                              <input
                                name="schoolCode"
                                value={form.schoolCode}
                                onChange={(e) => { this._handleInputChange(e) }}
                                type="text"
                                className="form-control m-input m-input--air m-input--pill"
                                placeholder="School Code"/>
                            </div>
                            {errors && errors.get('schoolCode') &&
                              <div className="form-control-feedback text-center error">{errors.get('schoolCode').get(0)}</div>}
                          </div>
                        </div>

                        <div className="CropperBlock">
                          {form.schoolLogo &&
                            <button
                              type='button'
                              className='btn m-btn--air btn-success'
                              onClick={() => { this._handleImageCrop() }}
                              style={{float: 'right'}}>
                              Crop Image <span className='la la-crop'></span>
                            </button>}
                          <div className='upload-btn-wrapper '>
                            <button className='btn m-btn--air btn-outline-info'>Upload a file</button>
                            <input type='file' name='myfile' onChange={(e) => { this._handleFileChange(e) }}/>
                          </div>

                          <Cropper
                            ref={cropper => { this.cropper = cropper; }}
                            src={form.schoolLogo}
                            className='signup-cropper'
                            style={{height: 250, width: 250}}
                            aspectRatio={1 / 1}
                            guides={false}/>

                          <div className='croppedBlock'>
                            {form.schoolLogoCropped &&
                              <img className='img-thumbnail' style={{ width: '150px' }} src={form.schoolLogoCropped} alt='cropped image'/>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Divider className="m--margin-top-25"/>

                    <div className="row">
                      <div className="col-sm-12 text-right m--padding-top-20">
                        <MetronicProgressButton
                          type='submit'
                          disabled={loading}
                          loading={loading}
                          className='m-btn m-btn--air m--margin-5 btn btn-info'>
                          NEXT
                        </MetronicProgressButton>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPrincipal = connect(
  (state) => ({
    signUpRequest: selectSignUpRequest(state),
  }),
  (dispatch) => ({
    signUp: (form, params = {}) => { dispatch(signUp(form, params)) },
  })
)(SignUpPrincipal);

export default translate('SignUpPrincipal')(SignUpPrincipal);

