import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';

class FirstStepForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      form: props.form,
      zoom:0.5
    };
  }

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
          avatar: reader.result
        }
      }, () => { this.props.onChange(this.state.form); });
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
        avatarCropped: this.cropper.getCroppedCanvas().toDataURL()
      }
    }, () => { this.props.onChange(this.state.form); });
  }

  _rotateImage(angle = 0){
    this.cropper.rotate(++angle)
  }

  _zoomIn(){
    this.cropper.zoom(0.1)
  }
  

  _zoomOut() {
    this.cropper.zoom(-0.1)
  }

  _zoom(e){
    this.setState({'zoom':e.target.value});
    this.cropper.zoomTo(e.target.value)
  }

  _reverseImage(scale) {
    if (scale === 'vertical') {
      if (this.cropper.cropper.imageData.scaleY == 1) {
        this.cropper.scaleY(-1)
      } else {
        this.cropper.scaleY(1)
      }

    } else {
      if (this.cropper.cropper.imageData.scaleX == 1) {
        this.cropper.scaleX(-1)
      } else {
        this.cropper.scaleX(1)
      }
    }
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
    }, () => { this.props.onChange(this.state.form); });
  }

  render() {
    const { form } = this.state;
    const { errors } = this.props;

    return (
      <div className='row m--margin-top-40'>
        <div className='col-md-7'>
          <div className='col-xs-12'>
            <legend className='m--margin-bottom-10'>Required</legend>
            <div className='m-form__section m-form__section--first'>
             <div className="form-group m-form__group row">
				<label className="col-form-label col-lg-3 col-sm-12">First Name </label>
				<div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    value={form.firstName || ''}
                    name='firstName'
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  <div className='form-control-feedback'>
                      {errors && errors.get('firstName') &&
                      <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='m-form__section m-form__section--first'>
              <div className="form-group m-form__group row">
				<label className="col-form-label col-lg-3 col-sm-12">Last Name </label>
				<div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    value={form.lastName || ''}
                    name='lastName'
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  <div className='form-control-feedback'>
                      {errors && errors.get('lastName') &&
                      <div className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='m-form__section m-form__section--first'>
             <div className="form-group m-form__group row">
				<label className="col-form-label col-lg-3 col-sm-12">Email </label>
				<div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    value={form.email || ''}
                    name='email'
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='email'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  <div className='form-control-feedback'>
                      {errors && errors.get('email') &&
                      <div className="form-control-feedback text-center error">{errors.get('email').get(0)}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='m-form__section m-form__section--first'>
            <div className="form-group m-form__group row">
				<label className="col-form-label col-lg-3 col-sm-12">Username </label>
				<div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    value={form.username || ''}
                    name='username'
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air '
                    />
                  <div className='form-control-feedback'>
                      {errors && errors.get('username') &&
                      <div className="form-control-feedback  text-center error">{errors.get('username').get(0)}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='m-form__section m-form__section--first'>
            <div className="form-group m-form__group row">
				<label className="col-form-label col-lg-3 col-sm-12">Password </label>
				<div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    value={form.password || ''}
                    name='password'
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='password'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  <div className='form-control-feedback'>
                      {errors && errors.get('password') &&
                      <div className="form-control-feedback text-center error">{errors.get('password').get(0)}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='m-separator m-separator--dashed m-separator--lg'></div>
          <div className='col-sm-12'>
            <div className='col-xs-12'>
              <legend className='m--margin-bottom-10'>Billing / Shipping Information (optional)</legend>
              <address className='m-form__section m-form__section--first signUpOptional'>
               <div className="form-group m-form__group row">
				<label className="col-form-label col-lg-3 col-sm-12">Address Line 1</label>
				<div className="col-lg-8 col-md-9 col-sm-12">
                    <input
                        value={form.addressLine1 || ''}
                        name='addressLine1'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input m-input--air '
                      />
                    <div className='form-control-feedback'>
                        {errors && errors.get('addressLine1') &&
                        <div className="form-control-feedback text-center error">{errors.get('addressLine1').get(0)}</div>}
                    </div>
                  </div>
                </div>
            <div className="form-group m-form__group row">
				<label className="col-form-label col-lg-3 col-sm-12">Address Line 2</label>
				<div className="col-lg-8 col-md-9 col-sm-12">
                    <input
                        value={form.addressLine2 || ''}
                        name='addressLine2'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input m-input--air '
                        placeholder=''/>
                    <div className='form-control-feedback'>
                        {errors && errors.get('addressLine2') &&
                        <div className="form-control-feedback text-center error">{errors.get('addressLine2').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-sm-12">City</label>
                  <div className="col-lg-8 col-md-9 col-sm-12">
                    <input
                        value={form.city || ''}
                        name='city'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input m-input--air '
                        placeholder=''/>
                    <div className='form-control-feedback'>
                        {errors && errors.get('city') &&
                        <div className="form-control-feedback text-center error">{errors.get('city').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-sm-12">State or Province</label>
                  <div className="col-lg-8 col-md-9 col-sm-12">
                    <input
                        value={form.region || ''}
                        name='region'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input m-input--air '
                        placeholder=''/>
                    <div className='form-control-feedback'>
                        {errors && errors.get('region') &&
                        <div className="form-control-feedback text-center error">{errors.get('region').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-sm-12">Postal or Zip Code</label>
                  <div className="col-lg-8 col-md-9 col-sm-12">
                    <input
                      value={form.zip || ''}
                      name='country'
                      onChange={(e) => { this._handleInputChange(e) }}
                      type='text'
                      className='form-control m-input m-input--air '
                      placeholder=''/>
                    <div className='form-control-feedback'>
                      {errors && errors.get('zip') &&
                      <div className="form-control-feedback text-center error">{errors.get('zip').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-sm-12">Country</label>
                  <div className="col-lg-8 col-md-9 col-sm-12">
                    <input
                        value={form.country || ''}
                        name='country'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input m-input--air '
                        placeholder=''/>
                    <div className='form-control-feedback'>
                        {errors && errors.get('country') &&
                        <div className="form-control-feedback text-center error">{errors.get('country').get(0)}</div>}
                    </div>
                  </div>
                </div>
              <div className="form-group m-form__group row">
				<label className="col-form-label col-lg-3 col-sm-12">Telephone</label>
				<div className="col-lg-8 col-md-9 col-sm-12">
                    <input
                        value={form.phoneNumber || ''}
                        name='phoneNumber'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input m-input--air '
                        placeholder=''/>
                    <div className='form-control-feedback'>
                        {errors && errors.get('phoneNumber') &&
                        <div className="form-control-feedback text-center error">{errors.get('phoneNumber').get(0)}</div>}
                    </div>
                  </div>
                </div>
              </address>
            </div>
          </div>
        </div>

        <div className='col-sm-5'>
          <div className='row text-center'>
            <legend className='m--margin-bottom-10'>Profile Pic Upload</legend>

            <div className='col-sm-12'>
              <div className='CropperBlock'>
                <div className='upload-btn-wrapper '>
                  <span className='btn pointer m-btn--air btn-outline-info'>Upload a file</span>
                  <input type='file' name='myfile' onChange={(e) => { this._handleFileChange(e) }}/>
                </div>

                <Cropper
                    ref={cropper => { this.cropper = cropper; }}
                    dragMode={'move'}
                    src={form.avatar}
                    background={false}
                    cropBoxMovable={false}
                    cropBoxResizable={true}
                    minCropBoxWidth={250}
                    className='signup-cropper'
                    style={{height: 250, width: 250}}
                    aspectRatio={1 / 1}
                    guides={false}/>
              </div>
            </div>

            <div className='col-sm-12'>
              {form.avatar &&

              <div className="text-center m--margin-10">
                <input type="range" min="0.1" max="1" step="0.05"  value={this.state.zoom}  onChange={ (value)=>this._zoom(value)}></input>
                <br/>
                <span

                  className='btn pointer m-btn m--margin-5 m-btn--pill m-btn--air btn-success'
                  onClick={() => { this._handleImageCrop() }}
                >
                  Crop <span className='la la-crop'></span>
                </span>
              </div>
              }

                {form.avatarCropped &&
              <div className='croppedBlock'>
                  <img className='img-thumbnail' style={{ width: '150px' }} src={form.avatarCropped} alt='cropped image'/>
              </div>}
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default translate('FirstStepForm')(FirstStepForm);
