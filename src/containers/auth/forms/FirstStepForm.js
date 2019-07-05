import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
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
          tmpAvatar: reader.result          
        }
      }, () => { this.props.onChange(this.state.form); });           
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
        avatarCropped: this.cropper.getCroppedCanvas({width: 250, height: 250}).toDataURL()
      }
    }, () => { this.props.onChange(this.state.form); });
  }

  _zoom(e) {          
    this.setState({'zoom':e.target.value});
    this.cropper.zoomTo(e.target.value)
  }

  _handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({      
      form: {
        ...this.state.form,
        [name]: value
      }
    }, () => { this.props.onChange(this.state.form); });
  }

  render() {
    const { form } = this.state;
    const { errors, t } = this.props;

    return (
      <div className='row'>
        <div className='col-lg-7 col-md-6 col-sm-12'>          
            <legend className='mb-3'>{t('required')}</legend>
            <div className='m-form__section'>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('email')} </label>
                <div className="col-lg-8 col-md-12 col-sm-12">
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
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('password')} </label>
                <div className="col-lg-8 col-md-12 col-sm-12">
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
            <legend className='mb-3 mt-3'>{t('optional')}</legend>

            <div className='m-form__section'>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('firstName')}</label>
                <div className="col-lg-8 col-md-12 col-sm-12">
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
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('lastName')} </label>
                <div className="col-lg-8 col-md-12 col-sm-12">
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
        </div>

        <div className='col-lg-5 col-md-6 col-sm-12'>
          <div className='row text-center'>
            <legend className='mb-3'>{t('profilePicUpload')}</legend>
            <div className='col-sm-12'>
              <div className='CropperBlock'>
                <div className='upload-btn-wrapper '>
                  <span className='btn pointer m-btn--air btn-outline-info'>{t('uploadFile')}</span>
                  <input type='file' name='myfile' onChange={(e) => { this._handleFileChange(e) }}/>
                </div>

                <Cropper
                  ref={cropper => { this.cropper = cropper; }}
                  ready={() => { if (!form.avatarCropped) this._handleImageCrop(); }}
                  dragMode={'move'}
                  src={form.tmpAvatar}
                  background={false}
                  autoCrop={true}
                  cropBoxMovable={false}
                  cropBoxResizable={true}
                  minCropBoxWidth={250}
                  className='signup-cropper'
                  style={{height: 250, width: 250}}
                  aspectRatio={1 / 1}
                  viewMode="3"
                  guides={false}/>
              </div>
            </div>

            <div className='col-sm-12'>
                {form.avatarCropped &&
                  <div className="text-center m-2">
                      <input type="range" min="0.1" max="1" step="0.05"  value={this.state.zoom}  onChange={ (value) => this._zoom(value)}></input>
                      <br/>                    
                      <button
                          type="button"
                          className='btn m-btn--air btn-success mt-3'
                          onClick={() => { this._handleImageCrop() }}
                          >
                          {t('cropImage')} <span className='la la-crop'></span>
                      </button>
                      <div className='croppedBlock'>              
                          <img className='img-thumbnail' style={{width: '150px' }} src={form.avatarCropped} alt='My Student' />
                      </div>
                  </div>}
            </div>
          </div>
        </div>
        <div className="container">
        </div>
      </div>
    );
  }
}

export default withTranslation('translations')(FirstStepForm);