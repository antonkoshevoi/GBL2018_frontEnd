import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import PropTypes from 'prop-types';


export default class ContactInfo extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };

  state = {
    form: {},
    errors: null
  };

  componentDidMount() {
    const {form} = this.props;
    this.setState({
      form: {
        ...form
      }
    })
  }

  _handleInputChange = event => {
    const {name, type, value, checked} = event.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    }, () => this.props.onChange(this.state.form));
  }

  render() {
    const {title,form,disabled,errors,name} = this.props;
    return (
      <div className='col-xs-12'>
        <legend className='m--margin-bottom-10'>{title}</legend>
        <div className='m-form__section m-form__section--first'>
          <div className="form-group m-form__group row">
            <label className="col-form-label col-lg-3 col-sm-12">First Name </label>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <input
                required
                disabled={disabled}
                value={form.firstName || ''}
                name='firstName'
                onChange={this._handleInputChange}
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
            <label className="col-form-label col-lg-3 col-sm-12">Last Name </label>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <input
                required
                disabled={disabled}
                value={form.lastName || ''}
                name='lastName'
                onChange={this._handleInputChange}
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
            <label className="col-form-label col-lg-3 col-sm-12">Email </label>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <input
                required
                disabled={disabled}
                value={form.email || ''}
                name='email'
                onChange={this._handleInputChange}
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
            <label className="col-form-label col-lg-3 col-sm-12">Telephone</label>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <input
                required
                disabled={disabled}
                value={form.telephone || ''}
                name='telephone'
                onChange={this._handleInputChange}
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

    );
  }
}
