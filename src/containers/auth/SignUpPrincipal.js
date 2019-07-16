import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation, Trans} from 'react-i18next';
import Cropper from "react-cropper";
import {NavLink} from "react-router-dom";
import {Divider} from '@material-ui/core';
import { selectSignUpRequest } from '../../redux/signup/selectors';
import { signUpPrincipal, resetSignUpRequest } from '../../redux/signup/actions';
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import {Loader} from "../../components/ui/Loader";
import {selectRecords} from "../../redux/countries/selectors";
import {getCountries} from "../../redux/countries/actions";

class SignUpPrincipal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {},     
      zoom:0.5
    };
  }

  componentDidMount() {
    const { getCountries } = this.props;
    getCountries();
  }

  _submit () {
    this.props.signUp(
      this.state.form
    );
  };

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

  _handleInputChange(event) {
    const { name, value } = event.target;

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

  _zoom(e){
    this.setState({'zoom':e.target.value});
    this.cropper.zoomTo(e.target.value)
  }

  _renderCountries() {
    const countries = this.props.countries.toJS();

    return countries.map((country, key) => (
      <option value={country.id.toString()} key={key}>{ country.name }</option>
    ))
  }

  render() {
    const { form } = this.state;
    const { t } = this.props;
    const loading = this.props.signUpRequest.get('loading');
    const errors = this.props.signUpRequest.get('errors');    
    return (
      <div>
        {loading && <Loader />}
        <div className="signup-page">
          <div className="m-signup col-sm-12 col-md-10 col-lg-8 col-xl-6 m-auto">
            <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg mt-5 m-portlet--full-height ">
              <div className="m-portlet__head">
                <div className="m-portlet__head-caption">
                  <div className="m-portlet__head-title full-width">
                    <h3 className="m-portlet__head-text ">
                      {t('setupYourPrincipalProfile')}
                    </h3>
                  </div>
                </div>
                <div className="m-portlet__head-tools">
                    <div className="m-portlet__nav-item">
                        <LanguageSwitcher className="m-portlet__nav-item"/>
                    </div>                      
                </div>
              </div>
              <form className="m-portlet__body" onSubmit={(e) => { e.preventDefault(); this._submit(); }}>
                <div className="alert alert-secondary mt-2">
                  <p className="text-center m-0">                
                    <Trans i18nKey="translations:alreadyHaveAccountMessage"><NavLink className='alert-link' to="/login"></NavLink>.</Trans>
                  </p>
                </div>
                <div className="row mt-5">
                  <div className="col-md-6">
                    <legend>{t('personalInformation')}</legend>
                      <div className="m-form__section">
                        <div className="form-group">
                          <div>
                            <input
                              name="firstName"
                              value={form.firstName}
                              onChange={(e) => { this._handleInputChange(e) }}
                              type="text"
                              className="form-control m-input"
                              placeholder={t('firstName')} />
                          </div>
                          {errors && errors.get('firstName') &&
                            <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                        </div>      
                        <div className="form-group">
                          <div>
                            <input
                              name="lastName"
                              value={form.lastName}
                              onChange={(e) => { this._handleInputChange(e) }}
                              type="text"
                              className="form-control m-input"
                              placeholder={t('lastName')}/>
                          </div>
                          {errors && errors.get('lastName') &&
                            <div className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
                        </div>      
                        <div className="form-group">
                          <div>
                            <input
                              name="email"
                              value={form.email}
                              onChange={(e) => { this._handleInputChange(e) }}
                              type="text"
                              className="form-control m-input"
                              placeholder={t('email')}/>
                          </div>
                          {errors && errors.get('email') &&
                            <div className="form-control-feedback text-center error">{errors.get('email').get(0)}</div>}
                        </div>
                        <div className="form-group">
                          <div className="">
                            <input
                              name="username"
                              value={form.username}
                              onChange={(e) => { this._handleInputChange(e) }}
                              type="text"
                              className="form-control m-input"
                              placeholder={t('username')}/>
                          </div>
                          {errors && errors.get('username') &&
                            <div className="form-control-feedback text-center error">{errors.get('username').get(0)}</div>}
                        </div>
                        <div className="form-group">
                          <div className="">
                            <input
                              name="password"
                              value={form.password}
                              onChange={(e) => { this._handleInputChange(e) }}
                              type="password"
                              className="form-control m-input"
                              placeholder={t('password')}/>
                          </div>
                          {errors && errors.get('password') &&
                            <div className="form-control-feedback text-center error">{errors.get('password').get(0)}</div>}
                        </div>
                        <div className="form-group">
                          <div className="">
                            <input
                              name="password_confirmation"
                              value={form.password_confirmation}
                              onChange={(e) => { this._handleInputChange(e) }}
                              type="password"
                              className="form-control m-input"
                              placeholder={t('confirmPassword')}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div className="col-md-6">
                    <legend>{t('schoolInformation')}</legend>
                    <div className="m-form__section">
                      <div className="form-group">
                        <div>
                          <input
                            name="schoolName"
                            value={form.schoolName}
                            onChange={(e) => { this._handleInputChange(e) }}
                            type="text"
                            className="form-control m-input"
                            placeholder={t('schoolName')}/>
                        </div>
                        {errors && errors.get('schoolName') &&
                          <div className="form-control-feedback text-center error">{errors.get('schoolName').get(0)}</div>}
                      </div>
                      <div className="form-group">
                        <div>
                          <input
                            name="schoolCode"
                            value={form.schoolCode}
                            onChange={(e) => { this._handleInputChange(e) }}
                            type="text"
                            className="form-control m-input"
                            placeholder={t('schoolCode')} />
                        </div>
                        {errors && errors.get('schoolCode') &&
                          <div className="form-control-feedback text-center error">{errors.get('schoolCode').get(0)}</div>}
                      </div>
                      <div className="form-group">
                        <div>
                          <select
                            name="schoolCountry"
                            value={form.schoolCountry}
                            onChange={(e) => { this._handleInputChange(e) }}
                            className="form-control m-input">
                            <option>{t('selectCountry')}</option>
                            {this._renderCountries()}
                          </select>
                        </div>
                        {errors && errors.get('schoolCountry') &&
                        <div className="form-control-feedback text-center error">{errors.get('schoolCountry').get(0)}</div>}
                      </div>
                    </div>

                    <div className="CropperBlock">
                      <div className='upload-btn-wrapper '>
                        <span className='btn m-btn--air pointer btn-outline-info'>{t('uploadFile')}</span>
                        <input type='file' name='myfile' onChange={(e) => { this._handleFileChange(e) }}/>
                      </div>
                      <Cropper
                        ref={cropper => { this.cropper = cropper; }}
                        src={form.schoolLogo}
                        dragMode={'move'}
                        background={false}
                        cropBoxMovable={false}
                        cropBoxResizable={true}
                        minCropBoxWidth={250}
                        className='signup-cropper'
                        style={{height: 250, width: 250}}
                        aspectRatio={1 / 1}
                        guides={false}/>
                      {form.schoolLogo &&
                      <div className="text-center m-2">
                        <input type="range" min="0.1" max="1" step="0.05"  value={this.state.zoom}  onChange={ (value)=>this._zoom(value)}></input>
                        <br/>
                        <span
                          className='btn pointer m-2 m-btn--pill m-btn--air btn-success'
                          onClick={() => { this._handleImageCrop() }}
                         >
                          Crop <span className='la la-crop'></span>
                        </span>
                      </div>
                      }
                      <div className='croppedBlock'>
                        {form.schoolLogoCropped &&
                          <img className='img-thumbnail' style={{ width: '150px' }} src={form.schoolLogoCropped} alt={t('schoolProfile')}/>}
                      </div>
                    </div>
                  </div>
                </div>

                <Divider className="mt-4"/>

                <div className="row">
                  <div className="col-sm-12 text-right pt-4">
                    <button
                      type='submit'
                      disabled={loading}                          
                      className='m-btn--air m-2 btn btn-info'>
                      {t('next')}
                    </button>
                  </div>
                </div>
              </form>
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
    countries: selectRecords(state),
  }),
  (dispatch) => ({
    signUp: (form, params = {}) => { dispatch(signUpPrincipal(form, params)) },
    resetSignUpRequest: () => { dispatch(resetSignUpRequest()) },
    getCountries: (params = {}) => { dispatch(getCountries(params)) }
  })
)(SignUpPrincipal);

export default withTranslation('translations')(SignUpPrincipal);

