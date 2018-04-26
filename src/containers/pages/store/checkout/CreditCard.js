import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Divider, FormControl, FormHelperText, Input, InputLabel, MenuItem, TextField, Select} from "material-ui";

class CreditCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    _submit() {
        alert('_submit');
        this.props.onSubmit(
            this.state
        );
    }

    _handleInputChange(event) {
        const { name, type, value, checked } = event.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        const { errors } = this.props;
        const years = Array.from(Array(10), (_,x) => (new Date().getFullYear() + x));
        return (
            <div className="row">
                <div className="col-sm-8 m-auto">
                    <legend className='m--margin-bottom-10'>Credit Card</legend>
                    <div className='m-form__section m-form__section--first'>
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3 col-sm-12">Credit Card Number </label>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                          <input
                            required                    
                            value={this.state.cardNumber || ''}
                            name='cardNumber'
                            onChange={(e) => { this._handleInputChange(e) }}
                            type='text'
                            className='form-control m-input m-input--air '
                            placeholder=''/>
                            
                          {errors && errors.get('cardNumber') && <FormHelperText error>{ errors.get('cardNumber').get(0) }</FormHelperText>}
                        </div>
                      </div>
                    </div>
                    <div className='m-form__section m-form__section--first'>
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3 col-sm-12">Holder Name</label>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                          <input
                            required                    
                            value={this.state.cardHolder || ''}
                            name='cardHolder'
                            onChange={(e) => { this._handleInputChange(e) }}
                            type='text'
                            className='form-control m-input m-input--air '
                            placeholder=''/>
                            
                          {errors && errors.get('cardHolder') && <FormHelperText error>{ errors.get('cardHolder').get(0) }</FormHelperText>}
                        </div>
                      </div>
                    </div>
                    <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3 col-sm-12">Card Type</label> 
                      <div className="col-lg-3 col-md-9 col-sm-12">
                        <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
                          <FormControl>
                            <Select                      
                              name="CardType"
                              value={this.state.CardType || ''}
                              onChange={(e) => this._handleInputChange(e)}
                            >
                                <MenuItem key='0' value='Visa' >Visa</MenuItem>
                                <MenuItem key='1' value='MasterCard' >MasterCard</MenuItem>
                                <MenuItem key='2' value='Discover' >Discover</MenuItem>
                                <MenuItem key='3' value='Amex' >Amex</MenuItem>
                                <MenuItem key='4' value='JCB' >JCB</MenuItem>                                
                            </Select>
                          </FormControl>
                          {errors && errors.get('CardType') && <FormHelperText error>{ errors.get('CardType').get(0) }</FormHelperText>}
                        </FormControl>
                      </div>                      
                    </div>                    
                    <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3 col-sm-12">Exp. Date (YYYY/MM)</label>
                      <div className="col-lg-5 col-md-9 col-sm-12">
                        <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
                          <FormControl>
                            <Select                      
                              name="CardExpYear"
                              value={this.state.CardExpYear || ''}
                              onChange={(e) => this._handleInputChange(e)}
                            >
                                {years.map((item,index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                            </Select>
                          </FormControl>
                          {errors && errors.get('CardExpYear') && <FormHelperText error>{ errors.get('CardExpYear').get(0) }</FormHelperText>}
                        </FormControl>
                      </div>
                      <div className="col-lg-3 col-md-9 col-sm-12">
                        <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
                          <FormControl>
                            <Select                      
                              name="CardExpMonth"
                              value={this.state.CardExpMonth || ''}
                              onChange={(e) => this._handleInputChange(e)}
                            >
                                <MenuItem key='0' value='01' >01</MenuItem>
                                <MenuItem key='1' value='02' >02</MenuItem>
                                <MenuItem key='2' value='03' >03</MenuItem>
                                <MenuItem key='3' value='04' >04</MenuItem>
                                <MenuItem key='4' value='05' >05</MenuItem>
                                <MenuItem key='5' value='06' >06</MenuItem>
                                <MenuItem key='6' value='07' >07</MenuItem>
                                <MenuItem key='7' value='08' >08</MenuItem>
                                <MenuItem key='8' value='09' >09</MenuItem>
                                <MenuItem key='9' value='10' >10</MenuItem>
                                <MenuItem key='10' value='11' >11</MenuItem>
                                <MenuItem key='11' value='12' >12</MenuItem>
                            </Select>
                          </FormControl>
                          {errors && errors.get('CardExpMonth') && <FormHelperText error>{ errors.get('CardExpMonth').get(0) }</FormHelperText>}
                        </FormControl>
                      </div>                      
                    </div>
                    <div className='m-form__section m-form__section--first'>
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3 col-sm-12">CVV Code </label>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                          <input
                            required                    
                            value={this.state.CardCvv2 || ''}
                            name='CardCvv2'
                            onChange={(e) => { this._handleInputChange(e) }}
                            type='text'
                            className='form-control m-input m-input--air '
                            placeholder=''/>
                            
                          {errors && errors.get('CardCvv2') && <FormHelperText error>{ errors.get('CardCvv2').get(0) }</FormHelperText>}
                        </div>
                      </div>
                    </div>                    
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="raised"
                        color="primary"                    
                        onClick={() => { this._submit() }}
                      >
                        NEXT STEP
                      </Button>
                    </div>  
                </div>
            </div>
        );
    }
}

CreditCard.propTypes = {    
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.any
};

export default CreditCard;
