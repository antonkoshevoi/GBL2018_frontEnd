import React, {Component} from 'react';
import '../../../../styles/widgets.css';


export default class ContactInfo extends Component {

  state = {
    form: {},
    errors: null
  };

  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  }

  render() {
    const {form, errors} = this.state;
    const {title} = this.props;
    return (
      <div className='col-xs-12'>
        <legend className='m--margin-bottom-10'>{title}</legend>
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
            <label className="col-form-label col-lg-3 col-sm-12">Last Name </label>
            <div className="col-lg-8 col-md-9 col-sm-12">
              <input
                value={form.telephone || ''}
                name='telephone'
                onChange={(e) => { this._handleInputChange(e) }}
                type='text'
                className='form-control m-input m-input--air '
                placeholder=''/>
              <div className='form-control-feedback'>
                {errors && errors.get('telephone') &&
                <div className="form-control-feedback text-center error">{errors.get('telephone').get(0)}</div>}
              </div>
            </div>
          </div>
        </div>


      </div>

    );
  }
}
