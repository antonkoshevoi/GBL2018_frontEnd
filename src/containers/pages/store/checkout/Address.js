import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import PropTypes from 'prop-types';
import {selectRecords} from "../../../../redux/countries/selectors";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {FormControl, InputLabel, MenuItem, Select} from "material-ui";





class Address extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    form: {},
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
    const { name, type, value, checked } = event.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    },() => { this.props.onChange(this.state.form); });
  }

  render() {
    const {title,errors,name,disabled,form, countries} = this.props;
    const countriesList = countries.toJS();
    return (
      <div className='col-sm-12'>
        <div className='col-xs-12'>
          <legend className='m--margin-bottom-10'>{title}</legend>
          <address className='m-form__section m-form__section--first signUpOptional'>
            <div className="form-group m-form__group row">
              <label className="col-form-label col-lg-3 col-sm-12">Address Line 1</label>
              <div className="col-lg-8 col-md-9 col-sm-12">
                <input
                  disabled={disabled}
                  value={form.addressLine1 || ''}
                  name='addressLine1'
                  onChange={(e) => {
                    this._handleInputChange(e)
                  }}
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
              <label className="col-form-label col-lg-3 col-sm-12">Address Line 2</label>
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
              <label className="col-form-label col-lg-3 col-sm-12">City</label>
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
              <label className="col-form-label col-lg-3 col-sm-12">State or Province</label>
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
              <label className="col-form-label col-lg-3 col-sm-12">Postal or Zip Code</label>
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
              <label className="col-form-label col-lg-3 col-sm-12">Country</label>
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

export default withRouter(Address);

