import React, {Component} from 'react';
import {translate, Interpolate} from 'react-i18next';
import {Checkbox} from '@material-ui/core';
import {Price} from "../../../components/ui/Price";

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
        const styles = {maxWidth: '450px', margin: '0 auto'};
        return subscriptions.map((record, key) => {
            
            if (Number(record.get('id')) !== this.state.subscriptionId) {
                return '';
            }
                                                        
            const courses = <span className="m--font-bolder">{record ? record.get('allowedCourses') : '0'}</span>;
            const students = <span className="m--font-bolder">{record ? record.get('allowedStudents') : '0'}</span>;

            return (
                <div key={key} className="subscription-item-block m--margin-top-30" style={styles}>
                    <div className={`subscription-item item-${key}`}>
                        <div className="subscription-header"><h1>{t(record.get('title'))}</h1></div>
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
                                            <Price price={record.get('priceMonthly')} /> <span className="small">{record.get('currency')}</span>
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
                                            <Price price={record.get('priceYearly')} /> <span className="small">{record.get('currency')}</span>                                            
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
                                    <Interpolate i18nKey={record.get('allowedStudents') > 1 ? 'usersMax' : 'userMax'} number={students} />
                                </div>            
                                <div className="subscription-bonuses text-left">
                                    <span>{t('annualBonus')}:</span>
                                    <span className="bonus">{record.get('allowedStudents') > 1 ? t('freeWorkbooks', {number: record.get('allowedStudents')}) : t('freeWorkbook')}</span>
                                </div>
                                <p className="text-center m--margin-bottom-0">
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
                <div key={key} className="subscription-item-block col-sm-12 col-md-6 m--margin-top-25">
                    <div className={`subscription-item item-${key}`} onClick={() => { this._setSubscriptionId(record.get('id')) }}>                        
                        <div className="subscription-header"><h1>{t(record.get('title'))}</h1></div>
                        <div className="subscription-content">
                            <div className="subscription-prices">
                                <div className="row">
                                    <div className="selected col-7"><span className="price"><Price price={record.get('priceMonthly')} /> <span className="small">{record.get('currency')}</span></span> {t('perMonth')}</div>
                                    <div className="col-5 text-right m--margin-top-10"><span className="price"><Price price={record.get('priceYearly')} /> <span className="small">{record.get('currency')}</span></span> {t('perYear')}</div>            
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
            <div class="row">
                <div className="col-sm-12">
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