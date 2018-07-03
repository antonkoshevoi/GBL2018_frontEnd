import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';

class SecondStepForm extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {      
      form: props.form
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
        avatarCropped: this.cropper.getCroppedCanvas().toDataURL()
      }
    }, () => { this.props.onChange(this.state.form); });
  }

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
      <div className='row'>
        <div className='col-lg-7 col-md-6 col-sm-12'>
            <legend className='m--margin-bottom-10'>Required</legend>
            <div className='m-form__section m-form__section--first'>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-md-12 col-sm-12">Username</label>
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <input
                    name='username'
                    value={form.username || ''}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  {errors && errors.get('username') &&
                  <div className="form-control-feedback text-center error">{errors.get('username').get(0)}</div>}
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-md-12 col-sm-12">Password</label>
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <input
                    name='password'
                    value={form.password || ''}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='password'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  {errors && errors.get('password') &&
                  <div className="form-control-feedback text-center error">{errors.get('password').get(0)}</div>}
                </div>
              </div>
            </div>
            
            <legend className='m--margin-bottom-10 m--margin-top-10'>Optional</legend>

            <div className='m-form__section m-form__section--first'>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-md-12 col-sm-12">First Name</label>
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <input
                    name='firstName'
                    value={form.firstName || ''}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  {errors && errors.get('firstName') &&
                  <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-md-12 col-sm-12">Last Name</label>
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <input
                    name='lastName'
                    value={form.lastName || ''}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  {errors && errors.get('lastName') &&
                  <div className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
                </div>
              </div>
           </div>
        </div>
        <div className='col-lg-5 col-md-6 col-sm-12 text-center'>
          <legend className='m--margin-bottom-10'>Profile Pic Upload</legend>

          <div className='CropperBlock text-center'>
            <div className='upload-btn-wrapper '>
              <button className='btn m-btn--air btn-outline-info'>Upload a file</button>
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

            {form.avatarCropped &&
            <button
              type="button"
              className='btn m-btn--air btn-success m--margin-top-15'
              onClick={() => { this._handleImageCrop() }}
            >
              Crop Image <span className='la la-crop'></span>
            </button>}

            <div className='croppedBlock'>
              {form.avatarCropped && <img className='img-thumbnail' style={{ width: '150px' }} src={form.avatarCropped} alt='My Student' />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate('SecondStepForm')(SecondStepForm);