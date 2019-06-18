import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FormControl, MenuItem, Select} from '@material-ui/core';
import {selectRecords, selectGetRecordsRequest} from "../../../redux/countries/selectors";
import {getCountries} from "../../../redux/countries/actions";

class Address extends Component {

  state = {
    form: {}
  };

  componentWillMount() {
    if (!this.props.countriesRequest.get('success')) {
      this.props.countries();
    }
  }
    
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
  
  _renderCountries() {
    const { countriesList, countriesRequest } = this.props;
    
    if (!countriesRequest.get('success')) {
        return '';
    }        

    return countriesList.toJS().map((item, index) => (
        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
    ));
  }  

  render() {
    const {title, errors, disabled, form, t} = this.props;
       
    return (
         <div className="row">
            <div className='col-12'>  
                <input
                  value={form.id || ''}
                  name='id'
                  onChange={(e) => {this._handleInputChange(e)}}
                  type='hidden'
                  />
              <legend className='m--margin-bottom-10'>{t('contactInformation', {title: title})}</legend>
              <div className='m-form__section m-form__section--first'>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-12">{t('firstName')}</label>
                  <div className="col-lg-9 col-12">
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
                      {errors && errors.get(`firstName`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`firstName`).get(0)}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className='m-form__section m-form__section--first'>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-12">{t('lastName')}</label>
                  <div className="col-lg-9 col-12">
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
                      {errors && errors.get(`lastName`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`lastName`).get(0)}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className='m-form__section m-form__section--first'>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-12">{t('email')}</label>
                  <div className="col-lg-9 col-12">
                    <input
                      required
                      disabled={disabled}
                      value={form.email || ''}
                      name='email'
                      onChange={(e) => {this._handleInputChange(e)}}
                      type='email'
                      className='form-control m-input m-input--air'
                      placeholder=''/>
                    <div className='form-control-feedback'>
                      {errors && errors.get(`email`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`email`).get(0)}</div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className='m-form__section m-form__section--first'>
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-12">{t('telephone')}</label>
                  <div className="col-lg-9 col-12">
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
                      {errors && errors.get(`telephone`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`telephone`).get(0)}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className='col-12'>
            <legend className='m--margin-bottom-10'>{t('contactAddress', {title: title})}</legend>
            <address className='m-form__section m-form__section--first signUpOptional'>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-12">{t('addressLine1')}</label>
                <div className="col-lg-9 col-12">
                  <input
                    disabled={disabled}
                    value={form.addressLine1 || ''}
                    name='addressLine1'
                    onChange={(e) => {this._handleInputChange(e)}}
                    type='text'
                    className='form-control m-input m-input--air '
                  />
                  <div className='form-control-feedback'>
                    {errors && errors.get(`addressLine1`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`addressLine1`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-12">{t('addressLine2')}</label>
                <div className="col-lg-9 col-12">
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
                    {errors && errors.get(`addressLine2`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`addressLine2`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-12">{t('city')}</label>
                <div className="col-lg-9 col-12">
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
                    {errors && errors.get(`city`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`city`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-12">{t('stateOrProvince')}</label>
                <div className="col-lg-9 col-12">
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
                    {errors && errors.get(`region`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`region`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-12">{t('postalOrZipCode')}</label>
                <div className="col-lg-9 col-12">
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
                    {errors && errors.get(`zip`) &&
                    <div className="form-control-feedback text-center error">{errors.get(`zip`).get(0)}</div>}
                  </div>
                </div>
              </div>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-lg-3 col-12">{t('country')}</label>
                <div className="col-lg-9 col-12">
                  <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
                    <FormControl>
                      <Select
                        disabled={disabled}
                        name="country"
                        value={form.country || ''}
                        onChange={(e) => this._handleInputChange(e)}
                      >
                        {this._renderCountries()}
                      </Select>
                    </FormControl>
                    <div className='form-control-feedback'>
                      {errors && errors.get(`country`) &&
                      <div className="form-control-feedback text-center error">{errors.get(`country`).get(0)}</div>}
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
        countriesList:  selectRecords(state),
        countriesRequest:  selectGetRecordsRequest(state)
  }),
  (dispatch) => ({
      countries: () => dispatch(getCountries())  
  }),
)(Address);

export default withTranslation('translations')(Address);

