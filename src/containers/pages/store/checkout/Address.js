import React, {Component} from 'react';
import '../../../../styles/widgets.css';


export default class Address extends Component {

  state = {
    form: {},
    errors: null
  };

  _handleInputChange(e) {

  }

  render() {
    const {form, errors} = this.state;
    const {title} = this.props;
    return (
      <div className='col-sm-12'>
        <div className='col-xs-12'>
          <legend className='m--margin-bottom-10'>{title}</legend>
          <address className='m-form__section m-form__section--first signUpOptional'>
            <div className="form-group m-form__group row">
              <label className="col-form-label col-lg-3 col-sm-12">Address Line 1</label>
              <div className="col-lg-8 col-md-9 col-sm-12">
                <input
                  value={form.addressLine1 || ''}
                  name='addressLine1'
                  onChange={(e) => {
                    this._handleInputChange(e)
                  }}
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
                  onChange={(e) => {
                    this._handleInputChange(e)
                  }}
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
                  onChange={(e) => {
                    this._handleInputChange(e)
                  }}
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
                  onChange={(e) => {
                    this._handleInputChange(e)
                  }}
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
                  onChange={(e) => {
                    this._handleInputChange(e)
                  }}
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
                  onChange={(e) => {
                    this._handleInputChange(e)
                  }}
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
                  onChange={(e) => {
                    this._handleInputChange(e)
                  }}
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
    );
  }
}
