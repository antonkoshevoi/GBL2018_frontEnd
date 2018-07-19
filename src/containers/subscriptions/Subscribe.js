import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {translate, Interpolate} from 'react-i18next';
import {Button,  FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core';
import {selectCreateCreditCardPaymentRequest} from '../../redux/payments/selectors';
import {createCreditCardPayment, resetCreditCardPayment} from '../../redux/payments/actions';
import { selectGetRecordRequest } from '../../redux/subscriptions/selectors';
import { getRecord } from '../../redux/subscriptions/actions';
import Loader from "../../components/layouts/Loader";

import './Subscriptions.css'

class Subscribe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subscriptionId: null
        }
    }

    componentDidMount() {
        const subscriptionId = this.props.match.params.id;
        const {getRecord} = this.props;
        this.setState({subscriptionId});
        
        getRecord(subscriptionId);
    }

    _handleInputChange(event) {
        const { name, value, } = event.target;

        this.setState({
            [name]: value
        });
    }
    
    _submitCreditCardPayment = () => {        
        this.props.createCreditCardPayment(this.state);        
    };  

    render() {        
        const years = Array.from(Array(10), (_,x) => (new Date().getFullYear() + x));
        const {createCreditCardPaymentRequest, getRecordRequest, t} = this.props;
        const loading = createCreditCardPaymentRequest.get('loading');       
        const errors = createCreditCardPaymentRequest.get('errors');        

        if (createCreditCardPaymentRequest.get('success')) {
            this.props.resetCreditCardPayment();        
            this.props.onDataSaved();
        }
        
        const record = getRecordRequest.get('record');
        const courses = <span style={{fontWeight: 500}}>{record ? record.get('allowedCourses') : '0'}</span>;
            
        return (
      <div className='fadeInLeft  animated'>
          <div class="row">
          <div class="col-lg-4">
        {getRecordRequest.get('success') ?
        <div className="subscription-item-block m--margin-top-30" style={{maxWidth: '400px', margin: '0 auto'}}>
            <div className="subscription-item">
                <div className="subscription-header"><h1>{record.get('title')}</h1></div>
                <div className="subscription-content">
                    <div className="subscription-prices">
                        <div className="row">
                            <div className="monthly col-6"><span className="price">${record.get('priceMonthly')}</span> {t('perMonth')}</div>
                            <div className="yearly col-6 text-right m--margin-top-20"><span className="price">${record.get('priceYearly')}</span> {t('perYear')}</div>            
                        </div>
                    </div>
                    <div className="subscription-description">
                        <div className="subscription-limits">
                            <Interpolate i18nKey="courseAtTime" number={courses} />
                            <br />                            
                            <Interpolate i18nKey={record.get('allowedCourses') > 1 ? 'courseAnyCoursesSwitchAnyTime' : 'courseAnyCourseSwitchAnyTime'} number={courses} />
                            <br />                            
                            <Interpolate i18nKey="usersMax" number={courses} />
                        </div>            
                        <div className="subscription-bonuses text-left">
                            <span>{t('annualBonus')}:</span>
                            <span className="bonus">{record.get('bonuses')}</span>
                        </div>
                    </div>
                </div>
            </div>  
        </div> : <Loader/>}
        </div>           
        <div class="col-sm-12 col-md-12 col-lg-7">
        <div className='m-portlet m-portlet--head-solid-bg m--margin-top-30'>
          <div className='m-portlet__body'>
            <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
              <div className='row align-items-center'>
                <div className="col-sm-12 col-md-10 col-lg-10 m-auto">
                    {loading && <Loader/>}
                    <h2 className='m--margin-bottom-20'>{t('creditCard')}</h2>
                    <div className='m-form__section m-form__section--first'>
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('creditCardNumber')} </label>
                        <div className="col-lg-8 col-md-8 col-sm-12">
                          <input
                            required                    
                            value={this.state.cardNumber || ''}
                            name='cardNumber'
                            onChange={(e) => { this._handleInputChange(e) }}
                            type='text'
                            className='form-control m-input m-input--air '
                            placeholder=''/>
                            
                          {errors && errors.get('cardNumber') && <FormHelperText error>{ errors.get('cardNumber').get(0) }</FormHelperText>}
                          {errors && errors.get('message') && <FormHelperText error>{ errors.get('message') }</FormHelperText>}
                        </div>
                      </div>
                    </div>
                    <div className='m-form__section m-form__section--first'>
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('holderName')}</label>
                        <div className="col-lg-8 col-md-8 col-sm-12">
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
                      <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('cardType')}</label> 
                      <div className="col-lg-5 col-md-8 col-sm-12">
                        <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
                          <FormControl>
                            <Select                      
                              name="cardType"
                              value={this.state.cardType || ''}
                              onChange={(e) => this._handleInputChange(e)}
                            >
                                <MenuItem key='0' value='Visa' >{t('visa')}</MenuItem>
                                <MenuItem key='1' value='MasterCard' >{t('masterCard')}</MenuItem>
                                <MenuItem key='2' value='Discover' >{t('discover')}</MenuItem>
                                <MenuItem key='3' value='Amex' >{t('amex')}</MenuItem>
                                <MenuItem key='4' value='JCB' >{t('jcb')}</MenuItem>                                
                            </Select>
                          </FormControl>
                          {errors && errors.get('cardType') && <FormHelperText error>{ errors.get('cardType').get(0) }</FormHelperText>}
                        </FormControl>
                      </div>                      
                    </div>                    
                    <div className="form-group m-form__group row">
                      <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('expDate')}</label>
                      <div className="col-lg-5 col-md-5 col-sm-12">
                        <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
                          <FormControl>
                            <Select                      
                              name="cardExpYear"
                              value={this.state.cardExpYear || ''}
                              onChange={(e) => this._handleInputChange(e)}
                            >
                                {years.map((item,index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                            </Select>
                          </FormControl>
                          {errors && errors.get('cardExpYear') && <FormHelperText error>{ errors.get('cardExpYear').get(0) }</FormHelperText>}
                        </FormControl>
                      </div>
                      <div className="col-md-3 col-lg-3 col-sm-12">
                        <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
                          <FormControl>
                            <Select                      
                              name="cardExpMonth"
                              value={this.state.cardExpMonth || ''}
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
                          {errors && errors.get('cardExpMonth') && <FormHelperText error>{ errors.get('cardExpMonth').get(0) }</FormHelperText>}
                        </FormControl>
                      </div>                      
                    </div>
                    <div className='m-form__section m-form__section--first'>
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('cvvCode')} </label>
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <input
                            required                    
                            value={this.state.cardCvv2 || ''}
                            name='cardCvv2'
                            onChange={(e) => { this._handleInputChange(e) }}
                            type='text'
                            className='form-control m-input m-input--air '
                            placeholder=''/>
                          {errors && errors.get('cardCvv2') && <FormHelperText error>{ errors.get('cardCvv2').get(0) }</FormHelperText>}
                        </div>
                      </div>
                    </div>                    
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="raised"
                        color="primary"
                        className="text-uppercase"
                        onClick={(e) => { this._submitCreditCardPayment(e) }}
                      >
                        {t('makePayment')}
                      </Button>
                    </div>  
                </div>            
              </div>
            </div>
          </div>
        </div>    
        </div>      
        </div>
        </div>
        );
    }
}

Subscribe = connect(
  (state) => ({
    createCreditCardPaymentRequest: selectCreateCreditCardPaymentRequest(state),
    getRecordRequest: selectGetRecordRequest(state)    
  }),
  (dispatch) => ({
    createCreditCardPayment: (data) => dispatch(createCreditCardPayment(data)),
    resetCreditCardPayment: () => dispatch(resetCreditCardPayment()),
    getRecord: (data) => dispatch(getRecord(data))
  })
)(Subscribe);

export default withRouter(translate('translations')(Subscribe));