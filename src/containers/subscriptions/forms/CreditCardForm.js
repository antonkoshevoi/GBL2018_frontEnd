import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {FormControl, FormHelperText, MenuItem, Select} from '@material-ui/core';

class CreditCardForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {}
        };
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
        }, () => { this.props.onChange(this.state.form); });
    }       

    render() {        
        const years = Array.from(Array(10), (_,x) => (new Date().getFullYear() + x));
        const {errors, t} = this.props;
        const {form} = this.state;
        
        return (
            <div className='m-form__section m-form__section--first'>
              <div className="form-group m-form__group row">
                <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('creditCardNumber')} </label>
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <input
                    required                    
                    value={form.cardNumber || ''}
                    name='cardNumber'
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>

                  {errors && errors.get('cardNumber') && <FormHelperText error>{ errors.get('cardNumber').get(0) }</FormHelperText>}
                  {errors && errors.get('message') && <FormHelperText error>{ errors.get('message') }</FormHelperText>}
                </div>
              </div>

              <div className="form-group m-form__group row">
                <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('holderName')}</label>
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <input
                    required                    
                    value={form.cardHolder || ''}
                    name='cardHolder'
                    onChange={(e) => { this._handleInputChange(e) }}
                    type='text'
                    className='form-control m-input m-input--air '
                    placeholder=''/>

                  {errors && errors.get('cardHolder') && <FormHelperText error>{ errors.get('cardHolder').get(0) }</FormHelperText>}
                </div>
              </div> 
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('cardType')}</label> 
                  <div className="col-lg-5 col-md-8 col-sm-12">
                    <FormControl className='full-width form-inputs'>                          
                        <Select                      
                          name="cardType"
                          value={form.cardType || ''}
                          onChange={(e) => this._handleInputChange(e)}
                        >
                            <MenuItem key='0' value='Visa' >{t('visa')}</MenuItem>
                            <MenuItem key='1' value='MasterCard' >{t('masterCard')}</MenuItem>
                            <MenuItem key='2' value='Discover' >{t('discover')}</MenuItem>
                            <MenuItem key='3' value='Amex' >{t('amex')}</MenuItem>
                            <MenuItem key='4' value='JCB' >{t('jcb')}</MenuItem>                                
                        </Select>                          
                        {errors && errors.get('cardType') && <FormHelperText error>{ errors.get('cardType').get(0) }</FormHelperText>}
                    </FormControl>
                  </div>                      
                </div>                    
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('expDate')}</label>
                  <div className="col-lg-5 col-md-5 col-sm-6 col-6">
                    <FormControl className='full-width form-inputs'>                          
                        <Select                      
                          name="cardExpYear"
                          value={form.cardExpYear || ''}
                          onChange={(e) => this._handleInputChange(e)}
                        >
                        {years.map((item,index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                        </Select>                          
                      {errors && errors.get('cardExpYear') && <FormHelperText error>{ errors.get('cardExpYear').get(0) }</FormHelperText>}
                    </FormControl>
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-6 col-6">
                    <FormControl className='full-width form-inputs'>                          
                        <Select                      
                          name="cardExpMonth"
                          value={form.cardExpMonth || ''}
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
                      {errors && errors.get('cardExpMonth') && <FormHelperText error>{ errors.get('cardExpMonth').get(0) }</FormHelperText>}
                    </FormControl>
                  </div>                      
                </div>                
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('cvvCode')} </label>
                  <div className="col-lg-5 col-md-5 col-sm-12">
                    <input
                      required                    
                      value={form.cardCvv2 || ''}
                      name='cardCvv2'
                      onChange={(e) => { this._handleInputChange(e) }}
                      type='text'
                      className='form-control m-input m-input--air '
                      placeholder=''/>
                    {errors && errors.get('cardCvv2') && <FormHelperText error>{ errors.get('cardCvv2').get(0) }</FormHelperText>}
                  </div>
                </div>
            </div>
        );
    }
}

export default withTranslation('translations')(CreditCardForm);