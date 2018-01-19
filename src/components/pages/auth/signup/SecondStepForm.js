import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { MenuItem, Select } from 'material-ui';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import DatePicker from '../../../ui/DatePicker';
import MetronicInput from '../../../ui/metronic/MetronicInput';
import MetronicDatePicker from '../../../ui/metronic/MetronicDatePicker';

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
          imageSrc: reader.result
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
        cropResult: this.cropper.getCroppedCanvas().toDataURL()
      }
    });
  }

  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    }, () => {
      this.props.onChange(
        this.state.form
      );
    });
  }

  _handleDateChange(m) {
    this.setState({
      form: {
        ...this.state.form,
        dateOfBirth: m
      }
    }, () => {
      this.props.onChange(
        this.state.form
      );
    });
  }

  _renderDateInput () {
    return (
      <input
        name='dateOfBirth'
        type='text'
        className='form-control m-input m-input--air m-input--pill'
        placeholder='Birthday *'/>
    );
  }

  render() {
    const { form, dob } = this.state;
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
                <div className='form-control-feedback'></div>
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
                <div className='form-control-feedback'></div>
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
                <div  className='form-control-feedback'></div>
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
                <div  className='form-control-feedback'></div>
              </div>
              <div className='form-group m-form__group picker'>
                <MetronicDatePicker
                  placeholder='Birthday'
                  value={form.dateOfBirth || null}
                  onChange={(e) => { this._handleDateChange(e) }}/>
                <div  className='form-control-feedback'></div>
              </div>
              <div className='form-group m-form__group'>
                <div>
                  <Select
                    name='gender'
                    value={form.gender || ''}
                    onChange={(e) => { this._handleInputChange(e) }}
                    className='form-control m-input m-input--air m-input--pill main-select'
                    style={{minWidth:'120px'}}>
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                  </Select>
                </div>
                <div  className='form-control-feedback'></div>
              </div>
            </address>
          </div>
        </div>
        <div className='col-md-6'>
          <legend className='m--margin-bottom-10'>Profile Pic Upload</legend>

          <div className='CropperBlock'>
            {form.imageSrc &&
              <button
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
              src={form.imageSrc}
              className='signup-cropper'
              style={{height: 250, width: 250}}
              aspectRatio={1 / 1}
              guides={false}/>

            <div className='croppedBlock'>
              {form.cropResult &&
                <img className='img-thumbnail' style={{ width: '150px' }} src={form.cropResult} alt='cropped image'/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate('SecondStepForm')(SecondStepForm);
