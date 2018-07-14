import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import PropTypes from 'prop-types';
import {selectRecords} from "../../../../redux/countries/selectors";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FormControl, MenuItem, Select} from '@material-ui/core';
import {translate} from 'react-i18next';

class Address extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,   
    onChange: PropTypes.func.isRequired
  };

  state = {
    form: {}
  };

  componentDidMount() {
    const {form} = this.props;
    this.setState({
      form: {
        ...form
      }
    })
  }

  _handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    },() => { this.props.onChange(this.state.form); });
  }

  render() {
    const {title,errors,name,disabled,form, countries, t} = this.props;
    const countriesList = countries.toJS();
    return (
         <div>
            <div className='col-xs-12'>  
                <input
                  value={form.id || ''}
                  name='id'
                  onChange={(e) => {this._handleInputChange(e)}}
                  type='hidden'
                  />
              <legend className='m--margin-bottom-10'>{t('contactInformation', {title: title})}</legend>
              <div className='m-form__section m-form__section--first'>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-sm-12">{t('firstName')}</label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      required
                      disabled={disabled}
                      value={form.firstName || ''}
                      name='firstName'
                      onChange={(e) => {this._handleInputChange(e)}}
                      type='text'
                      className='form-control m-input m-input--air '
                      placeholder=''/>
                    <div className='form-control-feedback'>
                      {errors && errors.get(`${name}.firstName`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`${name}.firstName`).get(0)}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className='m-form__section m-form__section--first'>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-sm-12">{t('lastName')}</label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      required
                      disabled={disabled}
                      value={form.lastName || ''}
                      name='lastName'
                      onChange={(e) => {this._handleInputChange(e)}}
                      type='text'
                      className='form-control m-input m-input--air '
                      placeholder=''/>
                    <div className='form-control-feedback'>
                      {errors && errors.get(`${name}.lastName`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`${name}.lastName`).get(0)}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className='m-form__section m-form__section--first'>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-sm-12">{t('email')}</label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      required
                      disabled={disabled}
                      value={form.email || ''}
                      name='email'
                      onChange={(e) => {this._handleInputChange(e)}}
                      type='email'
                      className='form-control m-input m-input--air '
                      placeholder=''/>
                    <div className='form-control-feedback'>
                      {errors && errors.get(`${name}.email`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`${name}.email`).get(0)}</div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className='m-form__section m-form__section--first'>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-sm-12">{t('telephone')}</label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      required
                      disabled={disabled}
                      value={form.telephone || ''}
                      name='telephone'
                      onChange={(e) => {this._handleInputChange(e)}}
                      type='text'
                      className='form-control m-input m-input--air '
                      placeholder=''/>
                    <div className='form-control-feedback'>
                      {errors && errors.get(`${name}.telephone`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`${name}.telephone`).get(0)}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className='col-xs-12'>
            <legend className='m--margin-bottom-10'>{t('contactAddress', {title: title})}</legend>
            <address className='m-form__section m-form__section--first signUpOptional'>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-sm-12">{t('addressLine1')}</label>
                <div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    disabled={disabled}
                    value={form.addressLine1 || ''}
                    name='addressLine1'
                    onChange={(e) => {this._handleInputChange(e)}}
                    type='text'
                    className='form-control m-input m-input--air '
                  />
                  <div className='form-control-feedback'>
                    {errors && errors.get(`${name}.addressLine1`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`${name}.addressLine1`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-sm-12">{t('addressLine2')}</label>
                <div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    disabled={disabled}
                    value={form.addressLine2 || ''}
                    name='addressLine2'
                    onChange={(e) => {
                      this._handleInputChange(e)
                    }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  <div className='form-control-feedback'>
                    {errors && errors.get(`${name}.addressLine2`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`${name}.addressLine2`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-sm-12">{t('city')}</label>
                <div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    disabled={disabled}
                    value={form.city || ''}
                    name='city'
                    onChange={(e) => {
                      this._handleInputChange(e)
                    }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  <div className='form-control-feedback'>
                    {errors && errors.get(`${name}.city`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`${name}.city`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-sm-12">{t('stateOrProvince')}</label>
                <div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    disabled={disabled}
                    value={form.region || ''}
                    name='region'
                    onChange={(e) => {
                      this._handleInputChange(e)
                    }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  <div className='form-control-feedback'>
                    {errors && errors.get(`${name}.region`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`${name}.region`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-sm-12">{t('postalOrZipCode')}</label>
                <div className="col-lg-8 col-md-9 col-sm-12">
                  <input
                    disabled={disabled}
                    value={form.zip || ''}
                    name='zip'
                    onChange={(e) => {
                      this._handleInputChange(e)
                    }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>
                  <div className='form-control-feedback'>
                    {errors && errors.get(`${name}.zip`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`${name}.zip`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-sm-12">{t('country')}</label>
                <div className="col-lg-8 col-md-9 col-sm-12">
                  <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
                    <FormControl>
                      <Select
                        disabled={disabled}
                        name="country"
                        value={form.country || ''}
                        onChange={(e) => this._handleInputChange(e)}
                      >
                        {countriesList.map((item,index) => <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                    <div className='form-control-feedback'>
                      {errors && errors.get(`${name}.country`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`${name}.country`).get(0)}</div>}
                    </div>
                  </FormControl>
                </div>
              </div>
            </address>              
        </div>
      </div>
    );
  }
}

Address = connect(
  (state) => ({
    countries:  selectRecords(state)

  }),
  (dispatch) => ({
  }),
)(Address);

export default withRouter(translate('translations')(Address));

