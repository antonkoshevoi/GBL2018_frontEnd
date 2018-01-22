import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { MenuItem, Select } from 'material-ui';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import MetronicDatePicker from '../ui/metronic/MetronicDatePicker';
import MetronicSelect from "../ui/metronic/MetronicSelect";

class SecondStepForm extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirthObj: undefined,
      form: props.form
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
        <div className='col-md-6'>
          <div className='col-xs-12'>
            <legend className='m--margin-bottom-10'>Required</legend>

            <div className='m-form__section m-form__section--first'>
              <div className='form-group m-form__group'>
                <div>
                  <input
                    name='username'
                    value={form.username || ''}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air m-input--pill'
                    placeholder='Username *'/>
                </div>
                {errors && errors.get('username') &&
                  <div className="form-control-feedback text-center error">{errors.get('username').get(0)}</div>}
              </div>
            </div>
            <div className='m-form__section m-form__section--first'>
              <div className='form-group m-form__group'>
                <div>
                  <input
                    name='password'
                    value={form.password || ''}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='password'
                    className='form-control m-input m-input--air m-input--pill'
                    placeholder='Password *'/>
                </div>
                {errors && errors.get('password') &&
                  <div className="form-control-feedback text-center error">{errors.get('password').get(0)}</div>}
              </div>
            </div>
          </div>

          <div className='m-separator m-separator--dashed m-separator--lg'></div>

          <div className='col-xs-12'>
            <legend className='m--margin-bottom-10'>Optional</legend>
            <address className='m-form__section m-form__section--first'>
              <div className='form-group m-form__group'>
                <div>
                  <input
                    name='firstName'
                    value={form.firstName || ''}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air m-input--pill'
                    placeholder='First Name'/>
                </div>
                {errors && errors.get('firstName') &&
                  <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
              </div>
              <div className='form-group m-form__group'>
                <div>
                  <input
                    name='lastName'
                    value={form.lastName || ''}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air m-input--pill'
                    placeholder='Last Name'/>
                </div>
                {errors && errors.get('lastName') &&
                  <div className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
              </div>
              <div className='form-group m-form__group picker'>
                <MetronicDatePicker
                  placeholder='Birthday'
                  value={form.dateOfBirth || null}
                  onChange={(e) => { this._handleDateChange(e) }}/>
                {errors && errors.get('dateOfBirth') &&
                  <div className="form-control-feedback text-center error">{errors.get('dateOfBirth').get(0)}</div>}
              </div>
              <div className='form-group m-form__group'>
                <div>
                  <MetronicSelect
                    name='gender'
                    placeholder='Gender'
                    value={form.gender || 'male'}
                    onChange={(e) => { this._handleInputChange(e) }}>
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                  </MetronicSelect>
                </div>
                {errors && errors.get('gender') &&
                  <div className="form-control-feedback text-center error">{errors.get('gender').get(0)}</div>}
              </div>
            </address>
          </div>
        </div>
        <div className='col-md-6'>
          <legend className='m--margin-bottom-10'>Profile Pic Upload</legend>

          <div className='CropperBlock'>
            {form.avatar &&
              <button
                type="'"
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
              src={form.avatar}
              className='signup-cropper'
              style={{height: 250, width: 250}}
              aspectRatio={1 / 1}
              guides={false}/>

            <div className='croppedBlock'>
              {form.avatarCropped &&
                <img className='img-thumbnail' style={{ width: '150px' }} src={form.avatarCropped} alt='cropped image'/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate('SecondStepForm')(SecondStepForm);
