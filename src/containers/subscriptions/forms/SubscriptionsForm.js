import React, {Component} from 'react';
import {translate, Interpolate} from 'react-i18next';
import {Checkbox} from '@material-ui/core';

import '../Subscriptions.css'

class SubscriptionsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subscriptions:  props.subscriptions,
            subscriptionId: props.subscriptionId,            
            period:         props.period
        };
    }
    
    componentWillReceiveProps(nextProps) {                
        if (this.props.subscriptionId !== nextProps.subscriptionId) {
            this._setSubscriptionId(nextProps.subscriptionId);
        }
    }    

    _setSubscriptionId(subscriptionId) {
        this.setState({subscriptionId: Number(subscriptionId)});        
    }

    _getSelectedPlan() {
        const {subscriptions, t} = this.props;
        
        const subscription = subscriptions.find((element) => {
            return (Number(element.get('id')) === this.state.subscriptionId);
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

    _handlePeriodChange(event) {        
        const { value } = event.target;
        this.setState({
            period: value
        });
    }   
    
    _handleSelectPlan() {
        this.props.onSelect({
            subscriptionId: this.state.subscriptionId,            
            period:         this.state.period
        });
    }
    
    _renderSelected() {
                
        const {subscriptions, t} = this.props;
         
        return subscriptions.map((record, key) => {
            
            if (Number(record.get('id')) !== this.state.subscriptionId) {
                return '';
            }
                                                        
            const courses = <span style={{fontWeight: 500}}>{record ? record.get('allowedCourses') : '0'}</span>;       

            return (
                <div className="subscription-item-block m--margin-top-30" style={{maxWidth: '420px', margin: '0 auto'}}>
                    <div className={`subscription-item item-${key}`}>
                        <div className="subscription-header"><h1>{record.get('title')}</h1></div>
                        <div className="subscription-content">
                            <div className="subscription-prices m--padding-left-5 m--padding-right-5">
                                <div className="row">                                                                        
                                    <div className={`col-6 m--padding-0 text-center ${this.state.period === 'month' ? 'selected' : ''}`}>                           
                                        <span className="price">
                                        <Checkbox
                                            checked={this.state.period === 'month'}
                                            onChange={ (e) => {this._handlePeriodChange(e) }}
                                            value="month"
                                            color="primary"
                                            style={{marginLeft: '-18px', width: '40px'}}
                                            />
                                            ${record.get('priceMonthly')}
                                        </span> {t('perMonth')}
                                    </div>
                                    <div className={`col-6 m--padding-0 text-center ${this.state.period === 'year' ? 'selected' : ''}`}>
                                        <span className="price">
                                            <Checkbox
                                                checked={this.state.period === 'year'}
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
                                    <button onClick={() => { this._handleSelectPlan() }} className="btn btn-info">{t('continue')}</button>
                                </p>                                
                            </div>
                        </div>
                    </div>  
                </div>
            );
        });        
    }
    
    _renderSubscriptions() {
        
        const {subscriptions, t} = this.props;
        return subscriptions.map((record, key) => {
            
            if (Number(record.get('id')) === this.state.subscriptionId) {
                return '';
            }
                        
            return (        
                <div className="subscription-item-block col-sm-12 col-md-6 col-lg-6 col-xl-6 m--margin-top-25">
                    <div className={`subscription-item item-${key}`} onClick={() => { this._setSubscriptionId(record.get('id')) }}>                        
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
        
        const {t} = this.props;
        
        if (!this.props.subscriptions.size) {
            return '';
        }
                
        return (
            <div>
                <div>                        
                    {this._renderSelected()}
                </div>
                <div className="col-sm-12">
                    <h1 className="text-center m--margin-top-25 g-metal">{t('switchPlan')}</h1>
                    <div className="switch-subscriptions-block">
                        <div className="row">
                            {this._renderSubscriptions()}
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

export default translate('translations')(SubscriptionsForm);