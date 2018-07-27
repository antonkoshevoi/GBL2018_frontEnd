import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {translate, Interpolate} from 'react-i18next';
import {Checkbox} from '@material-ui/core';
import {push} from 'react-router-redux';
import {selectGetRecordsRequest, selectSubscribeRequest} from '../../redux/subscriptions/selectors';
import {getRecords, subscribe, resetSubscribeRequest} from '../../redux/subscriptions/actions';
import CreditCardForm from "./forms/CreditCardForm";
import Loader from "../../components/layouts/Loader";

import './Subscriptions.css'

class Subscribe extends Component {

    constructor(props) {
        super(props);
        this.state = {           
            creditCard: {},
            subscriptionId: null,            
            period: 'month',
            showBillingForm: false
        };
    }

    componentDidMount() {
        const subscriptionId = this.props.match.params.id;
        const {getRecords} = this.props;
        
        this.setState({subscriptionId: subscriptionId});
        
        getRecords();
    }
    
    componentWillReceiveProps(nextProps) {                
        const success = this.props.subscribeRequest.get('success');
        const nextSuccess = nextProps.subscribeRequest.get('success');

        if (!success && nextSuccess) {      
            const userSubscriptionId = nextProps.subscribeRequest.get('userSubscriptionId');
            
            this.props.resetSubscribeRequest();
            
            this.setState({
                showBillingForm: false,
                subscriptionId: null,
                creditCard: {}
            });
            
            this.props.goTo(`/subscribed/${userSubscriptionId}`);
        }
    }    

    _getSelectedPlan() {
        const {getRecordsRequest, t} = this.props;
        
        const subscription = getRecordsRequest.get('records').find((element) => {
            return (element.get('id') == this.state.subscriptionId);
        });
        
        if (subscription) {
            let price = (this.state.period === 'month' ? subscription.get('priceMonthly') : subscription.get('priceYearly'));
        
            return (
                <div className="col-sm-12 text-center">                                                                                    
                    <p className="display-6">{t('yourPlan')}: <strong className="g-blue">${price}</strong> / {t(this.state.period)}</p>     
                </div>
            );
        }                
    }

    _handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    _handlePeriodChange(event) {        
        const { value } = event.target;
        this.setState({
            period: value
        });
    }
    
    _handleForm(form) {      
        this.setState({
            ...this.state,
            creditCard: {
                ...form
            }
        });
    }    
  
    _submitCreditCardPayment = () => {
        this.props.subscribe({
            ...this.state.creditCard,
            period: this.state.period,
            subscriptionId: this.state.subscriptionId
        });        
    };
    
    _showBillingForm(value) {
        this.setState({
            showBillingForm: value
        });        
    }
    
    _renderSelected() {
                
        const {getRecordsRequest, t} = this.props;
         
        return getRecordsRequest.get('records').map((record, key) => {
            
            if (record.get('id') != this.state.subscriptionId) {
                return;
            }
                                                        
            const courses = <span style={{fontWeight: 500}}>{record ? record.get('allowedCourses') : '0'}</span>;       

            return (
                <div className="subscription-item-block m--margin-top-30" style={{maxWidth: '420px', margin: '0 auto'}}>
                    <div className={`subscription-item item-${key}`}>
                        <div className="subscription-header"><h1>{record.get('title')}</h1></div>
                        <div className="subscription-content">
                            <div className="subscription-prices m--padding-left-5 m--padding-right-5">
                                <div className="row">                                                                        
                                    <div className={`col-6 m--padding-0 text-center ${this.state.period == 'month' ? 'selected' : ''}`}>                           
                                        <span className="price">
                                        <Checkbox
                                            checked={this.state.period == 'month'}
                                            onChange={ (e) => {this._handlePeriodChange(e) }}
                                            value="month"
                                            color="primary"
                                            style={{marginLeft: '-18px', width: '40px'}}
                                            />
                                            ${record.get('priceMonthly')}
                                        </span> {t('perMonth')}
                                    </div>
                                    <div className={`col-6 m--padding-0 text-center ${this.state.period == 'year' ? 'selected' : ''}`}>
                                        <span className="price">
                                            <Checkbox
                                                checked={this.state.period == 'year'}
                                                onChange={ (e) => {this._handlePeriodChange(e) }}
                                                value="year"
                                                color="primary"
                                                style={{marginLeft: '-18px', width: '40px'}}
                                                />                                
                                            ${record.get('priceYearly')}
                                        </span> {t('perYear')}
                                    </div>            
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
                                <p className="text-center margin-bottom-0">
                                    <button onClick={() => { this._showBillingForm(true) }} class="btn btn-info">{t('continue')}</button>
                                </p>                                
                            </div>
                        </div>
                    </div>  
                </div>
            );
        });        
    }
    
    _renderSubscriptions() {
        
        const {getRecordsRequest, t} = this.props;
        return getRecordsRequest.get('records').map((record, key) => {
            
            if (record.get('id') == this.state.subscriptionId) {
                return;
            }
                        
            return (        
                <div className="subscription-item-block col-sm-12 col-md-6 col-lg-6 col-xl-6 m--margin-top-25">
                    <div className={`subscription-item item-${key}`} onClick={() => { this.setState({subscriptionId: record.get('id')}) }}>                        
                        <div className="subscription-header"><h1>{record.get('title')}</h1></div>
                        <div className="subscription-content">
                            <div className="subscription-prices">
                                <div className="row">
                                    <div className="selected col-6"><span className="price">${record.get('priceMonthly')}</span> {t('perMonth')}</div>
                                    <div className="col-6 text-right m--margin-top-10"><span className="price">${record.get('priceYearly')}</span> {t('perYear')}</div>            
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            );
        });        
    }

    render() {        
        
        const {subscribeRequest, getRecordsRequest, t} = this.props;
        const {creditCard} = this.state;
        const errors = subscribeRequest.get('errors');
                
        return (
            <div className='fadeInLeft  animated'>
                <h1 className="text-center m--margin-top-25">{t('subscriptions')}</h1>
                {this.state.showBillingForm ? (
                    <div className="col-sm-12 col-md-10 col-lg-9 col-xl-8 m-auto">
                        <div className='m-portlet m-portlet--head-solid-bg m--margin-top-30'>
                            <div className='m-portlet__body'>
                                <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                                    <h2 className='m--margin-bottom-40 m--margin-left-20'>{t('creditCard')}</h2>                    
                                    <div className='row align-items-center'>
                                        {subscribeRequest.get('loading') && <Loader/>}
                                        
                                        {this._getSelectedPlan()}
                                        
                                        <CreditCardForm errors={errors} onChange={(form) => this._handleForm(form)} form={creditCard} />
                                        
                                        <div className="col-sm-12 text-center">                                        
                                            <button disabled={subscribeRequest.get('loading')} onClick={() => { this._submitCreditCardPayment() }} class="btn btn-info">{t('makePayment')}</button>
                                            <button disabled={subscribeRequest.get('loading')} onClick={() => { this._showBillingForm(false) }} class="btn btn-default m--margin-left-10">{t('back')}</button>                                                                  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                <div class="row">
                    <div class="col-lg-12">                        
                        {getRecordsRequest.get('success') ? this._renderSelected() : <Loader/>}
                    </div>
                    {getRecordsRequest.get('success') && <div class="col-sm-12">
                        <h1 className="text-center m--margin-top-25">{t('switchPlan')}</h1>
                        <div className="switch-subscriptions-block">
                            <div className="row">
                                {this._renderSubscriptions()}
                            </div>
                        </div>
                    </div>}
                </div>)}      
            </div>        
        );
    }
}

Subscribe = connect(
    (state) => ({
        subscribeRequest:  selectSubscribeRequest(state),
        getRecordsRequest: selectGetRecordsRequest(state)    
    }),
    (dispatch) => ({
        subscribe: (data) => dispatch(subscribe(data)),
        resetSubscribeRequest: () => dispatch(resetSubscribeRequest()),
        getRecords: () => dispatch(getRecords()),
        goTo: (url) => {dispatch(push(url))}
    })
)(Subscribe);

export default withRouter(translate('translations')(Subscribe));